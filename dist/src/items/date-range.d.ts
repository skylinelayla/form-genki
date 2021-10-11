/**
 * @file time range
 * @author skykun
 */
import Input from './input';
import { FormType } from './form';
export default class DateRange extends Input {
    private prefixClazzName;
    private prevDate;
    private nextDate;
    constructor(data: FormType);
    /**
     * @override
     */
    handleTpl(): string;
    handleAction(): void;
    private generateDateRangeInput;
    private generateDateRangePanel;
}
