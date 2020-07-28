import { VCWatcher } from "messages/vc_watch";
import { ValueVoiceState } from "tranceiver/message_core/value_voicestate";

test('コマンド名テスト', () => {
    let watcher = new VCWatcher();
    expect(watcher.getCommandName().isDefine).toBeFalsy();
    expect(watcher.getCommandName().name).toBe('');
});

test('想定メッセージテスト', () => {
    let watcher = new VCWatcher();
    let lhs: ValueVoiceState = new ValueVoiceState({});
    let rhs: ValueVoiceState = new ValueVoiceState({
        username: 'user username',
        voice_channel_name: 'voice-channel'
    });

    let ret = watcher.onVoiceStateUpdate();

    expect(ret.isDefine).toBe(true);
    expect(ret.f).toBeDefined();
    expect(ret.f?.(lhs,rhs)).toBe('user username さんが voice-channel に入りました！');
});
