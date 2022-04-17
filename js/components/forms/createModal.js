import {Modal} from './modal.js';
import {CardioCard} from '../cards/cardioCard.js';
import {DentistCard} from '../cards/dentistCard.js';
import {TherapistCard} from '../cards/therapistCard.js';

export class CreateModal extends Modal {
  constructor() {
    super();
    this.defaultType = "cardiolog";
    this.currentType = this.defaultType;
    this.render();
    this.submit_listener();
  }

  setInitialState(){
    this.switchType(this.defaultType);
    this.element.querySelector('.Modal-popup__title').innerText = "Создать визит";
    this.element.querySelector('.cards-manipulation-form__submit').innerText = "Создать";
  }

  render() {
    this.setInitialState();
    document.querySelector("body").append(this.element);
  }

  createVisitInstance(type, data){
    if(type === "cardiolog") {
      const visitCard = new CardioCard(data);
      visitCard.render();
      return visitCard;
    } else if(type === "dentist") {
      const visitCard = new DentistCard(data);
      visitCard.render();
      return visitCard;
    } else if(type === "therapist"){
      const visitCard = new TherapistCard(data);
      visitCard.render();
      return visitCard;
    }
  }

  /*
   **  form listeners
   */
  submit_listener() {
    this.element.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();
      const data = this.getRequestData(event.target);
      this.createVisitInstance(this.currentType, data).postVisitCardToServer();
      this.destroy();
    });
  }
}
