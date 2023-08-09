import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { Message } from './entities/message.entity';
import { PubSub } from 'graphql-subscriptions';
import { NotifyResponse } from './dto/notify.response';
import { ChatRoomsService } from 'src/chat-rooms/chat-rooms.service';
import { UsersService } from 'src/users/users.service';
import { PaginateInput } from './dto/paginate.input';
import { NotifyInput } from './dto/notify.input';

const pubSub =  new PubSub();
@Resolver(() => Message)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService,
    private readonly chatRoomsService: ChatRoomsService,
    private readonly userService: UsersService,
    ) {}

  @Mutation(() => Message,{ name: 'createMessage'})
  async create(@Args('createMessageInput') createMessageInput: CreateMessageInput) {
    const newMessage = await this.messagesService.create(createMessageInput);
    return newMessage
  }

  @Mutation(() => Boolean)
  pushNotify(@Args('notifyInput') notifyInput: NotifyInput) {
    pubSub.publish("push-notify", { onSubscription: notifyInput })
    return true
  }

  @Subscription(() => NotifyResponse)
  onSubscription() {
    return pubSub.asyncIterator("push-notify")
  }

  @Query(() => [Message],{ name: 'messages'})
  findAll() {
    return this.messagesService.findAll();
  }

  @Query(() => Message,{ name: 'message'})
  findOne(@Args('_id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Query(() => Message)
  getFileByKey(@Args('key') key: string) {
    return this.messagesService.getFileByKey(key);
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

  @Query(() => [Message])
  paginateMessage(@Args("paginateInput") input: PaginateInput) {
    return this.messagesService.paginateMessage(input)
  }

}
