/**
 * @file radio
 * @author skykun
 */

import Input from './input';
import {generateID} from '../utils/genUUID';
import Label from './labels';
import {forEachElement} from '../utils/dom';
import { FormType } from './form';

export default class Radio extends Input {
    radioId: string;
    defaultValue: string;

    constructor(data: FormType) {
        super(data);
        this.radioId = generateID();
        this.defaultValue = this.metaData.defaultValue;
    }

    handleItemTpl(data: {text: string; value: string}) {
        // restructure data for radio button form
        const id = generateID();
        const labelRaw = new Label({
            ...this.metaData,
            labelText: data.text,
            name: id,
        });
        return `${labelRaw.getHtml()} <input
            type="radio" value="${data.value}" name="${this.metaData.name}"
            id="${id}" class="form-genki-input radio-item-${this.radioId} ${this.setStyle()}"
            ${data.value === this.defaultValue ? 'checked' : ''}>`;
    }

    /**
     * @override
     */
    handleTpl(): string {
        return this.metaData.items.reduce((res, item, idx) => {
            res += this.handleItemTpl(item);
            return res;
        }, '');
    }

    /**
     * @override
     */
    getValue(): string {
        let res = '';
        forEachElement(this.findItemCollection(), (el: HTMLInputElement) => {
            if (el.checked) {
                res = el.value;
            }
        });
        return res;
    }

    /**
     * @override
     */
    setValue(value: string): void {
        forEachElement(this.findItemCollection(), (el: HTMLInputElement) => {
            el.checked = (el.value == value);
        });
    }

    findItemCollection(): HTMLCollection {
        return document.getElementsByClassName(`radio-item-${this.radioId}`);
    }
}