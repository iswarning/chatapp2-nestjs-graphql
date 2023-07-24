import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ChatRoomsService } from 'src/chat-rooms/chat-rooms.service';
import { FriendsService } from 'src/friends/friends.service';
import { FriendRequestsService } from 'src/friend-requests/friend-requests.service';
import { InitialDataResponse } from './dto/initial-data.response';
import { Inject, forwardRef } from '@nestjs/common';
import { GenerateRtcTokenInput } from './dto/generate-rtc-token.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(

    private readonly usersService: UsersService,

    private readonly chatRoomsService: ChatRoomsService,

    private readonly friendService: FriendsService,

    private readonly friendRequestService: FriendRequestsService,

  ) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => [User])
  async findUserSuggestion(@Args('userId') userId: string) {
    const listFriend = await this.friendService.getListFriendOfUser(userId)
    const listFriendRequest = await this.friendRequestService.getFriendRequestByRecipientId(userId)
    const result = await this.usersService.findAll()
    return result.filter((user) => 
      listFriend.find((f) => f.senderId !== user._id.instance || f.recipientId !== user._id.instance ) ||
      listFriendRequest.find((f) => f.senderId !== user._id.instance || f.recipientId !== user._id.instance ))
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('_id') id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput._id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('_id') id: string) {
    return this.usersService.remove(id);
  }

  @Query(() => InitialDataResponse)
  getInitialDataOfUser(@Args("userId") userId: string) {
    const userInfo = this.usersService.findOne(userId)
    const listFriend = this.friendService.getListFriendOfUser(userId)
    const listFriendRequest = this.friendRequestService.getFriendRequestByRecipientId(userId)
    const listChatRoom = this.chatRoomsService.getListChatRoomOfUser(userId)
    return {
      userInfo,
      listFriend,
      listFriendRequest,
      listChatRoom,
    }
  }

  @Query(() => String) 
  generateRtcToken(@Args("generateRtcTokenInput") generateRtcTokenInput: GenerateRtcTokenInput) {
    return this.usersService.generateRtcToken(generateRtcTokenInput.chatRoomId, generateRtcTokenInput.userId)
  }
}
