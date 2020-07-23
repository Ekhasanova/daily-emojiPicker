import DefaultTemplate from './template/index';
import { EmojiMap, EmojiPickerOptions, EmojiSourceFn, OnEmojiSelectHandler } from './types';
import { OnEmojiSelectListener } from './helpers/emitter';

// Вот это плохо для либы
import '../less/styles.less';


export class EmojiPicker<T extends EmojiMap> {
    container: HTMLElement;
    emojiBlock?: HTMLElement | null;
    getEmojiList: EmojiSourceFn<T>;
    defaultActiveGroup: string;
    onEmojiSelected: OnEmojiSelectHandler;

    // В конструкторе лучше не передавать el
    // Лучше использовать set, get для этого
    constructor(el: HTMLElement, options: EmojiPickerOptions<T>) {
        this.container = el;
        this.getEmojiList = options.source;
        this.onEmojiSelected = options.onSelect;
        this.defaultActiveGroup = options.defaultActiveGroup || 'smiles';
    }

    // TODO Сделать все методы которые не будут вызываться извне приватными 
    getActiveGroup(): HTMLElement | null {
        // тоже можно геттер
        return this.container.querySelector('.js-emoji-group.is-active');
    }

    getActiveGroupIcon(): HTMLElement | null {
        // тоже можно геттер
        return this.container.querySelector('.js-emoji-panel-item.is-active');
    }

    showEmoji(): void {
        const activeGroup = this.getActiveGroup();
        activeGroup && activeGroup.dispatchEvent(new Event('scroll'));
    }

    // TODO сделать приватным
    render(emojiMap: T): void {
        const template = new DefaultTemplate(this.container, emojiMap, this.defaultActiveGroup);
        template.render();
    }

    // TODO сделать публичный метод для рендера который будет принимать HTMLElement и ему не нужен будет emojiMAP

    // TODO Приватный
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
        // TODO Можно поменять на геттер
        this.emojiBlock = this.container.querySelector('.js-emoji-block') as HTMLElement;
    }

    // Лучше сделать публичным
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

    // Добавить публичный метод чтобы сделать unsubscribe

    init(): void {
        this.getEmojiList().then((emoji) => {
            // TODO сохранить emojiMap - как поле класса, чтобы можно было его использовать
            // В рендере использовать 
            this.render(emoji);
            this.showEmoji();
            this.setElements();
            this.addListeners();
        });
    }

    // TODO Добавить приватный метод clear - который очистит контейнер
}

// Public Interface

// show() - показывает контейнер с эмоджи (Будем вызывать по клику на кнопку выбор эмодзи, передавать ElementRef на CDK OVERLAY)
// hide() - скрывает контейнер с эмоджи (Будет вызываться на clickOutside, либо при выборе emoji)
// destroy() - отписывается от событий, делает clear,  (Будет вызываться на ngOnDestroy)
// render(el) -> - (Нужен чтобы если что отрендерить заного вручную)
//   unsubscribeEventsFromOldContainer()
//   this.container = el;
//   setHandlers()
//   _render() - Приватный

// Интерфейс такой нужен, чтобы в ангуляр библиотеке можно было удобно управлять виджетом
// Если измениться ссылка на EL, либо нужно будет задестроить итд

// В самой ангуляр библиотеке можно добавить метод callWidgetMethod 
// Который внутри делает run.outsideAngular и вызывает метод у виджета
// Чтобы не парится что ангуляр будет трекать что-то после работы с его публичным апи
