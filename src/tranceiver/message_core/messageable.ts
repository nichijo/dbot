import {Message} from 'discord.js';
import {ValueVoiceState} from 'tranceiver/message_core/value_voicestate';


export interface Messageable {

    onReady(): () => void;

    getCommandName(): { name: string, isDefine: boolean } ;

    onMessageSend(): { f: (msg: Message) => string, isDefine: boolean };

    onVoiceStateUpdate(): { f: ((before: ValueVoiceState, after: ValueVoiceState) => string), isDefine: boolean };

}