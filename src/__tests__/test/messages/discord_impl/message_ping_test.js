"use strict";
exports.__esModule = true;
var message_ping_1 = require("messages/message_ping");
var discord_mock_1 = require("__tests__/mock/discord_mock");
test('コマンド名テスト', function () {
    var mping = new message_ping_1.MessagePing();
    var com = mping.getCommandName();
    expect(mping.getCommandName().isDefine).toBe(true);
    expect(mping.getCommandName().name).toBeDefined();
    expect(com.name).toBe('ping');
});
test('想定メッセージテスト', function () {
    var _a;
    var mping = new message_ping_1.MessagePing();
    var d = new discord_mock_1["default"]();
    var mockMsg = d.getMessage();
    var f = mping.onMessageSend();
    expect(f.f).toBeDefined();
    expect(f.isDefine).toBe(true);
    expect((_a = f.f) === null || _a === void 0 ? void 0 : _a.call(f, mockMsg)).toBe('pong!');
});
