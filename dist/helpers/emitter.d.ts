import { EmojiData, OnEmojiSelectHandler } from '../types';
export declare class OnEmojiSelectListener {
    static handler: OnEmojiSelectHandler;
    static subscribe(handler: OnEmojiSelectHandler): void;
    static emit(data: EmojiData): void;
}
