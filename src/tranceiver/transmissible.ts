import { Messageable } from "../messages/messageable";

/**
 * 送受信可能インターフェース
 * 
 * 各種Botなど、ユーザからの情報を受け付けて
 * それに対応する返信をしたりするもの。
 * 
 * メソッド名があまりドメインを表せていないので
 * とりあえずの実装として、まずはおいておく。
 */
export interface Transmissible<T> {
    registMessage(msg: Messageable<T>): void;
    initialize(): void;
    run(): void;
}