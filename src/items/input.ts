/**
 * @file input file
 * @author skykun
 */
import { FormSchemaProperty } from '../types';
import Form, { FormType } from './form';
import Label from './labels';

export default class Input extends Form<string> {
    constructor(data: FormType) {
        super(data);
        this.type = this.metaData.type.toLowerCase();
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

    /**
     * @override
     */
    getValue() {
        let value = 'value';
        if (this.type === 'CHECKBOX') {
            value = 'checked';
        }
        return (document.getElementById(this.uuid) as HTMLInputElement).value;
    }

    /**
     * @override
     */
    setValue(data: string) {
        (document.getElementById(this.uuid) as HTMLInputElement).value = data;
    }

    /**
     * @override
     */
    setStyle() {
        return (this.metaData.styleClass || 'form-control') + ` col-${this.metaData.columnSize || 12}`;
    }

    handleTpl() {
        let defaultValue = this.metaData.defaultValue;
        return `<input type="${this.type}" 
        id="${this.uuid}"
        name="${this.metaData.name}"
        value="${defaultValue || ''}"
        class="form-genki-input ${this.setStyle()}"
        ${this.metaData.required ? 'required' : ''}
        placeholder="${this.setLocaleText(this.metaData.hintText)}"
        ${this.type === 'checkbox' && defaultValue ? 'checked' : ''}>`;
    }

    /**
     * @override
     */
    checkValue() {
        if (this.metaData && !this.getValue()) {
            document.getElementById(this.uuid).setAttribute('class', 'was-validated');
        }
    }
}