import { EmojiMap, EmojiPickerOptions, EmojiSourceFn, OnEmojiSelectHandler } from './types';
import '../less/styles.less';
export declare class EmojiPicker<T extends EmojiMap> {
    private container;
    private emojiBlock?;
    readonly getEmojiList: EmojiSourceFn<T>;
    readonly defaultActiveGroup: string;
    readonly onEmojiSelected: OnEmojiSelectHandler;
    private emojiMap?;
    constructor(options: EmojiPickerOptions<T>);
    private getActiveGroup;
    private getActiveGroupIcon;
    private showEmoji;
    private onEmojiClick;
    private showGroup;
    private setEmojiBlock;
    private addListeners;
    private clickListener;
    private unsubscribeEvents;
    show(): void;
    hide(): void;
    render(el: HTMLElement): void;
    destroy(): void;
    init(): void;
}
