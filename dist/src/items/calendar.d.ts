/**
 * @file calendar
 * @author skykun
 */
import Input from './input';
import { FormType } from './form';
export default class Calendar extends Input {
    private prefixClazzName;
    currentTime: Date;
    selectTime: string;
    yearRange: [number, number];
    constructor(data: FormType);
    /**
     * get month days number;
     * @param month current month
     * @param year current year
     * @returns current months days number
     */
    private getMonthDays;
    private getMonthInfo;
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
     * generate current months days
     */
    private getDisplayDays;
    /**
     * get next month date
     * @param date current time
     * @returns next month date time
     */
    private getNextMonthDate;
    private getNextYearDate;
    private getPrevYearDate;
    private formatDate;
    /**
     * generate week list content
     */
    private generateWeekList;
    /**
     * generate date title
     */
    private generateCalendarHeader;
    private generateQuickCalendarHeader;
    private generateQuickCalendarMonthHeader;
    private generateBottomActionPanel;
    /**
     * mock date input
     */
    private generateCalendarInput;
    private getPrevMonthDate;
    /**
     * get month table
     */
    getMonthTable(date?: string): string;
    /**
     * panel show input dom
     */
    private getPopInput;
    private getPopOverTableContent;
    /**
     * @override
     */
    handleTpl(): string;
    private generateQuickYearSelectTable;
    private generateQuickMonthSelectTable;
    handleAction(): void;
    /**
     * @override
     */
    getValue(): string;
}
