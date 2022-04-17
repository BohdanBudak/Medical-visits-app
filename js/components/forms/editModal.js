import { ActionsRequests } from "../actionsRequests.js";
import { Modal } from "./modal.js";

export class EditModal extends Modal {
  constructor(card) {
    super();
    this.incomeData = card.data;
    this.targetObj = card.element;
    this.card = card;
    this.render();
    this.edit_listener();
    
  }

  setInitialState(){
    this.element.querySelector("select").value = super.mapType(this.incomeData.doctor);
    this.element.querySelector("select").disabled = true;
    this.switchType(this.incomeData.doctor);
    this.element.querySelector('.modal-popup__title').innerText = "Изменить визит";
    this.element.querySelector('.cards-manipulation-form__submit').innerText = "Применить";
    this.fullfillForm()
  }

  fullfillForm() {
    for (const prop in this.incomeData) {
      if (prop === "status" || prop === "priority" || prop === "id" || prop === "doctor") continue;
      this.element.querySelector(`[name=${prop}]`).value = this.incomeData[prop];
    }
  }

  updateChanges(updatedObj) {
    this.card.updateCard(updatedObj);
  }

  render() {
    this.setInitialState();
    document.querySelector("body").append(this.element);
  }

  edit_listener() {
    this.element.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();
      const data = super.getRequestData(event.target);
      this.updateChanges(data);
      this.destroy();
    });
  }
}
