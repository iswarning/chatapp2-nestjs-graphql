import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { Friend } from 'src/friends/entities/friend.entity';
import { RtcRole, RtcTokenBuilder } from 'agora-token';

@Injectable()
export class UsersService {
  constructor(
      @InjectModel(User.name)
      private readonly userModel: Model<User>,
  ) {}
  
  async create(createUserInput: CreateUserInput) {
    try {
      const userExist = await this.userModel.find({ email: createUserInput.email }).findOne().exec()
      if(userExist) {
        return userExist
      }
      const user = new this.userModel({
        ...createUserInput,
        createdAt: (new Date()).toLocaleString(),
        updatedAt: (new Date()).toLocaleString()
      });
      return await user.save();
    } catch (error) {
      console.log(error)
    }
  }

  findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findOne({ _id: id }).exec();
    if (!user) {
        throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const existing = await this.userModel
            .findOneAndUpdate({ _id: id }, { $set: {
            ...updateUserInput,
            updatedAt: (new Date()).toLocaleString()
            } }, { new: true })
            .exec();

    if (!existing) {
        throw new NotFoundException(`User ${id} not found`);
    }
    return existing;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return user.deleteOne();
  }

  generateRtcToken(chatRoomId: string) {

    const appId = process.env.AGORA_APP_ID;
    const appCertificate = process.env.AGORA_APP_CERTIFICATE;
    const channelName = chatRoomId;
    const uid = 0;
    const role = RtcRole.PUBLISHER;

    const expirationTimeInSeconds = 3600

    const currentTimestamp = Math.floor(Date.now() / 1000)

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

    const tokenA = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs, privilegeExpiredTs);
    
    return tokenA
  }
}
