/**
 * @file radio
 * @author skykun
 */

import Input from './input';
import {generateID} from '../utils/genUUID';
import Label from './labels';
import {forEachElement} from '../utils/dom';

export default class Radio extends Input {
    constructor(data) {
        super(data);
        this.radioId = generateID();
        this.defaultValue = this.metaData.defaultValue;
    }

    handleItemTpl(data) {
        // restructure data for radio button form
        let id = generateID();
        let labelRaw = new Label({
            labelText: data.text,
            name: id,
            localeKey: this.metaData.localeKey
        });
        return `${labelRaw.getHtml()} <input
            type="radio" value="${data.value}" name="${this.metaData.name}"
            id="${id}" class="form-genki-input radio-item-${this.radioId} ${this.setStyle()}"
            ${data.value === this.defaultValue ? 'checked' : ''}>`;
    }

    /**
     * @override
     */
    handleTpl() {
        return this.metaData.items.reduce((res, item, idx) => {
            res += this.handleItemTpl(item);
            return res;
        }, '');
    }

    /**
     * @override
     */
    getValue() {
        let res = '';
        forEachElement(this.findItemCollection(), el => {
            if (el.checked) {
                res = el.value;
            }
        });
        return res;
    }

    /**
     * @override
     */
    setValue(value) {
        forEachElement(this.findItemCollection(), el => {
            el.checked = (el.value == value);
        });
    }

    findItemCollection() {
        return document.getElementsByClassName(`radio-item-${this.radioId}`);
    }
}