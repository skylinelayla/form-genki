/**
 * @file select type
 * @author skykun
 */
import { FormType } from './form';
import Input from './input';
export default class Select extends Input {
    menuId: string;
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
     * handle select click & choose event
     */
    handleAction(): void;
    /**
     * control select drop menu
     */
    private toggleItems;
    /**
     * select arrow content
     */
    getSelectIcon(): string;
    /**
     * @override
     */
    getValue(): string;
}
