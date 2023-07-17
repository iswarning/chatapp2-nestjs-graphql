import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateMessageInput {

  @Field(() => String)
  message: string;

  @Field(() => String)
  type: string;

  @Field(() => String)
  senderId: string;

  @Field(() => String, { nullable: true, defaultValue: "" })
  seen: string;

  @Field(() => String)
  chatRoomId: string;
  
}
