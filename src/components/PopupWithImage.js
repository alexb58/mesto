import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this._popupCardImage = this._popup.querySelector('.photo-open__image');
        this._captionImage = this._popup.querySelector('.photo-open__name');
        this.open = this.open.bind(this);
    }

    open (data) {
        this._popupCardImage.src = data.link;
        this._popupCardImage.alt = data.name;
        this._captionImage.textContent = data.name;

        super.open();
    }
}