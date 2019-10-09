/**
 * @file itemProcessor
 * @author skykun
 */

import Input from './input';
import Select from './select';
import Button from './button';

function getRawHtml(data) {
    let item = '';
    let htmlRaw = '';
    data.properties.forEach(property => {
        switch(property.type) {
            case 'TEXT':
                item = new Input();
                break;
            case 'SELECT':
                item = new Select();
                break;
            case 'Button':
                item = new Button();
                break;
        }

        htmlRaw += item.getHtml();
    });
    return htmlRaw;
}

export {getRawHtml};