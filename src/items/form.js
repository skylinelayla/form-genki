/**
 * @file form base class
 * @author skykun
 */
import {generateID} from '../utils/genUUID';

class Form {
    constructor(data) {
        this.uuid = generateID();
        this.metaData = data;
        this.locale = data.localeKey;
    }

    /** value validation */
    checkValue() {
    }

    /** get form value */
    getValue() {

    }

    /** set defaultValue for form */
    setValue() {
    }

    /** get form html */
    getHtml() {
    }

    /** set style */
    setStyle() {
    }

    /** set item wrapper dom */
    setWrapper() {
        let $wrapperContainer = document.createElement('div');
        $wrapperContainer.setAttribute('class', 'form-group');
        $wrapperContainer.setAttribute('id', this.uuid);
        return $wrapperContainer;
    }
}

export default Form;
