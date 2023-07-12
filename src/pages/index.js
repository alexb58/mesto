import './index.css';

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button_type_save',
    inputErrorSelector: '.popup__error',
    activeErrorClass: 'popup__error_visible',
    invalidInputClass: 'popup__input_type_error'
}

const mustangImage = new URL('https://images.unsplash.com/photo-1682315264934-6250d8c16e0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2346&q=80', import.meta.url);
const storeImage = new URL('https://images.unsplash.com/photo-1681625731358-54ccba21a786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1678&q=80', import.meta.url);
const ninetiesImage = new URL('https://images.unsplash.com/photo-1680798790340-e1ec34621d1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=778&q=80', import.meta.url);
const yogaImage = new URL('https://images.unsplash.com/photo-1676107240833-c5475c83c56a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=766&q=80', import.meta.url);
const urbanImage = new URL('https://images.unsplash.com/photo-1675590593417-9eeb15650f65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=778&q=80', import.meta.url);
const stairsImage = new URL('https://images.unsplash.com/photo-1664480178879-576c265061a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=770&q=80', import.meta.url);

const initialCards = [
    { name: 'Mustang', link: mustangImage },
    { name: 'Store', link: storeImage },
    { name: '90', link: ninetiesImage },
    { name: 'Yoga', link: yogaImage },
    { name: 'Urban', link: urbanImage },
    { name: 'Stairs', link: stairsImage }
];

const cardGridSelector = '.elements';
const popupProfileSelector = '.popup_edit-profile';
const popupAddPlaceSelector = '.popup_add-place';
const popupPhotoOpenSelector = '.photo-open';

const root = document.querySelector('.body');
const editButton = root.querySelector('.button_type_edit');
const addButton = root.querySelector('.button_type_add');
const popupEditProfile = root.querySelector(popupProfileSelector);
const popupAddPlace = root.querySelector(popupAddPlaceSelector);
const nameInput = root.querySelector('.popup__input_type_name');
const statusInput = root.querySelector('.popup__input_type_status');
const popupProfileForm = popupEditProfile.querySelector('.popup__form');
const popupCardForm = popupAddPlace.querySelector('.popup__form')

const userInfo = new UserInfo({
    userNameSelector: '.profile__name',
    userDescriptionSelector: '.profile__status'
});

const createCard = (data) => {
    return new Card(data, '#template-card', popupFullPic.open).generateCard();
};

const cardsSection = new Section({
    items: initialCards,
    renderer: (data) => { cardsSection.addItem(createCard(data)); }
}, cardGridSelector);

const popupProfile = new PopupWithForm(
    popupProfileSelector,
    (evt, values) => {
        evt.preventDefault();

        userInfo.setUserInfo(values);

        popupProfile.close();
    }
);

const popupCard = new PopupWithForm(
    popupAddPlaceSelector,
    (evt, values) => {
        evt.preventDefault();

        const data = {};
        data.name = values.place;
        data.link = values.image;

        cardsSection.addOnTopItem(createCard(data));

        popupCard.close();
    }
);

const popupFullPic = new PopupWithImage(popupPhotoOpenSelector);

const profileValidator = new FormValidator(validationConfig, popupProfileForm);
const cardValidator = new FormValidator(validationConfig, popupCardForm);

popupFullPic.setEventListeners();
popupCard.setEventListeners();
popupProfile.setEventListeners();

editButton.addEventListener('click', function () {
    const currentUserInfo = userInfo.getUserInfo();
    nameInput.value = currentUserInfo.name;
    statusInput.value = currentUserInfo.description;
    profileValidator.resetValidation();
    popupProfile.open();
});

addButton.addEventListener('click', function () {
    popupCardForm.reset();
    cardValidator.resetValidation();
    popupCard.open();
});

profileValidator.enableValidation();
cardValidator.enableValidation();
cardsSection.renderItems();