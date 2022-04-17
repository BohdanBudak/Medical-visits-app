import {Visit} from './visit.js'

export class TherapistCard extends Visit{
    constructor(data) {
        super();
        this.data = data;
        this.idCard = data.id;
        this.element = null;
        this.createLayout();
    }

    createLayout() {
        let component = super.createGeneralContent();
        const age = super.createElement(`<p class="hidden" data-type="optional"><b>Возраст:</b>
        <span class="visit-card__age-value">${this.data.age}</span></p>`);
    
        component.append(age);
    
        this.element = component;
    }

    render() {
        document.querySelector('.visits-desk').append(this.element);
        super.showMore_listener();
        super.edit_listener();
        super.deleteButton_listener();
        Visit.addDragAndDropEffect(this.element);
    }
}