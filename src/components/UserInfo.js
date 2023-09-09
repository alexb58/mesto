export default class UserInfo {
    constructor ({ userNameSelector, userDescriptionSelector, userAvatarSelector }) {
        this._userNameElement = document.querySelector(userNameSelector);
        this._userDescriptionElement = document.querySelector(userDescriptionSelector);
        this._userAvatarElement = document.querySelector(userAvatarSelector);
    }

    getUserInfo () {
        const userInfo = {};

        this._userName = this._userNameElement.textContent;
        this._userDescription = this._userDescriptionElement.textContent;

        userInfo.name = this._userName;
        userInfo.description = this._userDescription;

        return userInfo;
    }

    setUserInfo (data) {
        this._userNameElement.textContent = data.name;
        this._userDescriptionElement.textContent = data.status;

        if (data.avatar) {
            this._userAvatarElement.src = data.avatar;
        }
    }

    setAvatar (link) {
        this._userAvatarElement.src = link;
    }
}