import { Injectable } from '@nestjs/common';
import { CreateFriendRequestInput } from './dto/create-friend-request.input';
import { FriendRequest } from './entities/friend-request.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Args } from '@nestjs/graphql';

@Injectable()
export class FriendRequestsService {
  constructor(
      @InjectModel(FriendRequest.name)
      private readonly friendRequestModel: Model<FriendRequest>,
  ) {}

  async create(createFriendRequestInput: CreateFriendRequestInput) {
    const friendRequest = new this.friendRequestModel({
      ...createFriendRequestInput,
      createdAt: (new Date()).toLocaleString()
    });
    return await friendRequest.save();
  }

  async getFriendRequestBySenderId(@Args("senderId") id: string) {
    return await this.friendRequestModel.find({ senderId: id }).exec()
  }

  async getFriendRequestByRecipientId(@Args("recipientId") id: string) {
    return await this.friendRequestModel.find({ recipientId: id }).exec()
  }

  async remove(id: string) {
    const friend = this.friendRequestModel.findOne({ _id: id })
    friend.deleteOne();
    return await friend.exec()
  }
}
