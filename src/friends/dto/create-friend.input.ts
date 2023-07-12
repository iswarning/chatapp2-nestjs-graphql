import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateFriendInput {

  @Field(() => String)
  senderId: string

  @Field(() => String)
  recipientId: string

}
