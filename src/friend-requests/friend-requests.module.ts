import { Module } from '@nestjs/common';
import { FriendRequestsService } from './friend-requests.service';
import { FriendRequestsResolver } from './friend-requests.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendRequest, FriendRequestSchema } from './entities/friend-request.entity';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/users/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FriendRequest.name,
        schema: FriendRequestSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [FriendRequestsResolver, FriendRequestsService, UsersService],
  exports: [FriendRequestsService]
})
export class FriendRequestsModule {}
