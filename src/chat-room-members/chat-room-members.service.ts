import { Injectable } from '@nestjs/common';
import { CreateChatRoomMemberInput } from './dto/create-chat-room-member.input';
import { InjectModel } from '@nestjs/mongoose';
import { ChatRoomMember } from './entities/chat-room-member.entity';
import { Model } from 'mongoose';
import { RemoveChatRoomMemberInput } from './dto/remove-chat-room-member.input';

@Injectable()
export class ChatRoomMembersService {
  constructor(
    @InjectModel(ChatRoomMember.name)
    private readonly chatRoomMemberModel: Model<ChatRoomMember>,
  ) {}

  create(createChatRoomMemberInput: CreateChatRoomMemberInput) {
    const chatRoomMember = new this.chatRoomMemberModel({
      ...createChatRoomMemberInput
    });
    return chatRoomMember.save();
  }

  remove(removeChatRoomMemberInput: RemoveChatRoomMemberInput) {
    const chatRoomMember = this.chatRoomMemberModel.find({ $and: [{ userId: removeChatRoomMemberInput.userId, chatRoomId: removeChatRoomMemberInput.chatRoomId }] }).findOne();
    return chatRoomMember.deleteOne();
  }

}
