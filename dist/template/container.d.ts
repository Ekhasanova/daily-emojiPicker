import { EmojiItem } from '../types';
export default class Container {
    static getElement(emoji: EmojiItem): HTMLElement;
    static getContent(name: string, group: EmojiItem[], activeGroup: string): HTMLElement;
}
