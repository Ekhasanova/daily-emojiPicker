import DefaultTemplate from './template/index';
import { EmojiMap, EmojiPickerOptions, EmojiSourceFn, OnEmojiSelectHandler } from './types';
import { OnEmojiSelectListener } from './helpers/emitter';

import '../less/styles.less';


export class EmojiPicker<T extends EmojiMap> {
    container: HTMLElement;
    emojiBlock?: HTMLElement | null;
    getEmojiList: EmojiSourceFn<T>;
    defaultActiveGroup: string;
    onEmojiSelected: OnEmojiSelectHandler;

    constructor(el: HTMLElement, options: EmojiPickerOptions<T>) {
        this.container = el;
        this.getEmojiList = options.source;
        this.onEmojiSelected = options.onSelect;
        this.defaultActiveGroup = options.defaultActiveGroup || 'smiles';
    }

    getActiveGroup(): HTMLElement | null {
        return this.container.querySelector('.js-emoji-group.is-active');
    }

    getActiveGroupIcon(): HTMLElement | null {
        return this.container.querySelector('.js-emoji-panel-item.is-active');
    }

    showEmoji(): void {
        const activeGroup = this.getActiveGroup();
        activeGroup && activeGroup.dispatchEvent(new Event('scroll'));
    }

    render(emojiMap: T): void {
        const template = new DefaultTemplate(this.container, emojiMap, this.defaultActiveGroup);
        template.render();
    }

    onEmojiClick(element: HTMLElement): void {
        const emoji = element.getAttribute('data-emoji') || '';
        const src = element.getAttribute('data-src') || '';
        OnEmojiSelectListener.emit({
            emoji: emoji,
            emoji_src: src
        });
        this.emojiBlock && this.emojiBlock.classList.remove('is-show');
    }

    showGroup(element: HTMLElement): void {
        const group = element.getAttribute('data-tab');
        const activeGroupIcon = this.getActiveGroupIcon();
        activeGroupIcon && activeGroupIcon.classList.remove('is-active');
        element.classList.add('is-active');
        const activeGroup = this.getActiveGroup();
        activeGroup && activeGroup.classList.remove('is-active');
        const newActiveGroup = this.container.querySelector(`[data-group=${group}]`);
        newActiveGroup && newActiveGroup.classList.add('is-active');
        this.showEmoji();
    }

    setElements(): void {
        this.emojiBlock = this.container.querySelector('.js-emoji-block') as HTMLElement;
    }

    addListeners(): void {
        this.emojiBlock && this.emojiBlock.addEventListener('click', (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.closest('.js-emoji-panel')) {
                this.showGroup(target);
            } else if (target.classList.contains('js-emoji')) {
                this.onEmojiClick(target);
            }
        });
        OnEmojiSelectListener.subscribe(this.onEmojiSelected);
    }

    init(): void {
        this.getEmojiList().then((emoji) => {
            this.render(emoji);
            this.showEmoji();
            this.setElements();
            this.addListeners();
        });
    }
}
