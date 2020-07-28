"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var MockDiscord = /** @class */ (function () {
    function MockDiscord() {
        this.mockClient();
        this.mockGuild();
        this.mockChannel();
        this.mockVoiceChannel();
        this.mockGuildChannel();
        this.mockTextChannel();
        this.mockUser();
        this.mockGuildMember();
        this.guild.addMember(this.user, { accessToken: "mockAccessToken" });
        this.mockMessage();
    }
    MockDiscord.prototype.getClient = function () {
        return this.client;
    };
    MockDiscord.prototype.getGuild = function () {
        return this.guild;
    };
    MockDiscord.prototype.getChannel = function () {
        return this.channel;
    };
    MockDiscord.prototype.getVoiceCannel = function () {
        return this.voiceChannel;
    };
    MockDiscord.prototype.getGuildChannel = function () {
        return this.guildChannel;
    };
    MockDiscord.prototype.getTextChannel = function () {
        return this.textChannel;
    };
    MockDiscord.prototype.getUser = function () {
        return this.user;
    };
    MockDiscord.prototype.getGuildMember = function () {
        return this.guildMember;
    };
    MockDiscord.prototype.getMessage = function () {
        return this.message;
    };
    MockDiscord.prototype.mockClient = function () {
        this.client = new discord_js_1.Client();
    };
    MockDiscord.prototype.mockGuild = function () {
        this.guild = new discord_js_1.Guild(this.client, {
            unavailable: false,
            id: "guild-id",
            name: "mocked js guild",
            icon: "mocked guild icon url",
            splash: "mocked guild splash url",
            region: "eu-west",
            member_count: 42,
            large: false,
            features: [],
            application_id: "application-id",
            afkTimeout: 1000,
            afk_channel_id: "afk-channel-id",
            system_channel_id: "system-channel-id",
            embed_enabled: true,
            verification_level: 2,
            explicit_content_filter: 3,
            mfa_level: 8,
            joined_at: new Date("2018-01-01").getTime(),
            owner_id: "owner-id",
            channels: [],
            roles: [],
            presences: [],
            voice_states: [],
            emojis: []
        });
    };
    MockDiscord.prototype.mockChannel = function () {
        this.channel = new discord_js_1.Channel(this.client, {
            id: "channel-id"
        });
    };
    MockDiscord.prototype.mockVoiceChannel = function () {
        this.voiceChannel = new discord_js_1.VoiceChannel(this.guild, {
            id: "channel-id",
            name: "voice-channel"
        });
    };
    MockDiscord.prototype.mockGuildChannel = function () {
        this.guildChannel = new discord_js_1.GuildChannel(this.guild, __assign(__assign({}, this.channel), { name: "guild-channel", position: 1, parent_id: "123456789", permission_overwrites: [] }));
    };
    MockDiscord.prototype.mockTextChannel = function () {
        this.textChannel = new discord_js_1.TextChannel(this.guild, __assign(__assign({}, this.guildChannel), { topic: "topic", nsfw: false, last_message_id: "123456789", lastPinTimestamp: new Date("2019-01-01").getTime(), rate_limit_per_user: 0 }));
    };
    MockDiscord.prototype.mockUser = function () {
        this.user = new discord_js_1.User(this.client, {
            id: "user-id",
            username: "user username",
            discriminator: "user#0000",
            avatar: "user avatar url",
            bot: false
        });
    };
    MockDiscord.prototype.mockGuildMember = function () {
        this.guildMember = new discord_js_1.GuildMember(this.client, {
            deaf: false,
            mute: false,
            self_mute: false,
            self_deaf: false,
            session_id: "session-id",
            channel_id: "channel-id",
            nick: "nick",
            joined_at: new Date("2020-01-01").getTime(),
            user: this.user,
            roles: []
        }, this.guild);
    };
    MockDiscord.prototype.mockMessage = function () {
        this.message = new discord_js_1.Message(this.client, {
            id: "message-id",
            type: "DEFAULT",
            content: "this is the message content",
            author: this.user,
            webhook_id: null,
            member: this.guildMember,
            pinned: false,
            tts: false,
            nonce: "nonce",
            embeds: [],
            attachments: [],
            edited_timestamp: null,
            reactions: [],
            mentions: [],
            mention_roles: [],
            mention_everyone: [],
            hit: false
        }, this.textChannel);
    };
    return MockDiscord;
}());
exports["default"] = MockDiscord;
