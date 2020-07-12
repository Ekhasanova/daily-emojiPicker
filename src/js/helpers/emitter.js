export default class EventEmitter {

    static subcribe(event, handler) {
        document.addEventListener(event, handler);
    }

    static emit(event, data) {
        document.dispatchEvent(new CustomEvent(event, { detail: data }));
    }
}
