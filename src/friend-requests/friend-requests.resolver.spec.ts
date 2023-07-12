import { Test, TestingModule } from '@nestjs/testing';
import { FriendRequestsResolver } from './friend-requests.resolver';
import { FriendRequestsService } from './friend-requests.service';

describe('FriendRequestsResolver', () => {
  let resolver: FriendRequestsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FriendRequestsResolver, FriendRequestsService],
    }).compile();

    resolver = module.get<FriendRequestsResolver>(FriendRequestsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
