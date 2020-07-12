export default class Panel {
    activeGroup = 'smiles';

    static getElement = function(group) {
        const elem = document.createElement('div');
        elem.classList.add('emoji-block__groups-item', 'js-emoji-panel-item');
        elem.setAttribute('data-tab', group);

        if (group === this.activeGroup) elem.classList.add('is-active');

        const sprite = document.createElement('span');
        sprite.classList.add(`sprite-${group}`);
        elem.append(sprite);

        return elem;
    };

    static getContent = function(groups, activeGroup) {

        this.activeGroup = activeGroup;
        const groupsPanel = document.createElement('div');
        groupsPanel.classList.add('emoji-block__groups', 'js-emoji-panel');

        for (let i = 0; i < groups.length; i++) {
            groupsPanel.append(this.getElement(groups[i]));
        }

        return groupsPanel;
    };
}
