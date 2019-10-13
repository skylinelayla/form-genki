/**
 * @file label
 * @author skykun
 */
import Form from './form';
class Label extends Form {
    constructor(data) {
        super(data);
    }

    getHtml() {
        if (this.metaData.labelText && this.setLocaleText(this.metaData.labelText)) {
            return `<label
            for="${this.metaData.name}"
            id="${this.uuid}" 
            class="form-genki-label">${this.setLocaleText(this.metaData.labelText) || ''}${this.metaData.labelHtml || ''}</label> `;
        }
        else {
            return '';
        }
    }
}

export default Label;