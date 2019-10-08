/**
 * @file input file
 * @author skykun
 */
import {Form} from './form';

export default class Input {

    constructor(data) {
        this.data = data;
        this.container = document.getElementById('form-container');
        if (!this.container) {
            throw new Error('please check container');
        }
    }

    
    /**
     * @override
     */
    getHtml() {
        return `<input for="${this.data.label}" type="${this.data.type}" id="${this.data.uuid}" name="${this.data.name}">`;
    }

    getData() {
    }

    mount() {
        this.container.innerHTML = this.getHtml();
    }
}