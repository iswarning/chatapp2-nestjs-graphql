import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { ChatRoomsService } from './chat-rooms.service';
import { ChatRoom } from './entities/chat-room.entity';
import { CreateChatRoomInput } from './dto/create-chat-room.input';
import { UpdateChatRoomInput } from './dto/update-chat-room.input';
import { NotifyResponse } from 'src/messages/dto/notify.response';
import { PubSub } from 'graphql-subscriptions';

const pubSub =  new PubSub();
@Resolver(() => ChatRoom)
export class ChatRoomsResolver {
  constructor(private readonly chatRoomsService: ChatRoomsService) {}

  @Mutation(() => ChatRoom)
  createChatRoom(@Args('createChatRoomInput') createChatRoomInput: CreateChatRoomInput) {
    return this.chatRoomsService.create(createChatRoomInput);
  }

  @Query(() => [ChatRoom], { name: 'chatRooms' })
  findAll() {
    return this.chatRoomsService.findAll();
  }

  @Query(() => ChatRoom, { name: 'chatRoom' })
  findOne(@Args('_id') id: string) {
    return this.chatRoomsService.findOne(id);
  }

  @Mutation(() => ChatRoom)
  updateChatRoom(@Args('updateChatRoomInput') updateChatRoomInput: UpdateChatRoomInput) {
    return this.chatRoomsService.update(updateChatRoomInput._id, updateChatRoomInput);
  }

  @Mutation(() => ChatRoom)
  removeChatRoom(@Args('_id') id: string) {
    return this.chatRoomsService.remove(id);
  }

  @Query(() => [ChatRoom])
  getListChatRoomOfUser(@Args("_id") id: string) {
    return this.chatRoomsService.getListChatRoomOfUser(id);
  }

  @Subscription(() => NotifyResponse)
  onCall() {
      return pubSub.asyncIterator("publisher-notify")
  }

  @Mutation(() => NotifyResponse)
  videoCall(notifyData: NotifyResponse) {
      pubSub.publish("publisher-call", {
          onCall: notifyData
      })
      return notifyData
  }
}
