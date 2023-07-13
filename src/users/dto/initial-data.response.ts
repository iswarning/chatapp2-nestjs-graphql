import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";
import { Friend } from "src/friends/entities/friend.entity";
import { FriendRequest } from "src/friend-requests/entities/friend-request.entity";
import { ChatRoom } from "src/chat-rooms/entities/chat-room.entity";

@ObjectType()
export class InitialDataResponse {

    @Field(() => User)
    userInfo: User

    @Field(() => [Friend])
    listFriend: Array<Friend>

    @Field(() => [FriendRequest])
    listFriendRequest: Array<FriendRequest>

    @Field(() => [ChatRoom])
    listChatRoom: Array<ChatRoom>
}