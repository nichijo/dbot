import * as discord from "discord.js";

import { Messageable } from "../messageable";

/**
 * ぴんぽん！
 */
export class MessagePing implements Messageable<discord.Message> {

    private com: string;

    public onReady(): () => void {
        return () => {this.com = "pong"};
    }

    public getCommandName(): string { return "ping"; }

    public onMessageSend(): (msg:discord.Message) => string {
        return (msg: discord.Message) => this.com;
    }

}