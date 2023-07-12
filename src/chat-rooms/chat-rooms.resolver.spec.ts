import { Test, TestingModule } from '@nestjs/testing';
import { ChatRoomsResolver } from './chat-rooms.resolver';
import { ChatRoomsService } from './chat-rooms.service';

describe('ChatRoomsResolver', () => {
  let resolver: ChatRoomsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatRoomsResolver, ChatRoomsService],
    }).compile();

    resolver = module.get<ChatRoomsResolver>(ChatRoomsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
