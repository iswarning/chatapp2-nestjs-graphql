import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class PaginateInput {

  @Field(() => Number)
  n: number;

  @Field(() => String)
  chatRoomId: string;
  
}
