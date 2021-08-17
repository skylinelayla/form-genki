import { FormSchemaProperty } from '../types';
export declare type FormType = FormSchemaProperty & {
    localeKey?: string;
};
declare abstract class Form<T> {
    protected uuid: string;
    private locale;
    protected metaData: FormSchemaProperty;
    type: string;
    defaultValue: T;
    constructor(data: FormType);
    /** value validation */
    checkValue(): void;
    /** get item name */
    getName(): string;
    /** get form value */
    getValue(): void;
    /** set defaultValue for form */
    setValue(value: T): void;
    /** get form html */
    abstract getHtml(): string;
    /** set style */
    setStyle(): void;
    setLocaleText(data: any): any;
    /** set item wrapper dom */
    setWrapper(): HTMLElement;
}
export default Form;
