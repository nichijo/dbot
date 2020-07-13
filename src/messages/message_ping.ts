import { Messageable } from "../adapter/messageable";

/**
 * ぴんぽん！
 */
export class MessagePing implements Messageable {

    public getCommandName(): string { return "ping"; }
    
    public onMessageSend(): () => string {
        return this.send;
    }

    public send() : string {
        return "pong";
    }

}