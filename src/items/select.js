/**
 * @file select type
 * @author skykun
 */

import Input from './input';

export default class Select extends Input {
    constructor(data) {
        super(data);
    }

    handleItemTpl(data) {
        return `<option value="${this.setLocaleText(data.text)}" ${data.value ? 'selected': ''}>${this.setLocaleText(data.text)}</option>`;
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
        [].forEach.call($radioItems.children, el => {
            if (el.selected) {
                res = el.value;
            }
        });
        return res;
    }

    /**
     * @override
     */
    setValue(idx) {
        // loop items and set idx to value = 1;
        let $radioItems = document.getElementById(this.uuid);
        [].forEach.call($radioItems.children, (el, index) => {
            el.setAttribute('selected', idx === index);
        });
    }


}