import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChatRoomMembersService } from './chat-room-members.service';
import { ChatRoomMember } from './entities/chat-room-member.entity';
import { CreateChatRoomMemberInput } from './dto/create-chat-room-member.input';
import { RemoveChatRoomMemberInput } from './dto/remove-chat-room-member.input';

@Resolver(() => ChatRoomMember)
export class ChatRoomMembersResolver {
  constructor(private readonly chatRoomMembersService: ChatRoomMembersService) {}

  @Mutation(() => ChatRoomMember)
  createChatRoomMember(@Args('createChatRoomMemberInput') createChatRoomMemberInput: CreateChatRoomMemberInput) {
    return this.chatRoomMembersService.create(createChatRoomMemberInput);
  }

  @Mutation(() => ChatRoomMember)
  removeChatRoomMember(@Args('removeChatRoomMemberInput') removeChatRoomMemberInput: RemoveChatRoomMemberInput) {
    return this.chatRoomMembersService.remove(removeChatRoomMemberInput);
  }
}
