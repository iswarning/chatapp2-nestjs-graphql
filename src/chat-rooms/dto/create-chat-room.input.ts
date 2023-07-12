import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateChatRoomInput {

  @Field(() => String)
  members: string;

  @Field(() => String, { nullable: true, defaultValue: "" })
  photoURL: string;

  @Field()
  isGroup: boolean;

  @Field(() => String, { nullable: true, defaultValue: "" })
  name: string;

  @Field(() => String, { nullable: true, defaultValue: "" })
  admin: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

}
