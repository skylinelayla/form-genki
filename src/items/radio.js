/**
 * @file radio
 * @author skykun
 */

import Input from './Input';
import {generateID} from '../utils/genUUID';

export default class Radio extends Input {
    constructor(data) {
        super(data);
    }

    handleItemTpl(data) {
        return `<input
            type="radio" value="${this.setLocaleText(data.text)}" name="${this.metaData.name}"
            id="${generateID()}" class="form-genki-input ${this.setStyle()}"
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
        let $radioContainer = document.getElementById(this.uuid);
        let res = '';
        $radioContainer.children.forEach(e => {
            if (e.checked) {
                res = e.value;
            }
        });
        return res;
    }
}