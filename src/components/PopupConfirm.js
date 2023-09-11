import Popup from "./Popup";

export default class PopupConfirm extends Popup {
    constructor (popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;

        this._submitButton = this._popup.querySelector('.button_type_save');
        this._buttonText = this._submitButton.textContent;
        this._buttonLoadingText = 'Удаление...';

        this.open = this.open.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
        this.renderLoading = this.renderLoading.bind(this);
    }

    setEventListeners () {
        this._closeButton.addEventListener('click', this.close);
        this._submitButton.addEventListener('click', this.confirmDelete);
    }

    close() {
        this.hideResponseError();
        super.close();
    }

    open (card, cardId) {
        super.open();

        this.card = card;
        this.cardId = cardId;
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

    confirmDelete () {
        this._submitHandler(this.card);
    }
}