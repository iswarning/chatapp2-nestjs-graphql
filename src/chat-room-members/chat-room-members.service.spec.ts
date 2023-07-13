import { Test, TestingModule } from '@nestjs/testing';
import { ChatRoomMembersService } from './chat-room-members.service';

describe('ChatRoomMembersService', () => {
  let service: ChatRoomMembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatRoomMembersService],
    }).compile();

    service = module.get<ChatRoomMembersService>(ChatRoomMembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
