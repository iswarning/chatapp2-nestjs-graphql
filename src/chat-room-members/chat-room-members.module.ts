import { Module } from '@nestjs/common';
import { ChatRoomMembersService } from './chat-room-members.service';
import { ChatRoomMembersResolver } from './chat-room-members.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatRoomMemberSchema, ChatRoomMember } from './entities/chat-room-member.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ChatRoomMember.name,
        schema: ChatRoomMemberSchema,
      },
    ]),
  ],
  providers: [ChatRoomMembersResolver, ChatRoomMembersService]
})
export class ChatRoomMembersModule {}
