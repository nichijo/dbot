import * as discord from "discord.js"
import * as dotenv from "dotenv"
// load dotenv files
dotenv.config()

const {TOKEN} = process.env

if (TOKEN === undefined) {
    throw new Error("token is not found");
}

const client = new discord.Client();

client.on('ready', () => {
    console.log('ready.');
});

client.on('message', (msg:discord.Message) => {
    if (msg.content === 'ping') {
        msg.channel.send('pong');
    }
});

client.on('message', (msg: discord.Message) => {
    if (msg.content === 'hello') {
        msg.channel.send('yeah');
    }
});

// Create an event listener for messages
client.on('message', message => {
    // If the message is "what is my avatar"
    if (message.content === 'what is my avatar') {
      // Send the user's avatar URL
      message.reply(message.author.displayAvatarURL());
    }
  });

client.on('message', message => {
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

client.login(TOKEN)