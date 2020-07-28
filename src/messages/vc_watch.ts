import { Message, VoiceState } from "discord.js";
import { Messageable } from "tranceiver/message_core/messageable";
import { ValueVoiceState } from "tranceiver/message_core/value_voicestate";

/**
 * 指定したvoice chat roomに入った人、入ったタイミング、出た人、出たタイミングを通知する
 */
export class VCWatcher implements Messageable {

    public onReady(): () => void { return () => { }; }

    public getCommandName(): { name: string; isDefine: boolean } {
        return { name:'', isDefine: false };
    }
    
    public onMessageSend(): {f: ((msg: Message) => string), isDefine: boolean} {
        return { f: () => '', isDefine: false };
    }
    
    public onVoiceStateUpdate(): { f: (before: ValueVoiceState, after: ValueVoiceState) => string, isDefine: boolean } {
        return {
            f: (before: ValueVoiceState, after: ValueVoiceState) => {

                const leftChannel = after.voice_channel_name === undefined;
                const joinedChannel = before.voice_channel_name === undefined;

                if (leftChannel) {
                    return after.username + " さんが " + before.voice_channel_name + " から出ました！";
                } else if (joinedChannel) {
                    return after.username + " さんが " + after.voice_channel_name + " に入りました！";
                } else {
                    let ret = after.username + " さんが " + before.voice_channel_name + " から出ました！";
                    ret += '\n' + after.username + " さんが " + after.voice_channel_name + " に入りました！";
                    return ret;
                }

            },
            isDefine: true
        };
    }

}