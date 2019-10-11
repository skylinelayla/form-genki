/**
 * @file render js
 * @author skykun
 */
import Input from './items/input';
import Select from './items/select';
import Button from './items/button';
import './css/main.css';
import {addStorageListener, getLocaleStorage, resetLocalStorageEvent} from './utils/setLocale';
import {generateID} from './utils/genUUID';
import {createElement} from './utils/dom';

class Render {
    constructor(data) {
        resetLocalStorageEvent();
        this.data = data;
        this.locale = getLocaleStorage();
        this.itemInstance = [];
        this.$container = null;
        this.resultValue = {};
        this.formId = generateID();
        this.containerId = data.containerId || 'form-container';
        var me = this;
        // reset locale while local storage changed
        addStorageListener(function () {
            me.locale = getLocaleStorage();
            me.refresh();
        });


        this.$formWrapper = this.getFormWrapper();
    }

    render() {
        this.$container = document.getElementById(this.containerId);
        if (!this.$container) {
            throw new Error('please check form container is provided');
        }
        this.mount();
    }

    mount() {
        this.$formWrapper.innerHTML = this.getRawHtml(this.data);
        this.$container.innerHTML = this.$formWrapper.outerHTML;
    }

    getFormData() {
        this.itemInstance.forEach(e => {
            this.resultValue[e.getName()] = e.getValue();
        });
        return this.resultValue;
    }

    validateForm() {
        document.getElementById(this.formId).classList.add('was-validated');
    }

    destroy() {
        this.$container.innerHTML = '';
    }

    refresh() {
        if (!this.$container) {
            return;
        }
        this.destroy();
        this.mount();
    }

    getFormWrapper() {
        return createElement('form', {class: 'form-genki-block', id: this.formId});
    }

    getRawHtml(data) {
        let item = null;
        let htmlRaw = '';
        this.itemInstance = [];
        data.properties.forEach(property => {
            let param = {
                ...property,
                localeKey: this.locale
            };
            switch(property.type) {
                case 'TEXT':
                    item = new Input(param);
                    break;
                case 'SELECT':
                    item = new Select(param);
                    break;
                case 'BUTTON':
                    item = new Button(param);
                    break;
            }
            htmlRaw += item.getHtml();
            this.itemInstance.push(item);
        });
        return htmlRaw;
    }
}

export default Render;