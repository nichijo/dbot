import * as discord from "discord.js";
import { Transmissible } from "tranceiver/transmissible";
import { Messageable } from "tranceiver/message_core/messageable";
import { ValueVoiceState } from "tranceiver/message_core/value_voicestate";

type CommandFunctions = Array<(msg: discord.Message) => string>;
type onVoiceStateUpdateFunctions = Array<(before: ValueVoiceState, after: ValueVoiceState) => string>;

/**
 * Discordトランシーバ実装
 * 
 * 特に言うことはないが、とりあえず今は仮の処理を入れている。
 * ここで言う、initialize内部でやっている処理をなんかいい感じにしたい。
 */
export class DiscordTranceiver implements Transmissible {

    private token: string = '';
    private send_channel_id: string;
    private prefix: string = '';
    private client = new discord.Client();

    // key
    //  |-> () => string
    //  |-> () => string
    private commandMap: Map<string, CommandFunctions> = new Map<string, CommandFunctions>();

    // fixme: onVoice...をinterfaceに変更すぺ
    private eventMap: Map<string, onVoiceStateUpdateFunctions> = new Map<string, onVoiceStateUpdateFunctions>();

    // ready list
    private readyList: Array<() => void> = new Array();

    /**
     * @param token discordのapiトークン
     * @param send_channel_id 起動時の発言VCチャットルームのID
     * @param prefix デフォルトは`''` コマンドの頭文字に必要な文字を指定する場合は任意の文字を入れる
     */
    constructor({ token, send_channel_id, prefix }: {token:string, send_channel_id:string, prefix:string}) {
        this.token = token;
        this.send_channel_id = send_channel_id;
        this.prefix = prefix;
    }

    /**
     * メッセージ登録
     * @param msg 任意のMessageable
     */
    public registMessage(msg: Messageable) {
        const comName = msg.getCommandName();
        const onMessage = msg.onMessageSend();
        const onVoiceStateUpdate = msg.onVoiceStateUpdate();

        if (comName.isDefine) {
            if (this.commandMap.get(comName.name) === undefined) {
                this.commandMap.set(comName.name, new Array());
            }
            this.commandMap.get(comName.name)?.push(onMessage.f);
            console.log("regist command");
        }

        if (onVoiceStateUpdate.isDefine) {
            if (this.eventMap.get("onVoiceStateUpdate") === undefined) {
                this.eventMap.set("onVoiceStateUpdate", new Array());
            }
            this.eventMap.get("onVoiceStateUpdate")?.push(onVoiceStateUpdate.f);
            console.log("registed voiceStateUpdate");
        }

        this.readyList.push(msg.onReady());
    }

    /**
     * 初期化 fixme: 非ドメイン
     */
    public initialize() {

        this.client.on('ready', () => {
            this.readyList.forEach(v => {
                v();
            });
            console.log('ready.');
        });

        this.commandMap.forEach((value, key) => {
            this.client.on('message', (msg: discord.Message) => {
                // contentが一致している場合（ map のキー = コマンド名 という想定 )
                if (msg.content === this.prefix + key) {
                    // onMessageイベントを呼んで発言してもらう
                    value.forEach(onMessage => {
                        msg.channel.send(onMessage(msg))
                    })
                }
            })
        });

        this.client.on('voiceStateUpdate', (before, after) => {
            let beforeName = before.member?.user.username;
            if (beforeName == null) {
                beforeName = undefined;
            }

            let beforeValue = new ValueVoiceState({
                username: beforeName,
                voice_channel_name: before.channel?.name
            });

            let afterName = after.member?.user.username;
            if (afterName == null) {
                afterName = undefined;
            }

            let afterValue = new ValueVoiceState({
                username: afterName,
                voice_channel_name: after.channel?.name
            });
            console.log("voiceStatusUpdate");
            console.log(`beforeName : ${beforeValue.username}`);
            console.log(`beforeVC   : ${beforeValue.voice_channel_name}`);
            console.log(`afterName : ${afterValue.username}`);
            console.log(`afterVC   : ${afterValue.voice_channel_name}`);

            this.eventMap.forEach((value, key) => {
                value.forEach(onVoiceStateUpdate => {
                    this.client.channels.fetch(this.send_channel_id)
                        .then(v => {
                            if (v.type == "text") {
                                let textChannel = v as discord.TextChannel;
                                textChannel.send(onVoiceStateUpdate(beforeValue, afterValue));
                            }
                        });
                });
            });
        });

        this.client.on('message', (msg: discord.Message) => {
            if (msg.content === 'hello') {
                msg.channel.send('yeah');
            }
        });

        // Create an event listener for messages
        this.client.on('message', message => {
            // If the message is "what is my avatar"
            if (message.content === 'what is my avatar') {
                // Send the user's avatar URL
                message.reply(message.author.displayAvatarURL());
            }
        });

        this.client.on('message', message => {
            // If the message is "how to embed"
            if (message.content === 'how to embed') {
                // We can create embeds using the MessageEmbed constructor
                // Read more about all that you can do with the constructor
                // over at https://discord.js.org/#/docs/main/master/class/MessageEmbed
                const embed = new discord.MessageEmbed()
                    // Set the title of the field
                    .setTitle('A slick little embed')
                    // Set the color of the embed
                    .setColor(0xff0000)
                    // Set the main content of the embed
                    .setDescription('Hello, this is a slick embed!');
                // Send the embed to the same channel as the message
                message.channel.send(embed);
            }
        });
    }

    public run() {
        this.client.login(this.token);
    }
}