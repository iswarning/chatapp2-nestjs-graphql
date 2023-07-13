import { Test, TestingModule } from '@nestjs/testing';
import { ChatRoomMembersResolver } from './chat-room-members.resolver';
import { ChatRoomMembersService } from './chat-room-members.service';

describe('ChatRoomMembersResolver', () => {
  let resolver: ChatRoomMembersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatRoomMembersResolver, ChatRoomMembersService],
    }).compile();

    resolver = module.get<ChatRoomMembersResolver>(ChatRoomMembersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
