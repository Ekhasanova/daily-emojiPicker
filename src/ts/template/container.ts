import setLazyLoading from '../helpers/lazy';
import { EmojiItem } from '../types';


export default class Container {

    static getElement(emoji: EmojiItem): HTMLElement {
        const { name, relative_path, url } = emoji;
        const elem = document.createElement('div');
        elem.classList.add('emoji-block__item', 'js-emoji');
        elem.setAttribute('data-emoji', name);
        elem.setAttribute('data-src', relative_path);
        const img = document.createElement('div');
        img.classList.add('emoji-block__item-image', 'lazy');
        img.setAttribute('data-original', url);
        elem.append(img);

        return elem;
    };

    static getContent(name: string, group: EmojiItem[], activeGroup: string): HTMLElement {
        const content = document.createElement('div');
        content.classList.add('emoji-block__wrap', 'js-emoji-group');
        content.setAttribute('data-group', name);

        for (let i = 0; i < group.length; i++) {
            content.append(this.getElement(group[i]));
        }

        setLazyLoading(content);

        if (name === activeGroup) content.classList.add('is-active');

        return content;
    };
}
