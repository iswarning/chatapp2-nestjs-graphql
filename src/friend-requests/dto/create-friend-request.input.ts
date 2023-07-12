import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateFriendRequestInput {

  @Field(() => String)
  senderId: string

  @Field(() => String)
  recipientId: string

}
