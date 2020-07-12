import Container from './container';
import Panel from './panel';
import { EmojiMap } from '../types';


export default class DefaultTemplate<T extends EmojiMap> {

    readonly container: HTMLElement;
    readonly data: T;
    readonly activeGroup: string;

    constructor(container: HTMLElement, data: T, activeGroup: string) {
        this.container = container;
        this.data = data;
        this.activeGroup = activeGroup;
    }

    get template(): HTMLElement {
        const block = document.createElement('div');
        block.classList.add('emoji-block', 'js-emoji-block');
        const groups = Object.keys(this.data);

        groups.forEach((groupName) => {
            const group = this.data[groupName];
            block.append(Container.getContent(groupName, group, this.activeGroup));
        });

        block.append(Panel.getContent(groups, this.activeGroup));

        return block;
    };

    render(): void {
        this.container.append(this.template)
    }

}
