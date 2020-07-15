import * as discord from "discord.js";
import { Transmissible } from "../transmissible";
import { Messageable } from "../../messages/messageable";

/**
 * Discordトランシーバ実装
 * 
 * 特に言うことはないが、とりあえず今は仮の処理を入れている。
 * ここで言う、initialize内部でやっている処理をなんかいい感じにしたい。
 */
export class DiscordTranceiver implements Transmissible<discord.Message> {

    token: string = '';
    prefix: string = '';

    client = new discord.Client();

    // key
    //  |-> () => string
    //  |-> () => string
    commandMap: Map<string, Array<(msg: discord.Message | undefined) => string>> = new Map();

    // ready list
    readyList: Array<(arg?: discord.Message | undefined) => void> = new Array();

    /**
     * @param token discordのapiトークン
     * @param prefix デフォルトは`''` コマンドの頭文字に必要な文字を指定する場合は任意の文字を入れる
     */
    constructor(token: string, prefix: string = '') {
        this.token = token;
        this.prefix = prefix;
    }

    /**
     * メッセージ登録
     * @param msg 任意のMessageable
     */
    public registMessage(msg: Messageable<discord.Message>) {
        const comName = msg.getCommandName();
        const onMessage = msg.onMessageSend();

        if (this.commandMap.get(comName) === undefined) {
            // undefined の場合は、arrayから生成する
            this.commandMap.set(comName, new Array(onMessage));
        } else {
            // undefinedではない場合は、すでにコマンド登録済み。なのでpushで追加する。
            this.commandMap.get(comName).push(onMessage);
        }

        const onReady = msg.onReady();
        this.readyList.push(onReady);
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