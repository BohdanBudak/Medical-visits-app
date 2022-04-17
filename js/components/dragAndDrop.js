export class DragAndDrop {

    constructor(element) {
        this._element = element;
        this._parentElem = element.parentNode;
        this.active = false;
        this.currentX = null;
        this.currentY = null;
        this.initialX  = null;
        this.initialY  = null;
        this.xOffset = 0;
        this.yOffset = 0;
        this.eventsDragAndDrop_Listener(this._parentElem);
    }

    _dragStart(e) {
        console.log();
        this.initialX = e.clientX - this.xOffset;
        this.initialY = e.clientY - this.yOffset;

        if (this._element.contains(e.target)) {
            this.active = true;
            this._element.style.zIndex = '1000';
            this._element.style.cursor = 'grabbing';
        }
    }

    _dragEnd(e) {
        this.initialX = this.currentX;
        this.initialY = this.currentY;

        if (this._element.contains(e.target)) {
            this.active = false;
            [].forEach.call(this._parentElem.children, (item) => {
                item.style.zIndex = '';
            });
            this._element.style.zIndex = '2';
            this._element.style.cursor = '';
        }
    }

    _drag(e) {
        if (this.active) {
            e.preventDefault();

            this.currentX = e.clientX - this.initialX;
            this.currentY = e.clientY - this.initialY;

            this.xOffset = this.currentX;
            this.yOffset = this.currentY;

            this._setTranslate(this.currentX, this.currentY, this._element);
        }
    }

    _setTranslate(xPos, yPos, el) {
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }

    eventsDragAndDrop_Listener(el) {
        el.addEventListener('mousedown', this._dragStart.bind(this), false);
        el.addEventListener('mouseup', this._dragEnd.bind(this), false);
        el.addEventListener('mousemove', this._drag.bind(this), false);
    }
}