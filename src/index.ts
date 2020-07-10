import * as tran from "./tranceiver/discord_tranceiver";
import * as dotenv from "dotenv";
import { Transmissible } from "./adapter/transmissible";

// load dotenv files
dotenv.config()

const {TOKEN} = process.env

if (TOKEN === undefined) {
    throw new Error("token is not found");
}

let tranceiver : Transmissible = new tran.DiscordTranceiver(TOKEN);
tranceiver.initialize()
tranceiver.run();
