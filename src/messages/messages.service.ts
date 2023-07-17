import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { Message } from './entities/message.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MessagesService {
    constructor(
        @InjectModel(Message.name)
        private readonly messageModel: Model<Message>,
    ) {}

    create(createMessageInput: CreateMessageInput) {
        const message = new this.messageModel({
            ...createMessageInput,
            createdAt: (new Date()).toLocaleString(),
            updatedAt: (new Date()).toLocaleString()
        });
        return message.save();
    }

    findAll() {
        return this.messageModel.find().exec();
    }

    async getAllMessagesByChatRoomId(chatRoomId: string) {
        return await this.messageModel.find({ chatRoomId: chatRoomId }).exec()
    }

    async getLastMessage(chatRoomId: string) {
        return await this.messageModel.find({ chatRoomId: chatRoomId }).sort({ createdAt: -1 }).findOne().exec()
    }

    async findOne(id: string) {
        const message = await this.messageModel.findOne({ _id: id }).exec();
        if (!message) {
            throw new NotFoundException(`Message ${id} not found`);
        }
        return message;
    }

    async update(id: string, updateMessageInput: UpdateMessageInput) {
        const existing = await this.messageModel
            .findOneAndUpdate({ _id: id }, { $set: {
            ...updateMessageInput,
            updatedAt: (new Date()).toLocaleString()
            } }, { new: true })
            .exec();

        if (!existing) {
            throw new NotFoundException(`Message ${id} not found`);
        }
        return existing;
    }

    async remove(id: string) {
        const message = await this.findOne(id);
        return message.deleteOne();
    }
}
