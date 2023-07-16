import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { Message } from './entities/message.entity';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Mutation(() => Message,{ name: 'createMessage'})
  create(@Args('createMessageInput') createMessageInput: CreateMessageInput) {
    return this.messagesService.create(createMessageInput);
  }

  @Query(() => [Message],{ name: 'messages'})
  findAll() {
    return this.messagesService.findAll();
  }

  @Query(() => Message,{ name: 'message'})
  findOne(@Args('_id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Query(() => [Message],{ name: 'getAllMessagesByChatRoomId'})
  getAllMessagesByChatRoomId(@Args('chatRoomId') id: string) {
    return this.messagesService.getAllMessagesByChatRoomId(id)
  }

  @Query(() => Message,{ name: 'getLastMessage'})
  getLastMessage(@Args('chatRoomId') id: string) {
    return this.messagesService.getLastMessage(id)
  }

  @Mutation(() => Message,{ name: 'updateMessage'})
  update(@Args('updateMessageInput') updateMessageInput: UpdateMessageInput) {
    return this.messagesService.update(updateMessageInput._id, updateMessageInput);
  }

  @Mutation(() => Message,{ name: 'removeMessage'})
  remove(@Args('_id') id: string) {
    return this.messagesService.remove(id);
  }
}
