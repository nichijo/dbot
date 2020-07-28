"use strict";
exports.__esModule = true;
var vc_watch_1 = require("messages/vc_watch");
var value_voicestate_1 = require("tranceiver/message_core/value_voicestate");
test('コマンド名テスト', function () {
    var watcher = new vc_watch_1.VCWatcher();
    expect(watcher.getCommandName().isDefine).toBeFalsy();
    expect(watcher.getCommandName().name).toBe('');
});

test('入室メッセージテスト', function () {
    var _a;
    var watcher = new vc_watch_1.VCWatcher();
    var lhs = new value_voicestate_1.ValueVoiceState({
        username: 'user username',
        voice_channel_name: undefined
    });
    var rhs = new value_voicestate_1.ValueVoiceState({
        username: 'user username',
        voice_channel_name: 'voice-channel'
    });
    var ret = watcher.onVoiceStateUpdate();
    expect(ret.isDefine).toBe(true);
    expect(ret.f).toBeDefined();
    expect((_a = ret.f) === null || _a === void 0 ? void 0 : _a.call(ret, lhs, rhs)).toBe('user username さんが voice-channel に入りました！');
});

test('退室メッセージテスト', function () {
    var _a;
    var watcher = new vc_watch_1.VCWatcher();
    var lhs = new value_voicestate_1.ValueVoiceState({
        username: 'user username',
        voice_channel_name: 'voice-channel'
    });
    var rhs = new value_voicestate_1.ValueVoiceState({
        username: 'user username',
        voice_channel_name: undefined
    });
    var ret = watcher.onVoiceStateUpdate();
    expect(ret.isDefine).toBe(true);
    expect(ret.f).toBeDefined();
    expect((_a = ret.f) === null || _a === void 0 ? void 0 : _a.call(ret, lhs, rhs)).toBe('user username さんが voice-channel から出ました！');
});

test('入退室テスト', function () {
    var _a;
    var watcher = new vc_watch_1.VCWatcher();
    var lhs = new value_voicestate_1.ValueVoiceState({
        username: 'user username',
        voice_channel_name: 'voice-channel1'
    });
    var rhs = new value_voicestate_1.ValueVoiceState({
        username: 'user username',
        voice_channel_name: 'voice-channel2'
    });
    var ret = watcher.onVoiceStateUpdate();
    expect(ret.isDefine).toBe(true);
    expect(ret.f).toBeDefined();
    expect((_a = ret.f) === null || _a === void 0 ? void 0 : _a.call(ret, lhs, rhs))
        .toBe('user username さんが voice-channel1 から出ました！\nuser username さんが voice-channel2 に入りました！');
})