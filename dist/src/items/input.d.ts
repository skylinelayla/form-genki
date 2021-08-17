import Form, { FormType } from './form';
export default class Input extends Form<string> {
    constructor(data: FormType);
    /**
     * @override
     */
    getHtml(): string;
    /**
     * @override
     */
    getValue(): string;
    /**
     * @override
     */
    setValue(data: string): void;
    /**
     * @override
     */
    setStyle(): string;
    handleTpl(): string;
    /**
     * @override
     */
    checkValue(): void;
}
