export default class Section {
    constructor (containerSelector) {
        this._container = document.querySelector(containerSelector);
    }

    addItem (element) {
        this._container.append(element);
    }

    addOnTopItem (element) {
        this._container.prepend(element);
    }
}