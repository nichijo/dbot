import { Messageable } from "../adapter/messageable";

/**
 * ぴんぽん！
 */
export class MessagePing implements Messageable {

    private com: string;

    public onReady(): () => void {
        return () => {this.com = "pong"};
    }

    public getCommandName(): string { return "ping"; }

    public onMessageSend(): () => string {
        return () => this.com;
    }

}