import { EmojiMap } from '../types';
export default class DefaultTemplate<T extends EmojiMap> {
    readonly container: HTMLElement;
    readonly data: T;
    readonly activeGroup: string;
    constructor(container: HTMLElement, data: T, activeGroup: string);
    get template(): HTMLElement;
    render(): void;
}
