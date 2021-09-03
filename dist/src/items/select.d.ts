/**
 * @file select type
 * @author skykun
 */
import { FormType } from './form';
import Input from './input';
export default class Select extends Input {
    menuId: string;
    arrowId: string;
    constructor(data: FormType);
    handleItemTpl(data: {
        value: string;
        text: string;
    }): string;
    /**
     * @override
     */
    handleTpl(): string | never;
    /**
     * @override
     * handle select click & choose event
     */
    handleAction(): void;
    /**
     * @override
     * remove event listener
     */
    removeAction(): void;
    private getSelectItems;
    /**
     *
     * @param $selectItems
     * @param $arrow
     */
    private handleSelectClick;
    private handleSelectItemClick;
    private handleDocumentClick;
    /**
     * control select drop menu
     */
    private toggleItems;
    /**
     * set arrow icon style
     */
    private toggleIcon;
    /**
     * select arrow content
     */
    getSelectIcon(): string;
    /**
     * @override
     */
    getValue(): string;
}
