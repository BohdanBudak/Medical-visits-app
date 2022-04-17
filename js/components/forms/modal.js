export class Modal {
  constructor() {
    this.element = null;
    this.inputs = null;
    this.createContent();
    this.closePopup_listener();
    this.changeType_listener();
  }

  createContent() {
    const popup = document.createElement(`div`);
    popup.className = "Modal-popup";

    const formTempate = document.querySelector("#newVisitFormTempl");
    popup.appendChild(formTempate.content.cloneNode(true));

    this.element = popup;
    this.inputs = this.element.querySelectorAll("input");
  }

  switchType(type) {
    //hide all specific fields
    [...this.inputs]
      .filter(input => input.dataset.type)
      .forEach(input => {
        input.classList.add("hidden");
        input.disabled = true;
      });

    //show all related to type fields
    [...this.inputs]
      .filter(input => input.classList.contains(this.mapType(type)))
      .forEach(input => {
        input.classList.remove("hidden");
        input.disabled = false;
      });
  }

  mapType(type){
    if(type === "Кардиолог") return 'cardiolog';
    if(type === "Терапевт") return 'therapist';
    if(type === "Стоматолог") return 'dentist';

    return type;
  }

  destroy() {
    this.element.remove();
  }

  getEnableFields() {
    return [...this.inputs]
      .filter(input => input.disabled === false)
      .map(input => input.getAttribute("name"));
  }

  getEnableFieldValues(_element) {
    const formData = new FormData(_element);
    const data = {};

    this.getEnableFields().forEach(name => data[name] = formData.get(name));

    return data;
  }

  getRequestData(_element){
    const data = this.getEnableFieldValues(_element);
    let dropdownValue = document.querySelector('select').options.selectedIndex;
    data.doctor = this.element.querySelector('select').options[dropdownValue].text;
    data.status = 'open';
    data.priority = "high";
    data.description = this.element.querySelector('textarea').value;
    return data;
  }

  /*
   **  form listeners
   */
  closePopup_listener() {
    document.body.addEventListener('click', (event) => {
      if(event.target.classList.contains('Modal-popup') || event.target.classList.contains('Modal-popup__close')) {
        this.destroy();
      }
    });
  }

  changeType_listener() {
    this.element.querySelector("select").addEventListener("change", event => {
      this.currentType = event.target.value;
      this.switchType(this.currentType);
    });
  }
}
