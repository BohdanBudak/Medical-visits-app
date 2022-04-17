import {ActionsRequests} from '../actionsRequests.js';
import {DragAndDrop} from '../dragAndDrop.js'
import {EditModal} from '../forms/editModal.js';

export class Visit {
  constructor() {
    this.idCard = null;
    this.request = new ActionsRequests();
  }

  createGeneralContent() {
    const containerVisitCard = document.createElement("div");
    containerVisitCard.className = "visit-card";

    containerVisitCard.innerHTML = `<button class="visit-card-btn-close">X</button>
      <p><span class="visit-card__status-value">${this.data.status}</span></p>
      <p><b>Приоритет:</b> <span class="visit-card__priority-value">${this.data.priority}</span></p>
      <button class="visit-card__edit" href="#">Edit Visit</button>
      <p><b>ФИО:</b> <span class="visit-card__name-value">${this.data.name}</span></p>
      <p class="visit-card__doctor"><b>Доктор:</b> <span class="visit-card__doctor-value">${this.data.doctor}</span></p>
      <a class="visit-card__show-more"href="#">Показать детали</a>
      <p class="hidden" data-type="optional"><b>Цель визита:</b><span class="visit-card__purpose-value">${this.data.purpose}</span></p>
      <p class="hidden" data-type="optional"><b>Детали:</b><span class="visit-card__description-value">${this.data.description}</span></p>`

    return containerVisitCard;
  }

  createElement(str) {
    let frag = document.createDocumentFragment();

    let elem = document.createElement('div');
    elem.innerHTML = str;

    while (elem.childNodes[0]) {
        frag.appendChild(elem.childNodes[0]);
    }
    return frag;
}

  toggleDetails() {
    let optional = this.element.querySelectorAll("[data-type]");
    [...optional].forEach(item => item.classList.toggle("hidden"));
  }

  async destroyVisitCard() {
    await this.deleteVisitCardRequest()
      .then(() => this.element.remove())
      .catch(error => console.log(error));
  }

  async updateCard(updatedData) {
    await this.putVisitCardToServer(updatedData);

    this.data = updatedData;
    for (const prop in updatedData) {
      if(prop !== 'id') {
        this.element.querySelector(`.visit-card__${prop}-value`).innerText = updatedData[prop];
      }
     }
}

  static addDragAndDropEffect(element) {
    new DragAndDrop(element);
  };


// Requests
  async postVisitCardToServer() {
    await this.request.getToken();
    const requestPostVisitCards = await this.request.postVisitCard(this.data); 
    this.idCard = requestPostVisitCards.id;

    console.log("Post one visitCard", requestPostVisitCards, this.idCard);
  }

  async putVisitCardToServer(updatedObj) {
    await this.request.getToken();
    await this.request.putVisitCard(this.idCard, updatedObj);

    console.log("VisitCard has been updated", this.idCard);
  }

  async deleteVisitCardRequest() {
    await this.request.getToken();
    const requestDeleteVisitCards = await this.request.deleteVisitCard(this.idCard);
    console.log("Card is deleted");
  }


  //Listeners
  showMore_listener() {
    this.element.querySelector(".visit-card__show-more").addEventListener("click", event => {
      if (event.target.innerText === "Показать детали") {
        this.toggleDetails();
        event.target.innerText = "Скрыть детали";
      } else {
        this.toggleDetails();
        event.target.innerText = "Показать детали";
      }
    });
  }

  deleteButton_listener() {
    this.element
      .querySelector(".visit-card-btn-close")
      .addEventListener("click", async event => {
        this.destroyVisitCard();
      });
  }

  edit_listener() {
    this.element.querySelector(".visit-card__edit").addEventListener("click", event => {
      new EditModal(this);
    });
  }
}
