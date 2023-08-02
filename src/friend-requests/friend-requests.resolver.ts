import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FriendRequestsService } from './friend-requests.service';
import { FriendRequest } from './entities/friend-request.entity';
import { CreateFriendRequestInput } from './dto/create-friend-request.input';
import { PubSub } from 'graphql-subscriptions';
import { UsersService } from 'src/users/users.service';

const pubSub = new PubSub()

@Resolver(() => FriendRequest)
export class FriendRequestsResolver {
  constructor(private readonly friendRequestsService: FriendRequestsService,
    private readonly userService: UsersService) {}

  @Mutation(() => FriendRequest)
  async createFriendRequest(@Args('createFriendRequestInput') createFriendRequestInput: CreateFriendRequestInput) {
    let payload = await this.friendRequestsService.create(createFriendRequestInput)
    let userInfo = await this.userService.findOne(payload.senderId)
    pubSub.publish("publisher-notify", {
      onSub: {
        senderId: payload.senderId,
        type: "send-friend-request",
        message: `${userInfo.fullName} sent a friend request !`,
        recipientId: payload.recipientId,
        dataNotify: {
          friendRequest: payload
        }
      }
    })
    return payload;
  }

  @Query(() => [FriendRequest])
  getFriendRequestBySenderId(@Args('senderId') id: string) {
    return this.friendRequestsService.getFriendRequestBySenderId(id);
  }

  @Query(() => [FriendRequest])
  getFriendRequestByRecipientId(@Args('recipientId') id: string) {
    return this.friendRequestsService.getFriendRequestByRecipientId(id);
  }

  @Mutation(() => String)
  removeFriendRequest(@Args('_id') id: string) {
    this.friendRequestsService.remove(id);
    return "Deleted !"
  }
}
