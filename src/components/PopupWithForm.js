import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor (popupSelector, submitHandler) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._popupInputs = this._popup.querySelectorAll('.popup__input');

        this._submitHandler = submitHandler;

        this._submitHandler = this._submitHandler.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit (evt) {
        const values = {};
        this._popupInputs.forEach(input => values[input.name] = input.value);
        this._submitHandler(evt, values);
    }

    setEventListeners () {
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleSubmit);
    }

    close() {
        super.close();
        this._form.reset();
    }
}