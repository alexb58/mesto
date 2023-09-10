export default class Card {
	constructor(data, template, cardClickHandler, deleteButtonHandler, likeHandler) {
		this.data = data;

		this._template = template;
		this._cardClickHandler = cardClickHandler;
		this._deleteButtonHandler = deleteButtonHandler;
		this._likeHandler = likeHandler;

		this.id = data.cardId;
		this._isOwn = data.isOwn;
		this.likes = data.likes;
		this.isLiked = data.isLiked;

		this.removeCard = this.removeCard.bind(this);
		this.toggleLike = this.toggleLike.bind(this);
		this._likeHandler = this._likeHandler.bind(this);
		this._deleteButtonHandler = this._deleteButtonHandler.bind(this);
	}

	generateCard() {
		this._element = this._getTemplate();
		this.buttonLike = this._element.querySelector('.button_type_like');
		this.cardLikesCounter = this._element.querySelector('.element__counter')
		this._elementPhoto = this._element.querySelector('.element__photo');

		this._element.querySelector('.element__text').textContent = this.data.name;
		this._elementPhoto.setAttribute('src', this.data.link);
		this._elementPhoto.setAttribute('alt', this.data.alt || this.data.name);
		this.cardLikesCounter.textContent = this.likes ? this.likes : 0;

		this._setEventListeners();

		if (this._isOwn) {
			this.insertRemoveButton()
		}

		if (this.isLiked) { this.buttonLike.classList.add('element__button_active') }

		return this._element;
	}

	_getTemplate() {
		return document
			.querySelector(this._template)
			.content
			.querySelector('.element')
			.cloneNode(true);
	}

	removeCard() {
		this._element.remove();
		this._element = null;
	}

	toggleLike(likesLength) {
		this.buttonLike.classList.toggle('element__button_active');

		this.isLiked = !this.isLiked;
		this.likes = likesLength;
		this.cardLikesCounter.textContent = this.likes;
	}

	_setEventListeners() {
		this.buttonLike.addEventListener('click', () => {
			this._likeHandler(this.id, this.isLiked);
		});
		this._elementPhoto.addEventListener('click', () => {
			this._cardClickHandler(this.data);
		});
	}

	insertRemoveButton() {
		const removeCardButton = this._element.querySelector('.button_type_urn');
		removeCardButton.style.visibility = 'visible';
		removeCardButton.addEventListener('click', () => {
			this._deleteButtonHandler(this, this.id);
		});
	}
}