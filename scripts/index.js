import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const root = document.querySelector('.body');
const editButton = root.querySelector('.button_type_edit');
const addButton = root.querySelector('.button_type_add');
const closeButtons = document.querySelectorAll('.button_type_close');
const profileName = root.querySelector('.profile__name');
const profileStatus = root.querySelector('.profile__status');
const popupEditProfile = root.querySelector('.popup_edit-profile');
const addPlacePopup = root.querySelector('.popup_add-place');
const placeForm = root.querySelector('.popup__form_add-place');
const elementsContainer = root.querySelector('.elements');
const photoPopup = root.querySelector('.photo-open');
const photoImage = root.querySelector('.photo-open__image');
const nameInput = root.querySelector('.popup__input_type_name');
const statusInput = root.querySelector('.popup__input_type_status');
const placeInput = root.querySelector('.popup__input_type_place-name');
const linkInput = root.querySelector('.popup__input_type_place-image');
const placesList = document.querySelector('.elements');
const popupProfileForm = popupEditProfile.querySelector('.popup__form');
const popupCardForm = addPlacePopup.querySelector('.popup__form')
const caption = photoPopup.querySelector('.photo-open__name');

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

const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.button_type_save',
	inputErrorSelector: '.popup__error',
	activeErrorClass: 'popup__error_visible',
	invalidInputClass: 'popup__input_type_error'
}

function addCardToContainer(cardElement) {
    const card = new Card(cardElement, '#template-card', handleCardClick);
    elementsContainer.prepend(card.generateCard());
}

function handlePlaceFormSubmit(event) {
    event.preventDefault();
    const newCard = {};
    newCard.name = placeInput.value;
    newCard.link = linkInput.value;
    addCardToContainer(newCard);
    event.target.reset();
    closePopup(addPlacePopup);
}

function closePopupByOverlay(evt) {
    const popup = evt.target;
    closePopup(popup);
}

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', closePopupByOverlay);
    document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
    popup.removeEventListener('click', closePopupByOverlay);
    document.removeEventListener('keydown', closeByEscape);
    popup.classList.remove('popup_opened');
}

function handleCardClick(name, link) {
    photoImage.setAttribute('src', link);
    photoImage.setAttribute('alt', name);
    caption.textContent = name;
    openPopup(photoPopup);
}

function setProfileValues(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileStatus.textContent = statusInput.value;
    closePopup(popupEditProfile);
}

function returnProfileValues () {
    nameInput.value = profileName.textContent;
    statusInput.value = profileStatus.textContent;
}

function addInitialCards () {
    initialCards.forEach(data => addCard(data));
}

function addCard (data) {
    const card = new Card(data, '#template-card', handleCardClick);
    placesList.prepend(card.generateCard());
}

const profileValidator = new FormValidator(validationConfig, popupProfileForm);
profileValidator.enableValidation();

const cardValidator = new FormValidator(validationConfig, popupCardForm);
cardValidator.enableValidation();

editButton.addEventListener('click', function () {
    returnProfileValues();
    profileValidator.resetValidation();
    openPopup(popupEditProfile);
});

addButton.addEventListener('click', function () {
    popupCardForm.reset();
    cardValidator.resetValidation();
    openPopup(addPlacePopup);
});

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

placeForm.addEventListener('submit', handlePlaceFormSubmit);
popupEditProfile.addEventListener('submit', setProfileValues);

addInitialCards();