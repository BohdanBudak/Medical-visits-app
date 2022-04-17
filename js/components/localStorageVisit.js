export class LocalStorageVisit {
    constructor() {
    }

    postAllVisitCardsToLocalStorage(dataArrayVisitCard) {
        const stringDataArray = JSON.stringify(dataArrayVisitCard);

        localStorage.setItem('visitCards', stringDataArray);
    }

    getVisitCardsFromLocalStorage(){
        const arrayVisitCards = localStorage.getItem('visitCards');

        return JSON.parse(arrayVisitCards);
    }

    postOneVisitCardsToLocalStorage(dataVisitCard) {
        const arrayVisitCards = this.getVisitCardsFromLocalStorage();

        arrayVisitCards.push(dataVisitCard);
        this.postAllVisitCardsToLocalStorage(arrayVisitCards);
    }

    putOneVisitCardsToLocalStorage(idVisitCard, dataVisitCard) {
        const arrayVisitCards = this.getVisitCardsFromLocalStorage();

        const newArrayVisitCards = arrayVisitCards.map((visitCard) => {
            if(visitCard.id === idVisitCard) {
                visitCard = dataVisitCard;
                visitCard.id = idVisitCard;
                console.log('Edited Data', visitCard);
                return visitCard;
            } else {
                return visitCard;
            }
        });

        this.postAllVisitCardsToLocalStorage(newArrayVisitCards);
    }

    deleteVisitCardsFromLocalStorage(idVisitCard) {
        const arrayVisitCards = this.getVisitCardsFromLocalStorage();
        let updatedVisitCards = arrayVisitCards.filter(element => element.id !== idVisitCard);

        this.postAllVisitCardsToLocalStorage(updatedVisitCards);
    }

    deleteAllCardsFromLocalStorage() {
        localStorage.clear();
    }
}