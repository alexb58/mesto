import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor (popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;

        this._form = this._popup.querySelector('.popup__form');
        this._popupInputs = this._popup.querySelectorAll('.popup__input');

        this._submitButton = this._popup.querySelector('.button_type_save');
        this._buttonText = this._submitButton.textContent;
        this._buttonLoadingText = 'Сохранение...';
    }

    _getInputValues() {
        this._values = {};
        this._popupInputs.forEach(input => this._values[input.name] = input.value);
        return this._values;
    }

    _handleSubmit = (evt) => {
        evt.preventDefault();
        this._submitHandler(evt, this._getInputValues());
    }

    setEventListeners () {
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleSubmit);
    }

    close() {
        this.hideResponseError();
        super.close();
    }

    renderLoading (isLoading) {
        if (isLoading) {
            this._submitButton.textContent = this._buttonLoadingText;
        } else {
            this._submitButton.textContent = this._buttonText;
        }
    }

    showResponseError (err) {
        this._submitButton.textContent = err;
        this._submitButton.classList.add('button_type_error');
    }

    hideResponseError () {
        this._submitButton.textContent = this._buttonText;
        this._submitButton.classList.remove('button_type_error');
    }
}
