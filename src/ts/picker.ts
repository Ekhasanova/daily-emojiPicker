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

    get activeGroup(): HTMLElement| null {
        return this.container.querySelector('.js-emoji-group.is-active');
    }

    showEmoji(): void {
        this.activeGroup && this.activeGroup.dispatchEvent(new Event('scroll'));
    }

    render(emojiMap: T): void {
        const template = new DefaultTemplate(this.container, emojiMap, this.defaultActiveGroup);
        template.render();
    }

    open(): void {
        this.emojiBlock && this.emojiBlock.classList.add('is-show');
        this.showEmoji();
        document.addEventListener('click', this.close.bind(this), true);
    }

    close(event: Event): void {
        const target = event.target as HTMLElement;

        if (this.emojiBlock && this.emojiBlock.contains(target)) { return; }

        this.emojiBlock && this.emojiBlock.classList.remove('is-show');
        document.removeEventListener('click', this.close, true);
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
        this.activeGroup && this.activeGroup.classList.remove('is-active');
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
            this.setElements();
            this.addListeners();
            this.open();
        });
    }
}
