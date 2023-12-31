import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { FriendRequestsService } from './friend-requests.service';
import { FriendRequest } from './entities/friend-request.entity';
import { CreateFriendRequestInput } from './dto/create-friend-request.input';
import { PubSub } from 'graphql-subscriptions';
import { UsersService } from 'src/users/users.service';
import { NotifyResponse } from 'src/messages/dto/notify.response';

const pubSub = new PubSub()

@Resolver(() => FriendRequest)
export class FriendRequestsResolver {
  constructor(private readonly friendRequestsService: FriendRequestsService,
    private readonly userService: UsersService) {}

  @Mutation(() => FriendRequest)
  async createFriendRequest(@Args('createFriendRequestInput') createFriendRequestInput: CreateFriendRequestInput) {
    let payload = await this.friendRequestsService.create(createFriendRequestInput)
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

  @Mutation(() => Boolean)
  async removeFriendRequest(@Args('_id') id: string) {
    await this.friendRequestsService.remove(id);
    return true
  }

}
