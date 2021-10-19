/**
 * @file calendar
 * @author skykun
 */

import Input from './input';
import DateSvg from '../assets/icon/calendar.svg';
import { FormType } from './form';
import { getDOMById } from '../utils/dom';

const DEFAULT_MONTH_LIST = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DEFAULT_WEEK_LIST = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const CHINA_MONTH_LIST = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
const CHINA_WEEK_LIST = ['一', '二', '三', '四', '五', '六', '日'];
const PREFIX_CLAZZ_NAME = 'form-genki-calendar-wrapper';
export default class Calendar extends Input {
    private prefixClazzName: string;
    currentTime: Date;
    selectTime: string;
    yearRange: [number, number];

    constructor(data: FormType) {
        super(data);
        this.prefixClazzName = PREFIX_CLAZZ_NAME;
        this.currentTime = this.getDefaultCurrentDate();
        this.selectTime = this.formatDate(this.currentTime);
    }

    private getDefaultCurrentDate() {
        return this.metaData.defaultValue ? new Date(this.metaData.defaultValue) : new Date();
    }

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
     * get prev or next month date
     * @param date 
     * @param type 
     * @returns date
     */
    private getMonthInfo(date: string | Date, type: 'prev' | 'next') {
        const factor = type === 'prev' ? -1 : 1;
        const dateObj = new Date(date);
        if (dateObj.getMonth()) {
            dateObj.setMonth(dateObj.getMonth() + factor);
        } else {
            dateObj.setFullYear(dateObj.getFullYear() + factor);
            dateObj.setMonth(12);
        }
        return dateObj;
    }

    /**
     * get array from 0 to total
     * @param total number of days;
     */
    private generateArrayOrder(total: number, isCurrentMonth?: boolean, year?: number, month?: number) {
        return Array.from({length: total}, (_, i) => ({value: i + 1, isCurrentMonth, date: new Date(`${year}-${month}-${i+1}`)}));
    }


    /**
     * get surplus days of next or prev month
     * @param total the total of a month
     * @param surplus the number to pick days of a month
     * @param begin last month of next month
     */
     private getMonthSurplusDays(total: number, surplus: number, begin: 'prev' | 'next', year?: number, month?: number) {
        const list = this.generateArrayOrder(total, false, year, month);
        if (begin === 'prev') {
            // get last month surplus days
            return list.slice(total - surplus);
        } else {
            // get next month surplus days
            return list.slice(0, surplus);
        }
    }

    /**
     * generate current months days
     */
      private getDisplayDays() {
        const currentYear = this.currentTime.getFullYear();
        const currentMonth = this.currentTime.getMonth();
        const currentDays = this.getMonthDays(currentMonth, currentYear);
        // 7x7 cell, find first/last day of current month week order
        const firstDay = new Date(currentYear, currentMonth, 1);
        const firstDayWeek = firstDay.getDay();
        // generate 7x7 cell data;
        const prevMonthDays = firstDayWeek - 1;
        const prevDays = this.getMonthDays(currentMonth - 1, currentYear);
        const prevMonthInfo = this.getMonthInfo(this.currentTime, 'prev');
    
        // get prev month days and get date number
        const nextDays = this.getMonthDays(currentMonth + 1, currentYear);
        const nextMonthDays = 42 - prevMonthDays + currentDays;
        const nextMonthInfo = this.getMonthInfo(this.currentTime, 'next');
        return [
            ...this.getMonthSurplusDays(
                prevDays, prevMonthDays, 'prev', prevMonthInfo.getFullYear(), prevMonthInfo.getMonth() + 1,
            ),
            ...this.generateArrayOrder(currentDays, true, currentYear, currentMonth + 1),
            ...this.getMonthSurplusDays(
                nextDays, nextMonthDays, 'next', nextMonthInfo.getFullYear(), nextMonthInfo.getMonth() + 1
            ),
        ];
    }

    /**
     * get next month date
     * @param date current time
     * @returns next month date time
     */
     private getNextMonthDate(date: Date) {
        let nextYears = date.getFullYear();
        let nextMonth = date.getMonth() + 2;
        if (nextMonth === 13) {
            nextYears += 1;
            nextMonth = 1;
        }
        let nextDay = `${date.getDate()}`;
        const nextDays = new Date(nextYears, nextMonth, 0);
        const nextDaysNumber = nextDays.getDate();
        if (+nextDay > nextDaysNumber) {
            nextDay = `${nextDaysNumber}`;
        }
        if (+nextDay < 10) {
            nextDay = `0${nextDay}`;
        }
        return `${nextYears}-${nextMonth}-${nextDay}`;
    }

    /**
     * get prev month date
     * @param date 
     * @returns prev month date time
     */
    private getPrevMonthDate(date: Date) {
        let prevYears = date.getFullYear();
        let prevMonth = date.getMonth();
        if (prevMonth === 0) {
            prevYears -= 1;
            prevMonth = 12;
        }
        let prevDay = `${date.getDate()}`;
        const prevDays = new Date(prevYears, prevMonth, 0);
        if (+prevDay > prevDays.getDate()) {
            prevDay = `${prevDays.getDate()}`;
        }
        if (+prevDay < 10) {
            prevDay = `0${prevDay}`;
        }
        return `${prevYears}-${prevMonth}-${prevDay}`;
    }

    // private getNextYearDate(date: Date) {
    //     return new Date(date.getFullYear() + 1, date.getMonth(), date.getDate());
    // }

    // private getPrevYearDate(date: Date) {
    //     return new Date(date.getFullYear() - 1, date.getMonth(), date.getDate());
    // }

    /**
     * get beside year date
     * @param date date
     * @param flag params to distinguish next year or prev year
     * @returns date
     */
    private getBesideYearDate(date: Date, flag: 'prev' | 'next') {
        return new Date(date.getFullYear() + (flag === 'prev' ? -1 : 1), date.getMonth(), date.getDate());
    }

    private formatDate(dateStr: Date | string) {
        const date = new Date(dateStr);
        let day = `${date.getDate()}`;
        if (+day < 10) {
            day = `0${day}`;
        }
        return `${date.getFullYear()}-${date.getMonth() + 1}-${day}`;
    }

    /**
     * generate week list content
     */
    private generateWeekList () {
      return`
        <thead>
            <tr class="${this.prefixClazzName}-table-tr">
                ${CHINA_WEEK_LIST.map(_w => (`<th><div class="${this.prefixClazzName}-table-th-cell">${_w}</div></th>`)).join('')}
            </tr>
        </thead>`;
    }

    /**
     * generate date title
     */
    private generateCalendarHeader() {
        return `
            <div class="${this.prefixClazzName}-table-header">
                <div class="icon year-prev" id="${this.uuid}-year-prev"></div>
                <div class="icon month-prev" id="${this.uuid}-month-prev"></div>
                <span>
                    <a class="year-select" id="${this.uuid}-year-quick-select">${this.currentTime.getFullYear()}年</a>
                    <a class="month-select" id="${this.uuid}-month-quick-select">${this.currentTime.getMonth() + 1}月</a>
                </span>
                <div class="icon year-next" id="${this.uuid}-year-next"></div>
                <div class="icon month-next" id="${this.uuid}-month-next"></div>
            </div>`;
    }

    private generateQuickCalendarHeader(str: string) {
        return `
            <div class="${this.prefixClazzName}-table-header">
                <div class="icon year-prev" id="${this.uuid}-quick-pick-year-prev"></div>
                <span id="${this.uuid}-quick-range-slot">
                    ${str}
                </span>
                <div class="icon year-next" id="${this.uuid}-quick-pick-year-next"></div>
            </div>`;
    }

    private generateQuickCalendarMonthHeader(str: string) {
        return `
            <div class="${this.prefixClazzName}-table-header">
                <div class="icon year-prev" id="${this.uuid}-quick-pick-month-prev"></div>
                <span id="${this.uuid}-quick-range-slot">
                    ${str}
                </span>
                <div class="icon year-next" id="${this.uuid}-quick-pick-month-next"></div>
            </div>`;
    }

    private generateBottomActionPanel() {
        return `<div class="${this.prefixClazzName}-table-footer"><a id="${this.uuid}-reset-today">今天</a></div>`;
    }

    /**
     * mock date input
     */
    private generateCalendarInput() {
        return `
            <div class="${this.prefixClazzName}-input" id="${this.uuid}-input">
                <span class="${this.prefixClazzName}-value" id="${this.uuid}-display-input">${this.selectTime}</span>
                <span class="${this.prefixClazzName}-icon">${DateSvg}</span>
            </div>`;
    }

    /**
     * get month table
     */
    getMonthTable(date?: string) {
        const daysList = this.getDisplayDays();
        let tableContent = '';
        for(let i = 0; i < 6; i++) {
            let tdContent = '';
            for(let j = 0; j < 7; j++) {
                const td = daysList[i * 7 + j];
                tdContent += `
                    <td class="${this.prefixClazzName}-table-td">
                        <div class="${this.prefixClazzName}-cell${
                            td.isCurrentMonth ? ' current-days' : ''}${
                            date === this.formatDate(td.date) ? ' selected' : ''}"
                            data-time="${td.date}">
                        ${td.value}
                    </div>
                </td>`;
            }
            tableContent += `<tr class="${this.prefixClazzName}-table-tr">${tdContent}</tr>`;
        }
        return `
            <div class="table-body" id="${this.uuid}-table">
                <table class="${this.prefixClazzName}-table">${this.generateWeekList()}${tableContent}</table>
            </div>`;
    }

    /**
     * panel show input dom
     */
    private getPopInput() {
        return `
            <div class="${this.prefixClazzName}-pop-input" id="${this.uuid}-pop-input">
                <input className="${this.prefixClazzName}-input" id="${this.uuid}-select-input" />
            </div>`;
    }

    private getPopOverTableContent(date?: string) {
        return `
            <div class="form-genki-calendar-panel-wrapper" id="${this.uuid}-panel-container">
                ${this.getPopInput()}
                <div class="form-genki-calendar-panel" id="${this.uuid}-panel">
                    <div id="${this.uuid}-table-head-slot">
                        ${this.generateCalendarHeader()}
                    </div>
                    <div id="${this.uuid}-table-slot">
                        ${this.getMonthTable(date)}
                    </div>
                    ${this.generateBottomActionPanel()}
                </div>
            </div>`;
    }

    /**
     * @override
     */
    handleTpl() {
        return `
            <div class="${this.prefixClazzName}">
                <div id="${this.uuid}" name="${this.metaData.name}" class="form-genki-calender ${this.setStyle()}">
                    ${this.generateCalendarInput()}
                </div>
            </div>`;
    }

    private generateQuickYearSelectTable(defaultRange?: [number, number]) {
        const year = this.currentTime.getFullYear();
        const number = year % 10;
        let prefixYear = 0;
        let lastYear = 9;
        if (defaultRange) {
            [prefixYear, lastYear] = defaultRange;
        } else {
            prefixYear = year - number;
            lastYear = year + (9 - number);
        }
        const range = defaultRange || [prefixYear, lastYear] as [number, number];
        const list = [];
        for(let i = prefixYear; i <= lastYear; i++) {
            list.push(i);
        }
        const tableDisplayList = [prefixYear - 1, ...list, lastYear + 1];
        let tableStr = '';
        for(let i = 0; i < 4; i++) {
            let tableTd = '';
            for (let j = 0; j < 3; j++) {
                const td = tableDisplayList[i * 3 + j];
                tableTd += `
                    <td class="${this.prefixClazzName}-year-quick-td">
                        <div
                          class="${this.prefixClazzName}-year-quick-select
                          ${year === td ? 'active-quick-select-year' : ''}"
                          data-year="${td}">
                            ${td}
                        </div>
                    </td>`;
            }
            tableStr += `<tr>${tableTd}</tr>`
        }
        return {
            dom: `<table class="${this.prefixClazzName}-year-quick-table">${tableStr}</table>`,
            range,
        }
    }

    private generateQuickMonthSelectTable() {
        let tableStr = '';
        const month = this.currentTime.getMonth();
        for(let i = 0; i < 4; i ++) {
            let tableContent = '';
            for (let j = 0; j < 3; j++) {
                const td = CHINA_MONTH_LIST[i * 3 + j];
                tableContent += 
                  `<td class="${this.prefixClazzName}-year-quick-td">
                    <div
                      class="${this.prefixClazzName}-month-quick-select
                      ${month === (i * 3 + j) ? 'active-quick-select-year' : ''}"
                      data-month="${i * 3 + j}"
                    >
                    ${td}
                    </div>
                </td>`;
            }
            tableStr += `<tr>${tableContent}</tr>`;
        }
        return `<table class="${this.prefixClazzName}-year-quick-table">${tableStr}</table>`;
    }

    handleAction() {
        const $wrapper = getDOMById(this.uuid);

        $wrapper.addEventListener('click', (evt) => {
            evt.stopPropagation();
            // pay attention after click input then render td panel
            const $panel = getDOMById(`${this.uuid}-panel-container`);
            if ((evt.target as Element).id.includes('quick-select')) {
                // year & month quick click
                const id = (evt.target as Element).id;
                if (id.includes('year')) {
                    const $tableSlot = getDOMById(`${this.uuid}-table-slot`);
                    const $tableHeadSlot = getDOMById(`${this.uuid}-table-head-slot`);

                    const { range, dom } = this.generateQuickYearSelectTable();

                    $tableSlot.innerHTML = dom;
                    $tableHeadSlot.innerHTML = this.generateQuickCalendarHeader(range.join('-'));
                    this.yearRange = range;
                } else {
                   // month
                   const $tableSlot =  getDOMById(`${this.uuid}-table-slot`);
                   const $tableHeadSlot = getDOMById(`${this.uuid}-table-head-slot`);
                   $tableSlot.innerHTML = this.generateQuickMonthSelectTable();
                   $tableHeadSlot.innerHTML = this.generateQuickCalendarMonthHeader(`${this.currentTime.getFullYear()}`);
                }
                return;
            }
            if ((evt.target as Element).id.includes('quick-pick')) {
                const id = (evt.target as Element).id;
                if (id.includes('year')) {
                    if (id.includes('next')) {
                        const $tableRangeSlot = getDOMById(`${this.uuid}-quick-range-slot`);
                        const $tableSlot = getDOMById(`${this.uuid}-table-slot`);
                        const newRange = [this.yearRange[0] + 10, this.yearRange[1] + 10];
                        $tableRangeSlot.innerHTML = newRange.join('-');
                        $tableSlot.innerHTML = this.generateQuickYearSelectTable(newRange as [number, number]).dom;
                        this.yearRange = newRange as [number, number];
                    } else {
                        const $tableRangeSlot = getDOMById(`${this.uuid}-quick-range-slot`);
                        const $tableSlot = getDOMById(`${this.uuid}-table-slot`);
                        const newRange = [this.yearRange[0] - 10, this.yearRange[1] - 10];
                        $tableRangeSlot.innerHTML = newRange.join('-');
                        $tableSlot.innerHTML = this.generateQuickYearSelectTable(newRange as [number, number]).dom;
                        this.yearRange = newRange as [number, number];
                    }
                } else {
                    if (id.includes('next')) {
                        const $tableRangeSlot = getDOMById(`${this.uuid}-quick-range-slot`);
                        const nextYear = this.currentTime.getFullYear() + 1;
                        $tableRangeSlot.innerHTML = `${nextYear}`;
                        this.currentTime = new Date(nextYear, this.currentTime.getMonth() + 1, this.currentTime.getDate());
                        
                    } else {
                        const $tableRangeSlot = getDOMById(`${this.uuid}-quick-range-slot`);
                        const lastYear = this.currentTime.getFullYear() - 1;
                        $tableRangeSlot.innerHTML = `${lastYear}`;
                        this.currentTime = new Date(lastYear, this.currentTime.getMonth() + 1, this.currentTime.getDate());
                    }
                }
                return;
            }
            if ((evt.target as Element).id.includes('reset')) {
                this.currentTime = new Date();
                this.selectTime = this.formatDate(this.currentTime);
                const $displayInput = getDOMById(`${this.uuid}-display-input`);
                $displayInput.innerHTML = this.selectTime;
            }

            if ((evt.target as Element).id.includes('year')) {
                const id = (evt.target as Element).id;
                const $tableSlot = getDOMById(`${this.uuid}-table-slot`);
                const $selectInput = getDOMById(`${this.uuid}-select-input`) as HTMLInputElement;
                const $tableHeadSlot = getDOMById(`${this.uuid}-table-head-slot`);

                if (id.includes('prev')) {
                    const prevDate = this.getPrevYearDate(new Date(this.selectTime));
                    this.currentTime = new Date(prevDate);
                    this.selectTime = this.formatDate(this.currentTime);
                    $tableSlot.innerHTML = this.getMonthTable(this.selectTime);
                    $tableHeadSlot.innerHTML = this.generateCalendarHeader();
                    $selectInput.value = this.selectTime;
                } else {
                    const nextDate = this.getNextYearDate(new Date(this.selectTime));
                    this.currentTime = new Date(nextDate);
                    this.selectTime = this.formatDate(this.currentTime);
                    $tableSlot.innerHTML = this.getMonthTable(this.selectTime);
                    $tableHeadSlot.innerHTML = this.generateCalendarHeader();
                    $selectInput.value = this.selectTime;
                }
                return;
            }
            if ((evt.target as Element).id.includes('month')) {
                // update current time
                const id = (evt.target as Element).id;
                const $tableSlot = getDOMById(`${this.uuid}-table-slot`);
                const $tableHeadSlot = getDOMById(`${this.uuid}-table-head-slot`);
                const $selectInput = getDOMById(`${this.uuid}-select-input`) as HTMLInputElement;
                if (id.includes('prev')) {
                    const prevDate = this.getPrevMonthDate(new Date(this.selectTime));
                    this.currentTime = new Date(prevDate);
                    this.selectTime = this.formatDate(this.currentTime);
                    $tableSlot.innerHTML = this.getMonthTable(this.selectTime);
                    $tableHeadSlot.innerHTML = this.generateCalendarHeader();
                    $selectInput.value = this.selectTime;
                } else {
                    const nextDate = this.getNextMonthDate(new Date(this.selectTime));
                    this.currentTime = new Date(nextDate);
                    this.selectTime = this.formatDate(this.currentTime);
                    $tableSlot.innerHTML = this.getMonthTable(this.selectTime);
                    $tableHeadSlot.innerHTML = this.generateCalendarHeader();
                    $selectInput.value = this.selectTime;
                }
                return;
            }
            if ((evt.target as Element).parentElement.nodeName === 'TD') {
                if ((evt.target as HTMLElement).dataset.time) {
                    const value = (evt.target as HTMLElement).dataset.time;
                    const formattedValue = this.formatDate(value);
                    const $selectInput = getDOMById(`${this.uuid}-select-input`) as HTMLInputElement;
                    $selectInput.value = formattedValue;
                    // $panel.style.display = 'none';
                    this.selectTime = formattedValue;
                    this.currentTime = new Date(value);
                }
                if ((evt.target as HTMLElement).dataset.year) {
                    const value = (evt.target as HTMLElement).dataset.year;
                    console.log(value);
                    const selectDate = new Date(+value, this.currentTime.getMonth(), this.currentTime.getDate());
                    const formattedValue = this.formatDate(selectDate);
                    const $selectInput = getDOMById(`${this.uuid}-select-input`) as HTMLInputElement;
                    const $tableSlot = getDOMById(`${this.uuid}-table-slot`);
                    const $tableHeadSlot = getDOMById(`${this.uuid}-table-head-slot`);
                    $selectInput.value = formattedValue;
                    this.selectTime = formattedValue;
                    this.currentTime = selectDate;
                    $tableSlot.innerHTML = this.getMonthTable(this.selectTime);
                    $tableHeadSlot.innerHTML = this.generateCalendarHeader();
                    return;
                }
                if ((evt.target as HTMLElement).dataset.month) {
                    const value = (evt.target as HTMLElement).dataset.month;
                    console.log(value);
                    const selectDate = new Date(this.currentTime.getFullYear(), +value, this.currentTime.getDate());
                    const formattedValue = this.formatDate(selectDate);
                    const $selectInput = getDOMById(`${this.uuid}-select-input`) as HTMLInputElement;
                    const $tableSlot = getDOMById(`${this.uuid}-table-slot`);
                    const $tableHeadSlot = getDOMById(`${this.uuid}-table-head-slot`);
                    this.selectTime = formattedValue;
                    this.currentTime = selectDate;
                    $selectInput.value = formattedValue;
                    $tableHeadSlot.innerHTML = this.generateCalendarHeader();
                    $tableSlot.innerHTML = this.getMonthTable(this.selectTime);
                    return;
                }
             
            }
            if ($panel) {
                $wrapper.innerHTML = this.generateCalendarInput();
                const $displayInput = getDOMById(`${this.uuid}-display-input`);
                $displayInput.innerHTML = this.selectTime;
     
            } else {
                $wrapper.innerHTML = `${$wrapper.innerHTML} ${this.getPopOverTableContent(this.selectTime)}`;
                const $selectInput = getDOMById(`${this.uuid}-select-input`) as HTMLInputElement;
                $selectInput.value = this.selectTime;
            }
        });

        document.addEventListener('click', () => {
            // close
            const $panel = getDOMById(`${this.uuid}-panel-container`);
            if ($panel) {
                $panel.remove();
            }
        });
    }

    /**
     * @override
     */
    getValue() {
        return this.selectTime;
    }
}
