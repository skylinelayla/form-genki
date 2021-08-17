/**
 * @file select type
 * @author skykun
 */
import { FormType } from './form';
import Input from './input';
export default class Select extends Input {
    constructor(data: FormType);
    handleItemTpl(data: {
        value: string;
        text: string;
    }): string;
    /**
     * @override
     */
    handleTpl(): string;
    /**
     * @override
     */
    getValue(): string;
}
