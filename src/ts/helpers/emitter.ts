import { EmojiData, OnEmojiSelectHandler } from '../types';

export class OnEmojiSelectListener {
    static handler: OnEmojiSelectHandler;

    static subscribe(handler: OnEmojiSelectHandler): void {
        this.handler = handler;
    }

    static emit(data: EmojiData): void {
        this.handler(data);
    }
}
