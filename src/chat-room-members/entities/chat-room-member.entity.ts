import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class ChatRoomMember {

  @Prop()
  @Field(() => String)
  userId: number;

  @Prop()
  @Field(() => String)
  chatRoomId: string;

}

export const ChatRoomMemberSchema = SchemaFactory.createForClass(ChatRoomMember);

