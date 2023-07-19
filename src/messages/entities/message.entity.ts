import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class Message {

  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String)
  message: string;

  @Prop()
  @Field(() => String)
  type: string;

  @Prop()
  @Field(() => String)
  senderId: string;

  @Prop()
  @Field(() => String, { nullable: true, defaultValue: "" })
  seen: string;

  @Prop()
  @Field(() => String, { nullable: true, defaultValue: "" })
  file: string;

  @Prop()
  @Field(() => String, { nullable: true, defaultValue: "" })
  images: string;

  @Prop()
  @Field(() => String)
  chatRoomId: string;

  @Prop()
  @Field(() => String)
  createdAt: string;

  @Prop()
  @Field(() => String)
  updatedAt: string;

}

export const MessageSchema = SchemaFactory.createForClass(Message);