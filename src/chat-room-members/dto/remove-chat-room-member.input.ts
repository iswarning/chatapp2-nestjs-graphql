import { CreateChatRoomMemberInput } from './create-chat-room-member.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class RemoveChatRoomMemberInput extends PartialType(CreateChatRoomMemberInput) {

}
