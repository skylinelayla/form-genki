/**
 * @file form base class
 * @author skykun
 */
import {generateID} from '../utils/genUUID';
import {createElement} from '../utils/dom';

class Form {
    constructor(data) {
        this.uuid = generateID();
        this.metaData = data;
        this.locale = data.localeKey;
    }

    /** value validation */
    checkValue() {}

    /** get item name */
    getName() {
        return this.metaData.name;
    }

    /** get form value */
    getValue() {}

    /** set defaultValue for form */
    setValue() {}

    /** get form html */
    getHtml() {}

    /** set style */
    setStyle() {}

    setLocaleText(data) {
        return data[this.locale] || false;
    }

    /** set item wrapper dom */
    setWrapper() {
        return createElement('div', {class: 'form-group', id: generateID()})
    }

    /**
     * bind plugin to form item
     */
    bindPlugin() {

    }


}

export default Form;
