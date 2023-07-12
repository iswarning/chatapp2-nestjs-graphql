import { CreateFriendRequestInput } from './create-friend-request.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFriendRequestInput extends PartialType(CreateFriendRequestInput) {
  @Field(() => String)
  _id: string;
}
