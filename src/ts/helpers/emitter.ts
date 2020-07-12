import { EmojiData, OnEmojiSelectHandler } from '../../ts/types';

export class OnEmojiSelectListener {
    static handler: OnEmojiSelectHandler;

    static subscribe(handler: OnEmojiSelectHandler) {
        this.handler = handler;
    }

    static emit(data: EmojiData) {
        this.handler(data);
    }
}
