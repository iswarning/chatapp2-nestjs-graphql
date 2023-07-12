import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatRoomInput } from './dto/create-chat-room.input';
import { UpdateChatRoomInput } from './dto/update-chat-room.input';
import { InjectModel } from '@nestjs/mongoose';
import { ChatRoom } from './entities/chat-room.entity';
import { Model } from 'mongoose';

@Injectable()
export class ChatRoomsService {
  constructor(
      @InjectModel(ChatRoom.name)
      private readonly chatRoomModel: Model<ChatRoom>,
  ) {}

  create(createChatRoomInput: CreateChatRoomInput) {
    const chatRoom = new this.chatRoomModel({
      ...createChatRoomInput,
      createdAt: (new Date()).toLocaleString(),
      updatedAt: (new Date()).toLocaleString()
    });
    return chatRoom.save();
  }

  findAll() {
    return this.chatRoomModel.find().sort({ updatedAt: -1 }).exec();
  }

  async findOne(id: string) {
    const chatRoom = await this.chatRoomModel.findOne({ _id: id }).exec();
    if (!chatRoom) {
        throw new NotFoundException(`Message ${id} not found`);
    }
    return chatRoom;
  }

  async update(id: string, updateChatRoomInput: UpdateChatRoomInput) {
    const existing = await this.chatRoomModel
            .findOneAndUpdate({ _id: id }, { $set: {
            ...updateChatRoomInput,
            updatedAt: (new Date()).toLocaleString()
            } }, { new: true })
            .exec();

        if (!existing) {
            throw new NotFoundException(`Chat Room ${id} not found`);
        }
        return existing;
  }

  async remove(id: string) {
    const chatRoom = await this.findOne(id);
    return chatRoom.deleteOne();
  }
}
