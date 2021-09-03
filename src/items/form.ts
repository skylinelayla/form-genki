/**
 * @file form base class
 * @author skykun
 */
import {generateID} from '../utils/genUUID';
import {createElement} from '../utils/dom';
import { FormSchemaProperty } from '../types';

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
    checkValue() { return; }

    /** get item name */
    getName(): string {
        return this.metaData.name;
    }

    /** get form value */
    getValue() { return; }

    /** set defaultValue for form */
    setValue(value: T) { return; }

    /** get form html */
    abstract getHtml(): string;

    /** set style */
    setStyle() { return; }

    setLocaleText(data: any) {
        return data[this.locale] || false;
    }

    /** set item wrapper dom */
    setWrapper() {
        return createElement('div', {class: 'form-group', id: generateID()})
    }

    /** handle action */
    handleAction() { return; }

    /** do something after remove form */
    removeAction() { return; }
}

export default Form;
