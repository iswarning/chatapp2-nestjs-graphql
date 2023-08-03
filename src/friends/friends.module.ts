import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsResolver } from './friends.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Friend, FriendSchema } from './entities/friend.entity';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { MessagesResolver } from 'src/messages/messages.resolver';
import { Message, MessageSchema } from 'src/messages/entities/message.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Friend.name,
        schema: FriendSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [FriendsResolver, FriendsService, UsersService],
  exports: [FriendsService]
})
export class FriendsModule {}
