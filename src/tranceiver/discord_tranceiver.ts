import * as discord from "discord.js";
import { Transmissible } from "../adapter/transmissible";
import { Messageable } from "../adapter/messageable";

/**
 * Discordトランシーバ実装
 * 
 * 特に言うことはないが、とりあえず今は仮の処理を入れている。
 * ここで言う、initialize内部でやっている処理をなんかいい感じにしたい。
 */
export class DiscordTranceiver implements Transmissible {

    token: string;

    client = new discord.Client();

    // key
    //   -> () => string
    //   -> () => string
    commands: Map<string, Array<() => string>> = new Map();

    constructor(token: string) {
        this.token = token;
    }

    /**
     * メッセージ登録
     */
    public registMessage(msg: Messageable) {
        const comName = msg.getCommandName();
        const onMessage = msg.onMessageSend();
        if (this.commands.get(comName) === undefined) {
            // undefined の場合は、arrayから生成する
            this.commands.set(comName, new Array(onMessage));
        } else {
            // undefinedではない場合は、すでにコマンド登録済み。なのでpushで追加する。
            this.commands.get(comName).push(onMessage);
        }
    }

    /**
     * 初期化 fixme: 非ドメイン
     */
    public initialize() {

        this.client.on('ready', () => {
            console.log('ready.');
        });

        this.commands.forEach((value, key) => {
            this.client.on('message', (msg: discord.Message) => {
                // contentが一致している場合（ map のキー = コマンド名 という想定 )
                if (msg.content === key) {
                    // onMessageイベントを呼んで発言してもらう
                    value.forEach(onMessage => {
                        msg.channel.send(onMessage())                        
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