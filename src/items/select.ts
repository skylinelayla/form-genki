/**
 * @file select type
 * @author skykun
 */

import { FormType } from './form';
import Input from './input';

type CustomHTMLSelectElement = HTMLSelectElement & { selected: boolean };

export default class Select extends Input {
    constructor(data: FormType) {
        super(data);
        this.defaultValue = this.metaData.defaultValue;
    }

    handleItemTpl(data: {value: string, text: string}) {
        return `<option value="${data.value}" ${data.value === this.defaultValue ? 'selected': ''}>${this.setLocaleText(data.text)}</option>`;
    }

    /**
     * @override
     */
    handleTpl() {
        if (!this.metaData.items.length) {
            throw new Error('please check select element items');
        }
        let selectItems = this.metaData.items.reduce((res, item) => {
            res += this.handleItemTpl(item);
            return res;
        }, '');
        // wrap select container
        return `<select id="${this.uuid}" name="${this.metaData.name}" class="form-genki-select ${this.setStyle()}">${selectItems}</select>`
    }

    /**
     * @override
     */
    getValue() {
        let $radioItems = document.getElementById(this.uuid);
        let res = '';
        [].forEach.call($radioItems.children, (el: CustomHTMLSelectElement) => {
            if (el.selected) {
                res = el.value;
            }
        });
        return res;
    }
}