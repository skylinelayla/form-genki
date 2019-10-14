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
        this.defaultValue = this.metaData.defaultValue || 0;
    }

    handleItemTpl(data, idx) {
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
            ${idx === this.defaultValue ? 'checked' : ''}>`;
    }

    /**
     * @override
     */
    handleTpl() {
        return this.metaData.items.reduce((res, item, idx) => {
            res += this.handleItemTpl(item, idx);
            return res;
        }, '');
    }

    /**
     * @override
     */
    getValue() {
        let $radioItems = document.getElementsByClassName(`radio-item-${this.radioId}`);
        let res = '';
        forEachElement($radioItems, el => {
            if (el.checked) {
                res = el.value;
            }
        });
        return res;
    }

    /**
     * @override
     */
    setValue() {
        

    }


}