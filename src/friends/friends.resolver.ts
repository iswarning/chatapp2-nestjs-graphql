import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { FriendsService } from './friends.service';
import { Friend } from './entities/friend.entity';
import { CreateFriendInput } from './dto/create-friend.input';
import { PubSub } from 'graphql-subscriptions';
import { UsersService } from 'src/users/users.service';
import { NotifyResponse } from 'src/messages/dto/notify.response';

const pubSub = new PubSub()

@Resolver(() => Friend)
export class FriendsResolver {
  constructor(private readonly friendsService: FriendsService,
    private readonly userService: UsersService) {}

  @Mutation(() => Friend)
  async createFriend(@Args('createFriendInput') createFriendInput: CreateFriendInput) {
    let payload = await this.friendsService.create(createFriendInput)
    let userInfo = await this.userService.findOne(payload.senderId)
    pubSub.publish("publisher-notify", {
      onSub: {
        senderId: payload.senderId,
        type: "accept-friend-request",
        message: `${userInfo.fullName} accepted a friend request !`,
        recipientId: payload.recipientId,
        dataNotify: {
          friend: payload
        }
      } as NotifyResponse
    })
    return payload;
  }

  @Query(() => [Friend], { name: 'getListFriendOfUser' })
  findAll(@Args("userId") id : string) {
    return this.friendsService.getListFriendOfUser(id);
  }

  @Mutation(() => Friend)
  async removeFriend(@Args('_id') id : string) {
    let payload = await this.friendsService.findOne(id)
    this.friendsService.remove(id)
    pubSub.publish("publisher-notify", {
      onSub: {
        senderId: payload.senderId,
        type: "unfriend",
        message: id,
        recipientId: payload.recipientId,
      }
    })
    return payload;
  }

}
