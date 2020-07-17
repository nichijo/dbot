import { MessagePing } from "../../../messages/discord_impl/message_ping";

test('pingテスト', () => {
    let mping = new MessagePing();
    expect(mping.getCommandName()).toBe('ping');
});
