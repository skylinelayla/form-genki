/**
 * @file calendar
 * @author skykun
 */
import Input from './input';
import { FormType } from './form';
export default class Calendar extends Input {
    private prefixClazzName;
    currentTime: Date;
    constructor(data: FormType);
    /**
     * get month days number;
     * @param month current month
     * @param year current year
     * @returns current months days number
     */
    private getMonthDays;
    /**
     * get current date info
     * @returns current date object
     */
    private getCurrentDays;
    private getMonthInfo;
    /**
     * generate week list content
     */
    private generateWeekList;
    /**
     * generate date title
     */
    private generateCalendarHeader;
    private generateBottomActionPanel;
    /**
     * mock date input
     */
    private generateCalendarInput;
    /**
     * generate current months days
     */
    private getDisplayDays;
    private getWeekNumberOfYears;
    /**
     * get array from 0 to total
     * @param total number of days;
     */
    private generateArrayOrder;
    /**
     * get surplus days of next or prev month
     * @param total the total of a month
     * @param surplus the number to pick days of a month
     * @param begin last month of next month
     */
    private getMonthSurplusDays;
    /**
     * get month table
     */
    private getMonthTable;
    /**
     * panel show input dom
     */
    private getPopInput;
    private getPopOverTableContent;
    /**
     * @override
     */
    handleTpl(): string;
    handleAction(): void;
    private toggleItems;
    /**
     * @override
     */
    getValue(): string;
}
