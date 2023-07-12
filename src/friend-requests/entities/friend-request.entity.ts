import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
@ObjectType()
export class FriendRequest {

  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String)
  senderId: string

  @Prop()
  @Field(() => String)
  recipientId: string

  @Prop()
  @Field(() => String)
  createdAt: string;

}

export const FriendRequestSchema = SchemaFactory.createForClass(FriendRequest);
