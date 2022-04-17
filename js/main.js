import {CreateModal} from "./components/forms/createModal.js";
import {ActionsRequests} from './components/actionsRequests.js';
import {CardioCard} from './components/cards/cardioCard.js';
import {DentistCard} from './components/cards/dentistCard.js';
import {TherapistCard} from './components/cards/therapistCard.js';
import {LocalStorageVisit} from './components/localStorageVisit.js';



// Render visitCards with data
const renderVisitsCards = (dataVisits) => {
  dataVisits.forEach(visitCard => {
    if(visitCard.doctor === "Кардиолог") {
      let card = new CardioCard(visitCard);
      card.render();
    } else if(visitCard.doctor === "Стоматолог") {
      let card = new DentistCard(visitCard);
      card.render();
    } else if(visitCard.doctor === "Терапевт"){
      let card = new TherapistCard(visitCard);
      card.render();
    }
  });
};



// Get visitCards from Server and then rendering
const getAndRenderVisitCards_EmptyLocalStorage = async () => {
  const ourRequests = new ActionsRequests();
  await ourRequests.getToken();
  const requestGetVisitCards = await ourRequests.getVisitCards();
  await renderVisitsCards(requestGetVisitCards);
  await console.log('Get all visitsCard', requestGetVisitCards);
};



// Check localStorage and using event with this condition
const init = async () => {
  const localStorageHelper = new LocalStorageVisit();
  const visitCardsFromLocalStorage = localStorageHelper.getVisitCardsFromLocalStorage();
  console.log('LocalStorage data', visitCardsFromLocalStorage);
  if (visitCardsFromLocalStorage === null) {
    await getAndRenderVisitCards_EmptyLocalStorage();
  } else {
    await renderVisitsCards(visitCardsFromLocalStorage);
  }
};



//Display "visits-desk-info" block
const enableOrDisableBlock = () => {
  const emptyTitle = document.querySelector('.visits-desk-info--empty');
  const visitsDesk = document.querySelector('.visits-desk');

  if (visitsDesk.children.length === 1) {
    emptyTitle.style.display = 'block';
  } else {
    emptyTitle.style.display = 'none';
  }
};



// Main Events
document.addEventListener('DOMContentLoaded', async () => {
  await init();
});

document.querySelector('.header__btn-add-new-visit').addEventListener('click', () => {
  new CreateModal();
});

document.querySelector('.visits-desk').addEventListener('DOMSubtreeModified', () => {
  enableOrDisableBlock();
});



