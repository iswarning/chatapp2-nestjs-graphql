import { Mutation, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { NotifyResponse } from "./messages/dto/notify.response";

const pubSub =  new PubSub();

const TRIGGER_NOTIFY = "publisher-notify"

const TRIGGER_CALL = "publisher-call"

@Resolver()
export class AppResolver {

    @Subscription(() => NotifyResponse)
    onSub() {
        return pubSub.asyncIterator(TRIGGER_NOTIFY)
    }

    @Subscription(() => NotifyResponse)
    onCall() {
        return pubSub.asyncIterator(TRIGGER_CALL)
    }

    @Mutation(() => NotifyResponse)
    videoCall(notifyData: NotifyResponse) {
        pubSub.publish("publisher-call", {
            onCall: notifyData
        })
        return notifyData
    }

}