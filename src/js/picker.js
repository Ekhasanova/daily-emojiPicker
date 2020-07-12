import EventEmitter from './helpers/emitter';
import DefaultTemplate from './template/index';


export default class EmojiPicker {

    constructor(el) {
        this.container = el;
    }

    get activeGroup() {
        return this.container.querySelector('.js-emoji-group.is-active');
    }

    showEmoji() {
        this.activeGroup && this.activeGroup.dispatchEvent(new Event('scroll'));
    }

    render(emojiMap) {
        const template = new DefaultTemplate(this.container, emojiMap, this.defaultActiveGroup);
        template.render();
    }

    open() {
        this.emojiBlock.classList.add('is-show');
        this.showEmoji();
        document.addEventListener('click', this.close.bind(this), true);
    }

    close({ target }) {
        if (this.emojiBlock.contains(target)) { return; }
        this.emojiBlock.classList.remove('is-show');
        document.removeEventListener('click', this.close, true);
    }

    onEmojiClick(element) {
        const emoji = element.getAttribute('data-emoji');
        const src = element.getAttribute('data-src');
        EventEmitter.emit('onEmojiClick', {
            emoji: emoji,
            emoji_src: src
        });
        this.emojiBlock.classList.remove('is-show');
    }

    showGroup(element) {
        const group = element.getAttribute('data-tab');
        this.activeGroup && this.activeGroup.classList.remove('is-active');
        const newActiveGroup = this.container.querySelector(`[data-group=${group}]`);
        newActiveGroup.classList.add('is-active');
        this.showEmoji();
    }

    setElements() {
        this.emojiBlock = this.container.querySelector('.js-emoji-block');
    }

    addListeners() {
        this.emojiBlock.addEventListener('click', (event) => {
            const { target } = event;
            if (target.closest('.js-emoji-panel')) {
                this.showGroup(target);
            } else if (target.classList.contains('js-emoji')) {
                this.onEmojiClick(target);
            }
        });
        EventEmitter.subcribe('onEmojiClick', this.onEmojiSelected);
    }

    setOptions(options) {
        if (options) {
            this.getEmojiList = options.source;
            this.onEmojiSelected = options.onSelect;
            this.defaultActiveGroup = options.defaultActiveGroup || 'smiles';
        }
    }

    init() {
        this.getEmojiList().then((emoji) => {
            this.render(emoji);
            this.setElements();
            this.addListeners();
            this.open();
        });
    }
}
