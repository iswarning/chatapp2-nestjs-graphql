import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { ChatRoomsModule } from './chat-rooms/chat-rooms.module';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';
import { FriendsModule } from './friends/friends.module';
import { FriendRequestsModule } from './friend-requests/friend-requests.module';
import { AppResolver } from './app.resolver';

@Module({
  imports: [CommonModule, UsersModule, ChatRoomsModule, MessagesModule, ChatRoomsModule, FriendsModule, FriendRequestsModule, AppResolver],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}