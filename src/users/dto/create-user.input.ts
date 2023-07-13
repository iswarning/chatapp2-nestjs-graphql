import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true, defaultValue: "" })
  photoURL: string;

  @Field(() => String)
  fullName: string;

  @Field(() => String, { nullable: true, defaultValue: "" })
  phoneNumber: string;

  @Field(() => String, { nullable: true, defaultValue: "" })
  fcmToken: string;

}
