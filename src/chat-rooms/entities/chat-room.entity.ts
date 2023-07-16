import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
@ObjectType()
export class ChatRoom {
  
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => [String])
  members: string[];

  @Prop()
  @Field(() => String, { nullable: true, defaultValue: "" })
  photoURL: string;

  @Prop()
  @Field(() => Boolean)
  isGroup: boolean;

  @Prop()
  @Field(() => String, { nullable: true, defaultValue: "" })
  name: string;

  @Prop()
  @Field(() => String, { nullable: true, defaultValue: "" })
  admin: string;

  @Prop()
  @Field(() => String)
  createdAt: string;

  @Prop()
  @Field(() => String)
  updatedAt: string;
}

export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom);
