import { InputType, Field, ObjectType } from '@nestjs/graphql';

@InputType()
@ObjectType()
export class CreateChatRoomInput {

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
