/**
 * @file form base class
 * @author skykun
 */
import {generateID} from '../utils/genUUID';
import {createElement} from '../utils/dom';
import { FormSchema, FormSchemaProperty, TYPE } from '../types';

export type FormType = FormSchemaProperty & {
    localeKey?: string;
};

abstract class Form<T> {
    protected uuid: string;
    private locale: string;
    protected metaData: FormSchemaProperty;
    type: string;
    defaultValue: T;

    constructor(data: FormType) {
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
    getValue() {};

    /** set defaultValue for form */
    setValue(value: T) {};

    /** get form html */
    abstract getHtml(): string;

    /** set style */
    setStyle() {}

    setLocaleText(data: any) {
        return data[this.locale] || false;
    }

    /** set item wrapper dom */
    setWrapper() {
        return createElement('div', {class: 'form-group', id: generateID()})
    }
}

export default Form;
