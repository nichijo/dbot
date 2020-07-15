/**
 * メッセージインターフェース
 * 
 * chatから取得したメッセージに 先頭から prefix + command が含まれている場合
 * 
 */

export interface Messageable<T> {

    getCommandName(): string; 

    /**
     * 初期化が必要な場合
     */
    onReady(): (args:T) => void;

    /**
     * メッセージ受診時のsend内容
     */
    onMessageSend(): (args:T) => string;
}