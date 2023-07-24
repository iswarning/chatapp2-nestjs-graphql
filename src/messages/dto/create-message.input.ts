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

  @Field(() => String, { nullable: true, defaultValue: "" })
  file: string;

  @Field(() => String, { nullable: true, defaultValue: "" })
  images: string;

  @Field(() => String, { nullable: true, defaultValue: "" })
  reaction: string;

  @Field(() => String, { nullable: true, defaultValue: "" })
  createdAt: string;
  
  @Field(() => String, { nullable: true, defaultValue: "" })
  updatedAt: string;

  @Field(() => String)
  chatRoomId: string;
  
}
