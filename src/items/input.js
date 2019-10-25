/**
 * @file input file
 * @author skykun
 */
import Form from './form';
import Label from './labels';
import DatePickerPlugin from '../plugins/datePicker'; 

export default class Input extends Form {
    constructor(data) {
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
        return document.getElementById(this.uuid)[value];
    }

    /**
     * @override
     */
    setValue(data) {
        document.getElementById(this.uuid).value = data;
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

    /**
     * @override
     */
    bindPlugin() {
        console.log('bind');
        let datePlugin = new DatePickerPlugin();
        let el = document.getElementById(this.uuid);
        datePlugin.install(el, 'click');
    }


}