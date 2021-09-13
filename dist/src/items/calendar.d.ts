/**
 * @file calendar
 * @author skykun
 */
import Input from './input';
export default class Calendar extends Input {
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
    /**
     * generate week list content
     */
    private generateWeekList;
    /**
     * generate month days table list: 7x7 table list
     * 1st tr week list
     * other days list
     */
    private generateMonthsTable;
    /**
     * mock date input
     */
    private generateCalendarInput;
    private getPrefixClassName;
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
     * @override
     */
    handleTpl(): string;
    /**
     * @override
     */
    getValue(): string;
}
