import {Visit} from './visit.js'

export class DentistCard extends Visit{
    constructor(data) {
        super();
        this.data = data;
        this.idCard = data.id;
        this.element = null;
        this.createLayout();
    }

    createLayout() {
        let component = super.createGeneralContent();
        const lastVisit = super.createElement(
        `<p class="hidden" data-type="optional"><b>Дата последнего посещения:</b>
        <span class="visit-card__dateLastVisit-value">${this.data.dateLastVisit}</span></p>`);
    
        component.append(lastVisit);
    
        this.element = component;
    }

    render() {
        document.querySelector('.visits-desk').append(this.element);
        super.showMore_listener();
        super.deleteButton_listener();
        super.edit_listener();
        Visit.addDragAndDropEffect(this.element);
    }
}