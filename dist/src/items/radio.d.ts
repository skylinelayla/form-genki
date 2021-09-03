/**
 * @file radio
 * @author skykun
 */
import Input from './input';
import { FormType } from './form';
export default class Radio extends Input {
    radioId: string;
    defaultValue: string;
    constructor(data: FormType);
    handleItemTpl(data: {
        text: string;
        value: string;
    }): string;
    /**
     * @override
     */
    handleTpl(): string;
    /**
     * @override
     */
    getValue(): string;
    /**
     * @override
     */
    setValue(value: string): void;
    findItemCollection(): HTMLCollection;
}
