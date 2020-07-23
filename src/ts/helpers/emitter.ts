import { EmojiData, OnEmojiSelectHandler } from '../types';

export class OnEmojiSelectListener {
    static handler: OnEmojiSelectHandler | null;

    static subscribe(handler: OnEmojiSelectHandler): void {
        this.handler = handler;
    }

    static emit(data: EmojiData): void {
        this.handler && this.handler(data);
    }

    static unsubscribe() {
        this.handler = null;
    }
}
