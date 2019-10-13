/**
 * @file radio
 * @author skykun
 */

import Input from './Input';
import {generateID} from '../utils/genUUID';
import Label from './labels';

export default class Radio extends Input {
    constructor(data) {
        super(data);
        this.radioId = generateID();
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
            type="radio" value="${this.setLocaleText(data.text)}" name="${this.metaData.name}"
            id="${id}" class="form-genki-input radio-item-${this.radioId} ${this.setStyle()}"
            ${data.value ? 'checked' : ''}>`;
    }

    /**
     * @override
     */
    handleTpl() {
        return this.metaData.items.reduce((res, item) => {
            res += this.handleItemTpl(item);
            return res;
        }, '');
    }

    /**
     * @override
     */
    getValue() {
        let $radioItems = document.getElementsByClassName(`radio-item-${this.radioId}`);
        let res = '';
        [].forEach.call($radioItems, el => {
            if (el.checked) {
                res = el.value;
            }
        });
        return res;
    }


}