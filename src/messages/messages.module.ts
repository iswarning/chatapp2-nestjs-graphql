import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { Message, MessageSchema } from './entities/message.entity';
import { ChatRoomsService } from 'src/chat-rooms/chat-rooms.service';
import { ChatRoom, ChatRoomSchema } from 'src/chat-rooms/entities/chat-room.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Message.name,
        schema: MessageSchema,
      },
      {
        name: ChatRoom.name,
        schema: ChatRoomSchema,
      },
    ]),
  ],
  providers: [MessagesResolver, MessagesService, ChatRoomsService],
})
export class MessagesModule {}
