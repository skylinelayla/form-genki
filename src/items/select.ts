/**
 * @file select type
 * @author skykun
 */

import { FormType } from './form';
import Input from './input';

type CustomHTMLSelectElement = HTMLSelectElement & { selected: boolean };

export default class Select extends Input {
    menuId: string;
    constructor(data: FormType) {
        super(data);
        this.defaultValue = this.metaData.defaultValue;
        this.menuId = `select-menu-${this.uuid}`;
    }

    handleItemTpl(data: {value: string, text: string}) {
        return `<li value="${data.value}" ${data.value === this.defaultValue ? 'selected': ''}>${data.text}</li>`;
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
        return `<div class="form-genki-select-wrapper"><div id="${this.uuid}" name="${this.metaData.name}" class="form-genki-select ${this.setStyle()}"></div>
        <div class="form-genki-select-items" id=${this.menuId} style="display: none">${selectItems}</div>${this.getSelectIcon()}</div>`
    }

    /**
     * @override
     * handle select click & choose event
     */
    handleAction() {
        const $select = document.getElementById(this.uuid);
        const $selectItems = document.getElementById(this.menuId);

        $select.addEventListener('click', (evt) => {
            this.toggleItems($selectItems);
        });
        $selectItems.addEventListener('click', (evt) => {
            const itemElement = evt.target as Element;
            if (itemElement.tagName === 'LI') {
                // get value of li
                const selectVal = itemElement.getAttribute('value');
                const selectName = itemElement.innerHTML;
                // set select value
                $select.innerHTML = selectName;
            }
            this.toggleItems($selectItems);
        });
    }

    /**
     * control select drop menu
     */
    private toggleItems ($selectItems: HTMLElement) {
        $selectItems.style.display = $selectItems.style.display === 'block' ? 'none' : 'block';
    }

    /**
     * select arrow content
     */
    getSelectIcon() {
        return `<span class="form-genki-arrow">1</span>`
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