import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { Message } from './entities/message.entity';
import { PubSub } from 'graphql-subscriptions';
import { ChatRoom } from 'src/chat-rooms/entities/chat-room.entity';
import { NotifyResponse } from './dto/notify.response';
import { ChatRoomsService } from 'src/chat-rooms/chat-rooms.service';

const pubSub =  new PubSub();
@Resolver(() => Message)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService,
    private readonly chatRoomsService: ChatRoomsService) {}

  @Mutation(() => Message,{ name: 'createMessage'})
  async create(@Args('createMessageInput') createMessageInput: CreateMessageInput) {
    const newMessage = await this.messagesService.create(createMessageInput);
    const chatRoom = await this.chatRoomsService.findOne(createMessageInput.chatRoomId)
    pubSub.publish("publisher-notify", { onSub: {
      senderId: createMessageInput.senderId,
      type: "send-message",
      message: `${createMessageInput.senderId} has sent a message`,
      recipientId: JSON.stringify(chatRoom.members),
      dataNotify: {
        message: newMessage
      }
    } as NotifyResponse })
    return newMessage
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
