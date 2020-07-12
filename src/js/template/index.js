import Container from './container';
import Panel from './panel';

export default class DefaultTemplate {

    constructor(container, data, activeGroup) {
        this.container = container;
        this.data = data;
        this.activeGroup = activeGroup;
    }

    get template() {
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

    render() {
        this.container.append(this.template)
    }

}
