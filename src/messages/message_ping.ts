import { Message, VoiceState } from "discord.js";

import * as msg from "tranceiver/message_core/messageable";
import { ValueVoiceState } from "tranceiver/message_core/value_voicestate";

/**
 * ぴんぽん！
 */
export class MessagePing implements msg.Messageable {

    private com: string = "ping";

    public onReady(): () => void { return () => { }; }

    public getCommandName(): {name:string, isDefine:boolean} { 
        return { name: this.com, isDefine: true }; 
    }

    public onMessageSend(): {f: (m:Message) => string, isDefine: boolean} {
        return { f: _ => "pong!", isDefine: true };
    }

    public onVoiceStateUpdate(): { f: ((before: ValueVoiceState, after: ValueVoiceState) => string), isDefine: boolean; } {

        return { f:(x, y) => '',  isDefine: false };
    }

}