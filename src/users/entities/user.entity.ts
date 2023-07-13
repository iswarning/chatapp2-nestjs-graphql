import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { InitialDataResponse } from '../dto/initial-data.response';

@Schema()
@ObjectType()
export class User {

  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String)
  email: string;

  @Prop()
  @Field(() => String, { nullable: true, defaultValue: "" })
  photoURL: string;

  @Prop()
  @Field(() => String)
  fullName: string;

  @Prop()
  @Field(() => String, { nullable: true, defaultValue: "" })
  phoneNumber: string;

  @Prop()
  @Field(() => String, { nullable: true, defaultValue: "" })
  fcmToken: string;

  @Prop()
  @Field(() => String)
  createdAt: string;

  @Prop()
  @Field(() => String)
  updatedAt: string;

  @Field(() => InitialDataResponse, { nullable: true })
  initialData: InitialDataResponse;
}

export const UserSchema = SchemaFactory.createForClass(User);