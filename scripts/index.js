const root = document.querySelector('.body');
const popup = root.querySelector('.popup_opened');
const popupEditProfile = root.querySelector('.popup_edit-profile');
const editButton = root.querySelector('.button_type_edit');
const profileName = root.querySelector('.profile__name');
const profileStatus = root.querySelector('.profile__status');
const addButton = root.querySelector('.button_type_add');
const addPlacePopup = root.querySelector('.popup_add-place');
const placeForm = root.querySelector('.popup__form_add-place');
const elementsContainer = root.querySelector('.elements');
const photoPopup = root.querySelector('.photo-open');
const photoImage = root.querySelector('.photo-open__image');
const photoName = root.querySelector('.photo-open__name');
const popupCloseButtons = root.querySelectorAll('.button_type_close');
const nameInput = root.querySelector('.popup__input_type_name');
const statusInput = root.querySelector('.popup__input_type_status');
const placeInput = root.querySelector('.popup__input_type_place-name');
const linkInput = root.querySelector('.popup__input_type_place-image');
const cardTemplate = root.querySelector('#template-card').content;
const cardElement = cardTemplate.cloneNode(true);
const elementText = cardElement.querySelector('.element__text');
const elementPhoto = cardElement.querySelector('.element__photo');

const initialCards = [
    {
        name: 'Mustang',
        link:
            'https://images.unsplash.com/photo-1682315264934-6250d8c16e0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2346&q=80',
    },
    {
        name: 'Store',
        link:
            'https://images.unsplash.com/photo-1681625731358-54ccba21a786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1678&q=80',
    },
    {
        name: '90',
        link:
            'https://images.unsplash.com/photo-1680798790340-e1ec34621d1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=778&q=80',
    },
    {
        name: 'Yoga',
        link:
            'https://images.unsplash.com/photo-1676107240833-c5475c83c56a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=766&q=80',
    },
    {
        name: 'Urban',
        link:
            'https://images.unsplash.com/photo-1675590593417-9eeb15650f65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=778&q=80',
    },
    {
        name: 'Stairs',
        link:
            'https://images.unsplash.com/photo-1664480178879-576c265061a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=770&q=80',
    },
];

class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardTemplate = document.querySelector(this._cardSelector).content;
        return cardTemplate.cloneNode(true);
    }

    generateCard() {
        this._element = this._getTemplate();
        const elementText = this._element.querySelector('.element__text');
        const cardImage = this._element.querySelector('.element__photo');
        elementText.textContent = this._name;
        cardImage.src = this._link;
        cardImage.alt = this._name;
        return this._element;
    }
}

function removeCard(cardElement) {
    cardElement.remove();
}

function createCardElement(name, link) {
    elementText.textContent = name;
    elementPhoto.src = link;
    elementPhoto.alt = name;
    return cardElement;
}

function addCardToContainer(cardElement) {
    elementsContainer.prepend(cardElement);
}

function handlePlaceFormSubmit(event) {
    event.preventDefault();
    const name = placeInput.value;
    const link = linkInput.value;
    const newCard = createCardElement(name, link);
    addCardToContainer(newCard);
    event.target.reset();
    closePopup(addPlacePopup);
}

function closePopupByOverlay(evt) {
    const popup = evt.target;
    closePopup(popup);
}

function closePopupByEsc(evt, popup) {
    if (evt.key === 'Escape') {
        closePopup(popup);
    }
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', closePopupByOverlay);
    window.addEventListener('keydown', (evt) => closePopupByEsc(evt, popup));
}

function closePopup(popup) {
    popup.removeEventListener('click', closePopupByOverlay);
    window.addEventListener('keydown', (evt) => closePopupByEsc(evt, popup));
    popup.classList.remove('popup_opened');
}

function renderCards() {
    initialCards.forEach((cardData) => {
        const card = new Card(cardData, '#template-card');
        const cardElement = card.generateCard();
        addCardToContainer(cardElement);
    });
}

function openEditProfilePopup() {
    nameInput.value = profileName.textContent;
    statusInput.value = profileStatus.textContent;
    openPopup(popupEditProfile);
}

function openPhotoPopup(imageSrc, imageName) {
    photoImage.src = imageSrc;
    photoImage.alt = imageName;
    photoName.textContent = imageName;
    openPopup(photoPopup);
}

function setProfileValues(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileStatus.textContent = statusInput.value;
    closePopup(popupEditProfile);
}

function openPhotoPopupHandler(event) {
    const target = event.target;
    if (target.classList.contains('element__photo')) {
        const cardElement = target.closest('.element');
        const imageSrc = cardElement.querySelector('.element__photo').src;
        const imageName = cardElement.querySelector('.element__text').textContent;
        openPhotoPopup(imageSrc, imageName);
    }
}

function openEditProfilePopupHandler() {
    openEditProfilePopup();
}

function openAddPlacePopupHandler() {
    openPopup(addPlacePopup);
}

function closePopupHandler() {
    const popup = root.querySelector('.popup_opened');
    closePopup(popup);
}

elementsContainer.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('button_type_like')) {
        const cardElement = target.closest('.element');
        cardElement.querySelector('.element__button').classList.toggle('element__button_active');
    } else if (target.classList.contains('button_type_urn')) {
        const cardElement = target.closest('.element');
        removeCard(cardElement);
    }
});

elementsContainer.addEventListener('click', openPhotoPopupHandler);
editButton.addEventListener('click', openEditProfilePopupHandler);
addButton.addEventListener('click', openAddPlacePopupHandler);
popupCloseButtons.forEach(function (button) {
    button.addEventListener('click', closePopupHandler);
});

placeForm.addEventListener('submit', handlePlaceFormSubmit);
popupEditProfile.addEventListener('submit', setProfileValues);

renderCards();
