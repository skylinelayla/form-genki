/**
 * @file render js
 * @author skykun
 */
import Input from './items/input';
import Select from './items/select';
import Radio from './items/radio';

import {addStorageListener, getLocaleStorage, resetLocalStorageEvent} from './utils/setLocale';
import {generateID} from './utils/genUUID';
import {createElement} from './utils/dom';
import { FormSchema } from './types';
import Form from './items/form';

class Render {
    data: any;
    locale: string;
    itemInstance: Form<any>[];
    $container: HTMLElement;
    resultValue: any;
    formId: string;
    containerId: string;
    $formWrapper: HTMLElement;

    constructor(data: FormSchema) {
        resetLocalStorageEvent();
        this.data = data;
        this.locale = getLocaleStorage();
        this.$container = null;
        this.resultValue = {};
        this.formId = generateID();
        this.containerId = data.containerId || 'form-container';
        const me = this;
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
        this.attachEvent();
    }

    mount() {
        this.$formWrapper.innerHTML = this.getRawHtml(this.data);
        this.$container.innerHTML = this.$formWrapper.outerHTML;
    }

    attachEvent() {
        [].forEach.call(this.itemInstance, (e: Form<any>) => {
            e.handleAction();
        });
    }

    detachEvent() {
        [].forEach.call(this.itemInstance, (e: Form<any>) => {
            e.removeAction();
        });
    }

    getFormData(): {[key: string]: any} {
        [].forEach.call(this.itemInstance, (e: Form<any>) => {
            this.resultValue[e.getName()] = e.getValue();
        })
        return this.resultValue;
    }

    /**
     * set form data by data
     * @param {object} data {key: value} 
     */
    setFormValue(data: {[key: string]: any }) {
        if (typeof data !== 'object') {
            throw new Error('set form data must be object');
        }
        // stupid need to improve
        this.itemInstance.forEach((e, idx) => {
            Object.keys(data).map(key => {
                if (key === e.getName()) {
                    e.setValue(data[key]);
                }
            });
        });
    }

    validateForm() {
        document.getElementById(this.formId).classList.add('was-validated');
    }

    destroy() {
        this.detachEvent();
        this.$container.innerHTML = '';
    }

    refresh() {
        if (!this.$container) {
            return;
        }
        this.destroy();
        this.mount();
    }

    getFormWrapper(): HTMLElement {
        return createElement('form', {class: 'form-genki-block', id: this.formId});
    }

    getRawHtml(data: FormSchema): string {
        let item = null;
        let htmlRaw = '';
        this.itemInstance = [];
        data.properties.forEach(property => {
            const param = {
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
                case 'RADIO':
                    item = new Radio(param);
                    break;
                default: 
                    item = new Input(param);
                    break;
            }
            htmlRaw += item.getHtml();
            this.itemInstance.push(item);
        });
        return htmlRaw;
    }
}

export default Render;