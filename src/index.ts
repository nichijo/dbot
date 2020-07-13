import * as tran from "./tranceiver/discord_tranceiver";
import * as dotenv from "dotenv";

import { Transmissible } from "./adapter/transmissible";
import { MessagePing } from "./messages/message_ping";

// load dotenv files
dotenv.config()

const {TOKEN} = process.env

if (TOKEN === undefined) {
    throw new Error("token is not found");
}

let tranceiver: Transmissible = new tran.DiscordTranceiver(TOKEN);
tranceiver.registMessage( new MessagePing() );
tranceiver.initialize()
tranceiver.run();
