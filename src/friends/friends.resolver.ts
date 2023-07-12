import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FriendsService } from './friends.service';
import { Friend } from './entities/friend.entity';
import { CreateFriendInput } from './dto/create-friend.input';

@Resolver(() => Friend)
export class FriendsResolver {
  constructor(private readonly friendsService: FriendsService) {}

  @Mutation(() => Friend)
  createFriend(@Args('createFriendInput') createFriendInput: CreateFriendInput) {
    return this.friendsService.create(createFriendInput);
  }

  @Query(() => [Friend], { name: 'getListFriendOfUser' })
  findAll(@Args("userId") id : string) {
    return this.friendsService.getListFriendOfUser(id);
  }

  @Mutation(() => Friend)
  removeFriend(@Args('_id') id : string) {
    return this.friendsService.remove(id);
  }
}
