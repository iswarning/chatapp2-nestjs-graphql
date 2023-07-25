import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class NotifyInput {

  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => String)
  type: string;

  @Field(() => String)
  senderId: string;

  @Field(() => String)
  recipientId: string;

  @Field(() => String, { nullable: true })
  fullName?: string

  @Field(() => String, { nullable: true })
  photoURL?: string

  @Field(() => String, { nullable: true })
  chatRoomId?: string

  @Field(() => Boolean, { nullable: true })
  isGroup?: boolean

  @Field(() => String, { nullable: true })
  accessToken?: string

}
