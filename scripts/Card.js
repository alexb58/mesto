import { openPhotoPopup } from './index.js';

class Card {
	constructor(data, template) {
		this._name = data.name;
		this._link = data.link;
		this._alt = data.alt;
		this._template = template;

		this._removeCard = this._removeCard.bind(this);
		this._setLike = this._setLike.bind(this);
	}

	_getTemplate() {
		const cardElement = document
			.querySelector(this._template)
			.content
			.querySelector('.element')
			.cloneNode(true);

		return cardElement;
	}

	_removeCard() {
		this._element.remove();
		this._element = null;
	}

	_setLike() {
		const like = this._element.querySelector('.button_type_like');
		like.classList.toggle('element__button_active');
	}

	_setEventListeners() {
		const removeCardButton = this._element.querySelector('.button_type_urn');
		removeCardButton.addEventListener('click', this._removeCard);

		const likeButton = this._element.querySelector('.button_type_like');
		likeButton.addEventListener('click', this._setLike);

		const openFullPicButton = this._element.querySelector('.element__photo');
		openFullPicButton.addEventListener('mousedown', openPhotoPopup);
	}


	generateCard() {
		this._element = this._getTemplate();

		const cardElementImage = this._element.querySelector('.element__photo');

		this._element.querySelector('.element__text').textContent = this._name;
		cardElementImage.setAttribute('src', this._link);

		if (this._alt) {
			cardElementImage.setAttribute('alt', this._alt);
		} else {
			cardElementImage.setAttribute('alt', this._name);
		}

		this._setEventListeners();

		return this._element;
	}
}

export { Card };