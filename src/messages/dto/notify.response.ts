import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Message } from "../entities/message.entity";
import { ChatRoom } from "src/chat-rooms/entities/chat-room.entity";
import { Friend } from "src/friends/entities/friend.entity";
import { FriendRequest } from "src/friend-requests/entities/friend-request.entity";

@ObjectType()
export class DataNotify {

    @Field(() => Message, { nullable: true })
    message?: Message

    @Field(() => ChatRoom, { nullable: true })
    chatRoom?: ChatRoom

    @Field(() => Friend, { nullable: true })
    friend?: Friend

    @Field(() => FriendRequest, { nullable: true })
    friendRequest?: FriendRequest
}

@ObjectType()
export class DataVideoCall {

    @Field(() => String, { nullable: true })
    fullName?: string

    @Field(() => String, { nullable: true })
    photoURL?: string

    @Field(() => String, { nullable: true })
    chatRoomId?: string

    @Field(() => Boolean, { nullable: true })
    isGroup?: boolean

    @Field(() => String, { nullable: true })
    accessToken?: string

}

@ObjectType()
export class NotifyResponse {

  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => String)
  type: string;

  @Field(() => String)
  senderId: string;

  @Field(() => String)
  recipientId: string;

  @Field(() => DataVideoCall, { nullable: true })
  dataVideoCall?: DataVideoCall;

  @Field(() => DataNotify, { nullable: true })
  dataNotify?: DataNotify

}
