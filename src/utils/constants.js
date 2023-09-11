export const cardGridSelector = '.elements';

export const popupProfileSelector = '.popup_edit-profile';
export const popupAddPlaceSelector = '.popup_add-place';
export const popupPhotoOpenSelector = '.photo-open';
export const popupConfirmDeleteSelector = '.popup-delete';
export const popupAvatarSelector = '.popup-avatar';

export const root = document.querySelector('.body');

export const updateAvatarButton = document.querySelector('.profile__avatar-button');
export const editButton = root.querySelector('.button_type_edit');
export const addButton = root.querySelector('.button_type_add');

export const popupAvatarElement = document.querySelector(popupAvatarSelector);
export const popupEditProfile = root.querySelector(popupProfileSelector);
export const popupAddPlace = root.querySelector(popupAddPlaceSelector);

export const nameInput = root.querySelector('.popup__input_type_name');
export const statusInput = root.querySelector('.popup__input_type_status');

export const avatarInput = root.querySelector('.popup__input_avatar');

export const placeNameInput = root.querySelector('.popup__input_type_place-name');
export const placeUrlInput = root.querySelector('.popup__input_type_place-image');

export const popupProfileForm = popupEditProfile.querySelector('.popup__form');
export const popupCardForm = popupAddPlace.querySelector('.popup__form')
export const popupAvatarForm = popupAvatarElement.querySelector('.popup__form');

export const userSelectors = {
    userNameSelector: '.profile__name',
    userDescriptionSelector: '.profile__status',
    userAvatarSelector: '.profile__avatar'
}

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button_type_save',
    inputErrorSelector: '.popup__error',
    activeErrorClass: 'popup__error_visible',
    invalidInputClass: 'popup__input_type_error'
}