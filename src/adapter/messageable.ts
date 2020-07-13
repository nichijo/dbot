/**
 * メッセージインターフェース
 * 
 * chatから取得したメッセージに 先頭から prefix + command が含まれている場合
 * 
 */

export interface Messageable {

    getCommandName(): string; 
    /**
     * メッセージ受診時のsend内容
     */
    onMessageSend(): () => string;
}