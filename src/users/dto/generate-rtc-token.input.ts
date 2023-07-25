import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GenerateRtcTokenInput {

    @Field(() => String)
    chatRoomId: string

}