import { MessagePing } from "messages/message_ping";
import MockDiscord from '__tests__/mock/discord_mock';

test('コマンド名テスト', () => {
    let mping = new MessagePing();
    let com = mping.getCommandName();

    expect(mping.getCommandName().isDefine).toBe(true);
    expect(mping.getCommandName().name).toBeDefined();
    expect(com.name).toBe('ping');
});

test('想定メッセージテスト', () => {
    let mping = new MessagePing();
    let d = new MockDiscord();
    let mockMsg = d.getMessage();

    let f = mping.onMessageSend();

    expect(f.f).toBeDefined();
    expect(f.isDefine).toBe(true);
    expect(f.f?.(mockMsg)).toBe('pong!');
});
