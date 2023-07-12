import { Module } from '@nestjs/common';
import { FriendRequestsService } from './friend-requests.service';
import { FriendRequestsResolver } from './friend-requests.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendRequest, FriendRequestSchema } from './entities/friend-request.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FriendRequest.name,
        schema: FriendRequestSchema,
      },
    ]),
  ],
  providers: [FriendRequestsResolver, FriendRequestsService],
})
export class FriendRequestsModule {}
