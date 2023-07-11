export default class Section {
    constructor ( {items, renderer}, containerSelector ) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems () {
        if (Array.isArray(this._items)) {
            this._items.forEach(item => {
                this._renderer(item);
            });
        } else {
            this._renderer(this._items);
        }
    }

    addItem (element) {
        this._container.append(element);
    }

    addOnTopItem (element) {
        this._container.prepend(element);
    }
}