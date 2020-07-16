import * as discord from "discord.js";

import { Messageable } from "../messageable";

/**
 * ぴんぽん！
 */
export class MessagePing implements Messageable<discord.Message> {

    private com: string = "ping";

    public onReady(): () => void { return () => { }; }

    public getCommandName(): string { return this.com; }

    public onMessageSend(): (msg: discord.Message) => string {
        return (msg: discord.Message) => "pong!";
    }
}