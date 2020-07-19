import { EmojiMap, EmojiPickerOptions, EmojiSourceFn, OnEmojiSelectHandler } from './types';
import '../less/styles.less';
export declare class EmojiPicker<T extends EmojiMap> {
    container: HTMLElement;
    emojiBlock?: HTMLElement | null;
    getEmojiList: EmojiSourceFn<T>;
    defaultActiveGroup: string;
    onEmojiSelected: OnEmojiSelectHandler;
    constructor(el: HTMLElement, options: EmojiPickerOptions<T>);
    getActiveGroup(): HTMLElement | null;
    getActiveGroupIcon(): HTMLElement | null;
    showEmoji(): void;
    render(emojiMap: T): void;
    onEmojiClick(element: HTMLElement): void;
    showGroup(element: HTMLElement): void;
    setElements(): void;
    addListeners(): void;
    init(): void;
}
