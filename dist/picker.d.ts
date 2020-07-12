import { EmojiMap, EmojiPickerOptions, EmojiSourceFn, OnEmojiSelectHandler } from './types';
import '../less/styles.less';
export default class EmojiPicker<T extends EmojiMap> {
    container: HTMLElement;
    emojiBlock?: HTMLElement | null;
    getEmojiList: EmojiSourceFn<T>;
    defaultActiveGroup: string;
    onEmojiSelected: OnEmojiSelectHandler;
    constructor(el: HTMLElement, options: EmojiPickerOptions<T>);
    get activeGroup(): HTMLElement | null;
    showEmoji(): void;
    render(emojiMap: T): void;
    open(): void;
    close(event: Event): void;
    onEmojiClick(element: HTMLElement): void;
    showGroup(element: HTMLElement): void;
    setElements(): void;
    addListeners(): void;
    init(): void;
}
