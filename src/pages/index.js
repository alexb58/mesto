import './index.css';

import Api from '../components/Api.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupConfirm from '../components/PopupConfirm.js';
import Section from '../components/Section.js';

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button_type_save',
    inputErrorSelector: '.popup__error',
    activeErrorClass: 'popup__error_visible',
    invalidInputClass: 'popup__input_type_error'
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-74',
    authorization: '3b79a02e-a358-4496-9475-d28fd1117162'
});

const cardGridSelector = '.elements';
const popupProfileSelector = '.popup_edit-profile';
const popupAddPlaceSelector = '.popup_add-place';
const popupPhotoOpenSelector = '.photo-open';
const popupConfirmDeleteSelector = '.popup-delete';
const popupAvatarSelector = '.popup-avatar';

const root = document.querySelector('.body');
const updateAvatarButton = document.querySelector('.profile__avatar-button');
const popupAvatarElement = document.querySelector(popupAvatarSelector);
const editButton = root.querySelector('.button_type_edit');
const addButton = root.querySelector('.button_type_add');
const popupEditProfile = root.querySelector(popupProfileSelector);
const popupAddPlace = root.querySelector(popupAddPlaceSelector);
const nameInput = root.querySelector('.popup__input_type_name');
const statusInput = root.querySelector('.popup__input_type_status');
const popupProfileForm = popupEditProfile.querySelector('.popup__form');
const popupCardForm = popupAddPlace.querySelector('.popup__form')
const popupAvatarForm = popupAvatarElement.querySelector('.popup__form');

const userInfo = new UserInfo({
    userNameSelector: '.profile__name',
    userDescriptionSelector: '.profile__status',
    userAvatarSelector: '.profile__avatar'
});

const popupProfile = new PopupWithForm(
    popupProfileSelector,
    (evt, values) => {
        popupProfile.renderLoading(true);

        api.patchUserInfo(values)
            .then(() => {
                userInfo.setUserInfo(values);
                popupProfile.close();
            })
            .catch(err => {
                console.log(`Что-то пошло не так: ${err}`);
                popupProfile.showResponseError(err);
            })
            .finally(() => {
                popupProfile.renderLoading(false);
            });
    }
);

const popupCard = new PopupWithForm(
    popupAddPlaceSelector,
    (evt, values) => {
        const data = {};

        popupCard.renderLoading(true);

        data.name = values.place;
        data.link = values.image;
        data.isOwn = true;

        api.postCard(data)
            .then(res => {
                const newCard = new Card(data, '#template-card', popupFullPic.open, confirmDeletePopup.open, api.toggleLike);
                newCard.id = res._id;
                newCard.data.author = res.owner.name;

                const cardElement = newCard.generateCard();
                cardsSection.addOnTopItem(cardElement);

                popupCard.close();
            })
            .catch(err => {
                console.log(`Что-то пошло не так: ${err}`);
                popupCard.showResponseError(err);
            })
            .finally(() => {
                popupAvatar.renderLoading(false);
            });
    }
);

const popupAvatar = new PopupWithForm(
    popupAvatarSelector,
    (evt, values) => {
        evt.preventDefault();

        popupAvatar.renderLoading(true);

        api.updateAvatar(values.avatar)
            .then(() => {
                userInfo.setAvatar(values.avatar);
                popupAvatar.close();
            })
            .catch(err => {
                console.log(`Что-то пошло не так: ${err}`);
                popupAvatar.showResponseError(err);
            })
            .finally(() => {
                confirmDeletePopup.renderLoading(false);
            });
    }
);

const confirmDeletePopup = new PopupConfirm(
    popupConfirmDeleteSelector,
    (cardId) => {
        confirmDeletePopup.renderLoading(true);

        api.deleteCard(cardId)
            .then(() => {
                confirmDeletePopup.card.removeCard();
                confirmDeletePopup.renderLoading(false);
                confirmDeletePopup.close();
            })
            .catch(err => {
                console.log(`Что-то пошло не так: ${err}`);
                confirmDeletePopup.showResponseError(err);
            });
    }
);

const cardsSection = new Section(cardGridSelector);
const popupFullPic = new PopupWithImage(popupPhotoOpenSelector);
const profileValidator = new FormValidator(validationConfig, popupProfileForm);
const cardValidator = new FormValidator(validationConfig, popupCardForm);
const avatarValidator = new FormValidator(validationConfig, popupAvatarForm);

popupFullPic.setEventListeners();
popupCard.setEventListeners();
popupProfile.setEventListeners();
confirmDeletePopup.setEventListeners();
popupAvatar.setEventListeners();

updateAvatarButton.addEventListener('click', function () {
    avatarValidator.resetValidation();
    popupAvatar.open();
});

editButton.addEventListener('click', function () {
    const currentUserInfo = userInfo.getUserInfo();
    nameInput.value = currentUserInfo.name;
    statusInput.value = currentUserInfo.description;
    profileValidator.resetValidation();
    popupProfile.open();
});

addButton.addEventListener('click', function () {
    cardValidator.resetValidation();
    popupCard.open();
});

avatarValidator.enableValidation()
profileValidator.enableValidation();
cardValidator.enableValidation();


Promise.all([api.fetchUserInfo(), api.fetchInitialCards()])
    .then(([userData, initialCards]) => {
        const externalUserInfo = {};
        externalUserInfo.name = userData.name;
        externalUserInfo.status = userData.about;
        externalUserInfo.avatar = userData.avatar;
        const userID = userData._id;
        userInfo.setUserInfo(externalUserInfo);

        initialCards.forEach(cardObject => {
            const data = {
                cardId: cardObject._id,
                isOwn: cardObject.owner._id === userID,
                likes: cardObject.likes.length,
                isLiked: false,
                name: cardObject.name,
                link: cardObject.link
            };

            if (cardObject.likes.some(like => like._id === userID)) {
                data.isLiked = true;
            }

            const card = new Card(data, '#template-card', popupFullPic.open, confirmDeletePopup.open, api.toggleLike).generateCard();
            cardsSection.addItem(card);
        });
    })
    .catch(err => {
        console.log(`Что-то пошло не так: ${err}`);
    });