import { Module } from '@nestjs/common';
import { ChatRoomsService } from './chat-rooms.service';
import { ChatRoomsResolver } from './chat-rooms.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatRoom, ChatRoomSchema } from './entities/chat-room.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ChatRoom.name,
        schema: ChatRoomSchema,
      },
    ]),
  ],
  providers: [ChatRoomsResolver, ChatRoomsService],
})
export class ChatRoomsModule {}
