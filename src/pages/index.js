import './index.css';

import Api from '../components/Api.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupConfirm from '../components/PopupConfirm.js';
import Section from '../components/Section.js';

import {
    cardGridSelector,
    popupConfirmDeleteSelector,
    popupAvatarSelector,
    popupAddPlaceSelector,
    popupProfileSelector,
    popupPhotoOpenSelector,
    popupProfileForm,
    popupCardForm,
    popupAvatarForm,
    updateAvatarButton,
    editButton,
    addButton,
    nameInput,
    statusInput,
    avatarInput,
    placeNameInput,
    placeUrlInput,
    userSelectors,
    validationConfig
} from '../utils/constants.js';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-74',
    authorization: '3b79a02e-a358-4496-9475-d28fd1117162'
});

const userInfo = new UserInfo(userSelectors);

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

function createCard(data, userId) {
    const cardInstance = new Card(
        data,
        userId,
        '#template-card',
        popupFullPic.open,
        confirmDeletePopup.open,
        (cardId, isLiked) => {
            api.toggleLike(cardId, isLiked)
                .then(res => {
                    cardInstance.toggleLike(res.likes.length);
                })
                .catch(err => {
                    console.log(`Что-то пошло не так при изменении лайка: ${err}`);
                });
        }
    );

    return cardInstance
}

const popupCard = new PopupWithForm(
    popupAddPlaceSelector,
    (evt, values) => {
        const data = {};

        popupCard.renderLoading(true);

        data.name = values.place;
        data.link = values.image;

        api.postCard(data)
            .then(res => {
                const newCard = createCard(data);
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
    (card) => {
        confirmDeletePopup.renderLoading(true);

        api.deleteCard(card.id)
            .then(() => {
                confirmDeletePopup.card.removeCard();
                confirmDeletePopup.renderLoading(false);
                confirmDeletePopup.close();
            })
            .catch(err => {
                console.log(`Что-то пошло не так: ${err}`);
                confirmDeletePopup.renderLoading(false);
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
    avatarInput.value = ""
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
    placeNameInput.value = ""
    placeUrlInput.value = ""
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
                ownerId: cardObject.owner._id,
                likes: cardObject.likes,
                name: cardObject.name,
                link: cardObject.link
            };

            const card = createCard(data, userID).generateCard();
            cardsSection.addItem(card);
        });
    })
    .catch(err => {
        console.log(`Что-то пошло не так: ${err}`);
    });