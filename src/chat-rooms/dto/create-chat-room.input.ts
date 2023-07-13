import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { ChatRoomMember } from 'src/chat-room-members/entities/chat-room-member.entity';

@InputType()
@ObjectType()
export class CreateChatRoomInput {

  @Field(() => [ChatRoomMember])
  members: Array<ChatRoomMember>;

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
