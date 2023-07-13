import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { Friend } from 'src/friends/entities/friend.entity';

@Injectable()
export class UsersService {
  constructor(
      @InjectModel(User.name)
      private readonly userModel: Model<User>,
  ) {}
  
  async create(createUserInput: CreateUserInput) {
    try {
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
}
