import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { ChatRoomsService } from 'src/chat-rooms/chat-rooms.service';
import { FriendsService } from 'src/friends/friends.service';
import { FriendRequestsService } from 'src/friend-requests/friend-requests.service';
import { Friend, FriendSchema } from 'src/friends/entities/friend.entity';
import { ChatRoom, ChatRoomSchema } from 'src/chat-rooms/entities/chat-room.entity';
import { FriendRequest, FriendRequestSchema } from 'src/friend-requests/entities/friend-request.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: ChatRoom.name,
        schema: ChatRoomSchema,
      },
      {
        name: Friend.name,
        schema: FriendSchema,
      },
      {
        name: FriendRequest.name,
        schema: FriendRequestSchema,
      },
    ]),
  ],
  providers: [UsersResolver, UsersService, ChatRoomsService, FriendsService, FriendRequestsService]
})
export class UsersModule {}
