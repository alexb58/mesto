export default class Card {
	constructor(data, template, handleCardClick) {
		this._data = data;
		this._template = template;
		this._handleCardClick = handleCardClick;

		this._removeCard = this._removeCard.bind(this);
		this._setLike = this._setLike.bind(this);
	}

	generateCard() {
		this._element = this._getTemplate();
		this._buttonLike = this._element.querySelector('.button_type_like');
		this._buttonDelete = this._element.querySelector('.button_type_urn');
		this._elementPhoto = this._element.querySelector('.element__photo');

		this._element.querySelector('.element__text').textContent = this._data.name;
		this._elementPhoto.setAttribute('src', this._data.link);
		this._elementPhoto.setAttribute('alt', this._data.alt || this._data.name);

		this._setEventListeners();

		return this._element;
	}

	_getTemplate() {
		return document
			.querySelector(this._template)
			.content
			.querySelector('.element')
			.cloneNode(true);
	}

	_removeCard() {
		this._element.remove();
		this._element = null;
	}

	_setLike() {
		this._buttonLike.classList.toggle('element__button_active');
	}

	_setEventListeners() {
		this._buttonDelete.addEventListener('click', this._removeCard);
		this._buttonLike.addEventListener('click', this._setLike);
		this._elementPhoto.addEventListener('click', () => {
			this._handleCardClick(this._data);
		});
	}
}