import * as tran from "./tranceiver/discord_impl/discord_tranceiver";
import * as dotenv from "dotenv";
import * as discord from "discord.js";

import { Transmissible } from "./tranceiver/transmissible";
import { MessagePing } from "./messages/discord_impl/message_ping";

// load dotenv files
dotenv.config()

const { TOKEN } = process.env

if (TOKEN === undefined) {
    throw new Error("token is not found");
}

// できれば具象な情報は扱いたくないなあ
let tranceiver: Transmissible<discord.Message> = new tran.DiscordTranceiver(TOKEN);

tranceiver.registMessage(new MessagePing());
tranceiver.initialize()
tranceiver.run();
