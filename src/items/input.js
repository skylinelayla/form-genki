/**
 * @file input file
 * @author skykun
 */
import Form from './form';
import Label from './labels';

export default class Input extends Form {
    constructor(data) {
        super(data);
    }

    /**
     * @override
     */
    getHtml() {
        let labelRaw = new Label(this.metaData);
        let $wrapperContainer = this.setWrapper();
        $wrapperContainer.innerHTML = `${labelRaw.getHtml()} ${this.handleTpl()}`;
        return $wrapperContainer.outerHTML;
    }


    getValue() {
        let value = document.getElementById(this.uuid).value;
        return value;
    }

    setStyle() {
        return (this.metaData.styleClass || 'form-control') + ` col-${this.metaData.columnSize || 12}`;
    }

    handleTpl() {
        return `<input type="${this.metaData.type.toLowerCase()}" 
        id="${this.uuid}"
        name="${this.metaData.name}"
        class="form-genki-input ${this.setStyle()}"
        ${this.metaData.required ? 'required' : ''}
        placeholder="${this.setLocaleText(this.metaData.hintText)}">`;
    }

    checkValue() {
        if (this.metaData && !this.getValue()) {
            document.getElementById(this.uuid).setAttribute('class', 'was-validated');
        }
    }
}