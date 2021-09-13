/**
 * @file calendar
 * @author skykun
 */

import Input from './input';
import DateSvg from '../assets/icon/calendar.svg';

const DEFAULT_MONTH_LIST = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DEFAULT_WEEK_LIST = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const CHINA_MONTH_LIST = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
const CHINA_WEEK_LIST = ['一', '二', '三', '四', '五', '六', '日'];
export default class Calendar extends Input {
    // 日期选择
    // 功能：日历选择，一段日期选择。
    // 日历样式/日历逻辑

    /**
     * get month days number;
     * @param month current month
     * @param year current year
     * @returns current months days number
     */
    private getMonthDays (month: number, year: number) {
        return new Date(year, month + 1, 0).getDate();
    }

    /**
     * get current date info
     * @returns current date object
     */
    private getCurrentDays () {
        return new Date();
    }

    /**
     * generate week list content
     */
    private generateWeekList () {
      return `<div class="form-genki-date-picker-week-wrapper>${DEFAULT_WEEK_LIST.map(_w => (`<div class="week-wrapper-item">${_w}</div>`))}</div>`
    }

    /**
     * generate month days table list: 7x7 table list
     * 1st tr week list
     * other days list
     */
    private generateMonthsTable() {
        const tatoalNumber = this.getCurrentDays();
        return DEFAULT_MONTH_LIST.map(_d => (
            `<tr>${_d}</tr>`
        ));
    }

    /**
     * mock date input
     */
    private generateCalendarInput() {
        return `<div class="form-genki-calendar-input"><span class="form-genki-calendar-wrapper-input-placeholder">请选择日期</span><span class="form-genki-calendar-wrapper-icon">${DateSvg}</div>`;
    }

    private getPrefixClassName() {
        return 'form-genki-calendar-wrapper';
    }

    /**
     * generate current months days
     */
    private getDisplayDays() {
        // current moths days
        const now = this.getCurrentDays();
        const currentDays = this.getMonthDays(now.getMonth(), now.getFullYear());
        // 7x7 cell, find first/last day of current month week order
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        const firstDayWeek = firstDay.getDay();
        const lastDayWeek = lastDay.getDay();
        // generate 7x7 cell data;
        const prevMonthDays = firstDayWeek - 1;
        const prevDays = this.getMonthDays(now.getMonth() - 1, now.getFullYear());
    
        // get prev month days and get date number
        const nextDays = this.getMonthDays(now.getMonth() + 1, now.getFullYear());
        const nextMonthDays = lastDayWeek - 1;
        // get next month days and get date number

        return `${this.generateArrayOrder(prevMonthDays)} ${this.generateArrayOrder(currentDays)} ${this.generateArrayOrder(nextMonthDays)}`;
    }

    private getWeekNumberOfYears(date: Date) {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        const yearStart = new Date(date.getFullYear(), 0, 1);
        const weekNumber = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1)/7);
        return weekNumber;
    }

    /**
     * get array from 0 to total
     * @param total number of days;
     */
    private generateArrayOrder(total: number) {
        return Array.from({length: total}, (_, i) => i + 1)
    }

    /**
     * @override
     */
    handleTpl() {
        console.log(this.getDisplayDays());
        return `<div class="form-genki-calendar-wrapper"><div id="${this.uuid}" name="${this.metaData.name}" class="form-genki-calender ${this.setStyle()}">
        ${this.generateCalendarInput()}
        </div></div>`;
    }

    /**
     * @override
     */
    getValue() {
        return '';
    }
}