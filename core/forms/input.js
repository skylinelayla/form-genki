/**
 * @file input file
 * @author skykun
 */
import {Form} from './form';
var mustache = require('mustache');
const INPUT_TEP = '<input for="{{label}}" type="{{type}}" id="{{uuid}}" name="{{name}}">';

export default class Input {

    constructor(data) {
        this.data = data;
        // this.super(arguments);
    }

    
    /**
     * @override
     */
    getHtml() {
        return mustache.render(INPUT_TEP);
    }

    getData() {
        console.log(this.data);
    }
}