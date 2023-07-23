import { Injectable } from '@nestjs/common';
import { CreateFriendInput } from './dto/create-friend.input';
import { InjectModel } from '@nestjs/mongoose';
import { Friend } from './entities/friend.entity';
import { Model } from 'mongoose';

@Injectable()
export class FriendsService {
  constructor(
      @InjectModel(Friend.name)
      private readonly friendModel: Model<Friend>,
  ) {}

  async create(createFriendInput: CreateFriendInput) {
    const friend = new this.friendModel({
      ...createFriendInput,
      createdAt: (new Date()).toLocaleString()
    });
    return await friend.save();
  }

  async getListFriendOfUser(id: string) {
    return await this.friendModel.find({ $or: [ { senderId: id }, { recipientId: id} ] }).exec()
  }

  remove(id: string) {
    const friend = this.friendModel.findOne({ _id: id })
    return friend.deleteOne();
  }

}
