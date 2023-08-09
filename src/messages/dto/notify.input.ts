import { Field, InputType, PartialType } from "@nestjs/graphql";
import { ChatRoom } from "src/chat-rooms/entities/chat-room.entity";
import { FriendRequest } from "src/friend-requests/entities/friend-request.entity";
import { Friend } from "src/friends/entities/friend.entity";

@InputType()
export class MessageInput {
  
  @Field(() => String)
  _id: string

  @Field(() => String)
  message: string;

  @Field(() => String)
  type: string;

  @Field(() => String)
  senderId: string;

  @Field(() => String, { nullable: true, defaultValue: "" })
  seen: string;

  @Field(() => String, { nullable: true, defaultValue: "" })
  reaction: string;

  @Field(() => String)
  chatRoomId: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}

@InputType()
export class ChatRoomInput {

  @Field(() => String)
  _id: string

  @Field(() => [String])
  members: string[];

  @Field(() => String, { nullable: true, defaultValue: "" })
  photoURL: string;

  @Field(() => Boolean)
  isGroup: boolean;

  @Field(() => String, { nullable: true, defaultValue: "" })
  name: string;

  @Field(() => String, { nullable: true, defaultValue: "" })
  admin: string;

  @Field(() => String, { nullable: true, defaultValue: "" })
  lastMessage: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)     
  updatedAt: string;
}

@InputType()
export class FriendInput {

  @Field(() => String)
  _id: string

  @Field(() => String)
  senderId: string

  @Field(() => String)
  recipientId: string

  @Field(() => String)
  createdAt: string;
}

@InputType()
export class FriendRequestInput {

  @Field(() => String)
  _id: string

  @Field(() => String)
  senderId: string

  @Field(() => String)
  recipientId: string

  @Field(() => String)
  createdAt: string;
}

@InputType()
export class DataNotifyInput {

    @Field(() => MessageInput, { nullable: true })
    message?: MessageInput

    @Field(() => ChatRoomInput, { nullable: true })
    chatRoom?: ChatRoomInput

    @Field(() => FriendInput, { nullable: true })
    friend?: FriendInput

    @Field(() => FriendRequestInput, { nullable: true })
    friendRequest?: FriendRequestInput
}

@InputType()
export class DataVideoCallInput {

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

@InputType()
export class NotifyInput {

  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => String)
  type: string;

  @Field(() => String)
  senderId: string;

  @Field(() => String)
  recipientId: string;

  @Field(() => DataVideoCallInput, { nullable: true })
  dataVideoCall?: DataVideoCallInput;

  @Field(() => DataNotifyInput, { nullable: true })
  dataNotify?: DataNotifyInput

}
