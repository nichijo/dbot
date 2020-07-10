import * as discord from "discord.js";
import { Transmissible } from "../adapter/transmissible";

/**
 * Discordトランシーバ実装
 * 
 * 特に言うことはないが、とりあえず今は仮の処理を入れている。
 * ここで言う、initialize内部でやっている処理をなんかいい感じにしたい。
 */
export class DiscordTranceiver implements Transmissible {
    token: string;
    client = new discord.Client();

    constructor(token: string) {
        this.token = token;
    }

    public initialize() {
        this.client.on('ready', () => {
            console.log('ready.');
        });

        this.client.on('message', (msg: discord.Message) => {
            if (msg.content === 'ping') {
                msg.channel.send('pong');
            }
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