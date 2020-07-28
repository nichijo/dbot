export class ValueVoiceState {
  public username?: String;
  public voice_channel_name?: String;

  constructor({ username, voice_channel_name } : { username?: String, voice_channel_name?: String } ) {
    this.username = username;
    this.voice_channel_name = voice_channel_name;
  }
}