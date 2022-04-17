import { Visit } from "./visit.js";

export class CardioCard extends Visit {
  constructor(data) {
    super();
    this.data = data;
    this.idCard = data.id;
    this.element = null;
    this.createLayout();
  }

  createLayout() {
    let component = super.createGeneralContent();
    const pressure = super.createElement(
      `<p class="hidden" data-type="optional"><b>Давление:</b>
      <span class="visit-card__pressure-value">${this.data.pressure}</span></p>`
    );
    const weight = super.createElement(
      `<p class="hidden" data-type="optional"><b>Индекс массы:</b>
      <span class="visit-card__weight-value">${this.data.weight}<span></p>`
    );
    const illnesses = super.createElement(
      `<p class="hidden" data-type="optional"><b>История болезней:</b>
      <span class="visit-card__illnesses-value">${this.data.illnesses}<span></p>`
    );

    component.append(pressure, weight, illnesses);

    this.element = component;
  }

  render() {
    document.querySelector(".visits-desk").append(this.element);
    super.showMore_listener();
    super.edit_listener();
    super.deleteButton_listener();
    Visit.addDragAndDropEffect(this.element);
  }
}
