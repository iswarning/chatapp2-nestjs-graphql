import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FriendRequestsService } from './friend-requests.service';
import { FriendRequest } from './entities/friend-request.entity';
import { CreateFriendRequestInput } from './dto/create-friend-request.input';

@Resolver(() => FriendRequest)
export class FriendRequestsResolver {
  constructor(private readonly friendRequestsService: FriendRequestsService) {}

  @Mutation(() => FriendRequest)
  createFriendRequest(@Args('createFriendRequestInput') createFriendRequestInput: CreateFriendRequestInput) {
    return this.friendRequestsService.create(createFriendRequestInput);
  }

  @Query(() => [FriendRequest])
  getFriendRequestBySenderId(@Args('senderId') id: string) {
    return this.friendRequestsService.getFriendRequestBySenderId(id);
  }

  @Query(() => [FriendRequest])
  getFriendRequestByRecipientId(@Args('recipientId') id: string) {
    return this.friendRequestsService.getFriendRequestByRecipientId(id);
  }

  @Mutation(() => FriendRequest)
  removeFriendRequest(@Args('_id') id: string) {
    return this.friendRequestsService.remove(id);
  }
}
