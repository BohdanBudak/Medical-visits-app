import {LocalStorageVisit} from './localStorageVisit.js';



// Authorization request for getting token
class Authorization {
    constructor() {
        this._email = "btest@gmail.com";
        this._password = "HelloWorld!";
        this._loginURL = "http://cards.danit.com.ua/login";
    }

    async getToken() {
        const loginData = {
            email: this._email,
            password: this._password
        };

        return await fetch(this._loginURL, {
            method: 'POST',
            body: JSON.stringify(loginData),
            }).then(response => response.json()
            .then(data => data.token));
    }
}



// General requests for using
class InstructionForRequests {
    constructor() {
    }

    async actionGetAndDeleleRequest(url, method, token) {
        return await fetch(url,
            {
                    method: method,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
             }).then(response => response.json());
    }

    async actionPostAndPutRequest(url, method, objectData, token) {
        return await fetch(url,
            {
                method: method,
                body: JSON.stringify(objectData),
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }).then(response => response.json());
    }
}



// Request to server and using localStorage inside
export class ActionsRequests extends InstructionForRequests {
    constructor() {
        super();
        this._url = 'http://cards.danit.com.ua/cards';
        this._token = null;
        this._actionsLocalStorage = new LocalStorageVisit();
    }

    async getVisitCards() {
        const ArrayFromServer = await this.actionGetAndDeleleRequest(this._url, "GET", this._token);
        await this._actionsLocalStorage.postAllVisitCardsToLocalStorage(ArrayFromServer);
        return ArrayFromServer;
    }

    // Helper method, if we need to get one visitCard

    async getVisitOneCard(idCard) {
        return await this.actionGetAndDeleleRequest(`${this._url}/${idCard}`, "GET", this._token);
    }

    async postVisitCard(objectData) {
        const objectFromServer = await this.actionPostAndPutRequest(this._url, "POST", objectData, this._token);
        await this._actionsLocalStorage.postOneVisitCardsToLocalStorage(objectFromServer);
        return objectFromServer;
    }

    async putVisitCard(idCard, objectData) {
        await this._actionsLocalStorage.putOneVisitCardsToLocalStorage(idCard, objectData);
        return await this.actionPostAndPutRequest(`${this._url}/${idCard}`, "PUT", objectData, this._token);
    }

    async deleteVisitCard(idCard) {
        await this._actionsLocalStorage.deleteVisitCardsFromLocalStorage(idCard);
        return await this.actionGetAndDeleleRequest(`${this._url}/${idCard}`, "DELETE", this._token);
    }

    // Helper method, if we need to DELETE ALL visitCard in server and localStorage
    async deleteAllVisitCard() { // Использовать при очистке Карточек на сервере. Удаляет ВСЕ Карточки
        const allVisitCards = await this.getVisitCards();
        let arrayID = [];
        allVisitCards.forEach(elem => arrayID.push(elem.id));
        console.log(arrayID);
        arrayID.forEach(async elem => {
            await this.actionGetAndDeleleRequest(`${this._url}/${elem}`, "DELETE", this._token);
        });
        await this._actionsLocalStorage.deleteAllCardsFromLocalStorage();
    }

    async getToken() {
        const authorization = new Authorization();
        this._token = await authorization.getToken();
    }
}