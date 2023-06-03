const enableValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button_type_save',
    inactiveButtonClass: 'button_type_save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const showInputError = (formElement, inputElement, errorMessage, formObject) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(formObject.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formObject.errorClass);
};

const hideInputError = (formElement, inputElement, formObject) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(formObject.inputErrorClass);
    errorElement.classList.remove(formObject.errorClass);
    errorElement.textContent = '';
};

const isValid = (formElement, inputElement, formObject) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, formObject);
    } else {
        hideInputError(formElement, inputElement, formObject);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement, formObject) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(formObject.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(formObject.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
};


const setEventListeners = (formElement, formObject) => {
    const inputList = Array.from(formElement.querySelectorAll(formObject.inputSelector));
    const buttonElement = formElement.querySelector(formObject.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, formObject);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            toggleButtonState(inputList, buttonElement, formObject);
            isValid(formElement, inputElement, formObject)
        });
    });
};

const validationConfig = (formObject) => {
    const formList = Array.from(document.querySelectorAll(formObject.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, formObject);
    });
};

validationConfig(enableValidation);