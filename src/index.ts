import * as dotenv from "dotenv";

import { Transmissible } from "./tranceiver/transmissible";
import { DiscordTranceiver } from "./tranceiver/discord_impl/discord_tranceiver";
import { MessagePing } from "./messages/message_ping";
import { VCWatcher } from "./messages/vc_watch";

// load dotenv files
dotenv.config()

const { TOKEN, SEND_CHANNEL_ID } = process.env

if (TOKEN === undefined) {
    throw new Error("token is not found");
}

if (SEND_CHANNEL_ID === undefined) {
    throw new Error("send_channel_id is not found");
}

// できれば具象な情報は扱いたくないなあ
let tranceiver: Transmissible = new DiscordTranceiver({
    token: TOKEN,
    send_channel_id: SEND_CHANNEL_ID,
    prefix: ''
});

tranceiver.registMessage(new MessagePing());
tranceiver.registMessage(new VCWatcher());

tranceiver.initialize()
tranceiver.run();
