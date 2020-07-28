import DefaultTemplate from './template/index';
import { EmojiMap, EmojiPickerOptions, EmojiSourceFn, OnEmojiSelectHandler } from './types';
import { OnEmojiSelectListener } from './helpers/emitter';

import '../less/styles.less';


export class EmojiPicker<T extends EmojiMap> {
    private container: HTMLElement| null = null;
    private emojiBlock?: HTMLElement | null;
    readonly getEmojiList: EmojiSourceFn<T>;
    readonly defaultActiveGroup: string;
    readonly onEmojiSelected: OnEmojiSelectHandler;
    private emojiMap?: T | null;

    constructor(options: EmojiPickerOptions<T>) {
        this.getEmojiList = options.source;
        this.onEmojiSelected = options.onSelect;
        this.defaultActiveGroup = options.defaultActiveGroup || 'smiles';
    }

    private getActiveGroup(): HTMLElement | null {
        return this.container && this.container.querySelector('.js-emoji-group.is-active');
    }

    private getActiveGroupIcon(): HTMLElement | null {
        return this.container && this.container.querySelector('.js-emoji-panel-item.is-active');
    }

    private showEmoji(): void {
        const activeGroup = this.getActiveGroup();
        activeGroup && activeGroup.dispatchEvent(new Event('scroll'));
    }

    private onEmojiClick(element: HTMLElement): void {
        const emoji = element.getAttribute('data-emoji') || '';
        const src = element.getAttribute('data-src') || '';
        OnEmojiSelectListener.emit({
            emoji: emoji,
            emoji_src: src
        });
        this.hide()
    }

    private showGroup(element: HTMLElement): void {
        const group = element.getAttribute('data-tab');
        const activeGroupIcon = this.getActiveGroupIcon();
        activeGroupIcon && activeGroupIcon.classList.remove('is-active');
        element.classList.add('is-active');
        const activeGroup = this.getActiveGroup();
        activeGroup && activeGroup.classList.remove('is-active');
        const newActiveGroup = this.container && this.container.querySelector(`[data-group=${group}]`);
        newActiveGroup && newActiveGroup.classList.add('is-active');
        this.showEmoji();
    }

    private setEmojiBlock(): void {
        this.emojiBlock = this.container && this.container.querySelector('.js-emoji-block') as HTMLElement;
    }

    private addListeners(): void {
        this.setEmojiBlock();
        this.emojiBlock && this.emojiBlock.addEventListener('click', this.clickListener.bind(this));
        OnEmojiSelectListener.subscribe(this.onEmojiSelected);
    }

    private clickListener(event: MouseEvent): void {
        const target = event.target as HTMLElement;
        if (target.closest('.js-emoji-panel')) {
            this.showGroup(target);
        } else if (target.classList.contains('js-emoji')) {
            this.onEmojiClick(target);
        }
    }

    private unsubscribeEvents(): void {
        this.emojiBlock && this.emojiBlock.removeEventListener('click', this.clickListener);
        OnEmojiSelectListener.unsubscribe();
    }

    private clear() {
        if (this.container) this.container.innerHTML = '';
    }

    public show(): void {
        this.emojiBlock && this.emojiBlock.classList.add('is-show');
    }

    public hide(): void {
        this.emojiBlock && this.emojiBlock.classList.remove('is-show');
    }

    public render(el: HTMLElement): void {
        this.unsubscribeEvents();
        this.container = el;
        if (this.container && this.emojiMap) {
            const template = new DefaultTemplate(this.container, this.emojiMap, this.defaultActiveGroup);
            template.render();
        }
        this.addListeners();
        this.showEmoji();
    }


    public destroy(): void {
        this.unsubscribeEvents();
        this.clear();
    }

    public init(): void {
        this.getEmojiList().then((emoji) => {
            this.emojiMap = emoji;
        });
    }
}
