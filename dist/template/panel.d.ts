export default class Panel {
    static activeGroup: string;
    static getElement(group: string): HTMLElement;
    static getContent(groups: string[], activeGroup: string): HTMLElement;
}
