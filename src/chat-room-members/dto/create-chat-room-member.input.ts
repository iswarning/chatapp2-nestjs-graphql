import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateChatRoomMemberInput {

  @Field(() => String)
  userId: string;

  @Field(() => String)
  chatRoomId: string;

}
