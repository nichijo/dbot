import { MessagePing } from "messages/discord_impl/message_ping";
import MockDiscord from '__tests__/mock/discord_mock';

test('コマンド名テスト', () => {
    let mping = new MessagePing();
    expect(mping.getCommandName()).toBe('ping');
});

test('想定メッセージテスト', () => {
    let mping = new MessagePing();
    let d = new MockDiscord();
    let mockMsg = d.getMessage();

    expect(mping.onMessageSend()(mockMsg)).toBe('pong!');
});
