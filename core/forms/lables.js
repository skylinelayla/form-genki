/**
 * @file label
 * @author skykun
 */

import {Form} from '../form';

class Label extends Form {
    constructor(data) {
        this.label = data;
    }

    /**
     * @override
     */
    getHtml() {
        let tpl = '<label for="{{labelData}}"></label>'
        return Mustache.render(tpl);
    }
}

export default Label;