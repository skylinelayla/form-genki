/**
 * @file calendar
 * @author skykun
 */

import Input from './input';
import DateSvg from '../assets/icon/calendar.svg';
import { FormType } from './form';

const DEFAULT_MONTH_LIST = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DEFAULT_WEEK_LIST = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const CHINA_MONTH_LIST = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
const CHINA_WEEK_LIST = ['一', '二', '三', '四', '五', '六', '日'];
export default class Calendar extends Input {
    private prefixClazzName: string;
    currentTime: Date;
    constructor(data: FormType) {
        super(data);
        this.prefixClazzName = 'form-genki-calendar-wrapper';
        this.currentTime = new Date();
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
     * get current date info
     * @returns current date object
     */
    private getCurrentDays () {
        return new Date();
    }

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
     * generate week list content
     */
    private generateWeekList () {
      return `<thead>
            <tr class="${this.prefixClazzName}-table-tr">
                ${CHINA_WEEK_LIST.map(_w => (`<th><div class="${this.prefixClazzName}-table-th-cell">${_w}</div></th>`)).join('')}
            </tr>
        </thead>`;
    }

    /**
     * generate date title
     */
    private generateCalendarHeader() {
        return `<div class="${this.prefixClazzName}-table-header">
            <div class="icon year-prev"></div>
            <div class="icon month-prev"></div>
            <span>
                <a class="year-select">${this.currentTime.getFullYear()}年</a>
                <a class="month-select">${this.currentTime.getMonth() + 1}月</a>
            </span>
            <div class="icon year-next"></div>
            <div class="icon month-next"></div>
        </div>`;
    }
    
    private generateBottomActionPanel() {
        return `<div class="${this.prefixClazzName}-table-footer"><a>今天</a></div>`;
    }

    /**
     * mock date input
     */
    private generateCalendarInput() {
        return `<div class="${this.prefixClazzName}-input" id="${this.uuid}-input">
            <span class="${this.prefixClazzName}}-value"></span>
            <span class="${this.prefixClazzName}-icon">${DateSvg}</span>
        </div>`;
    }

    /**
     * generate current months days
     */
    private getDisplayDays() {
        const currentDays = this.getMonthDays(this.currentTime.getMonth(), this.currentTime.getFullYear());
        // 7x7 cell, find first/last day of current month week order
        const firstDay = new Date(this.currentTime.getFullYear(), this.currentTime.getMonth(), 1);
        const lastDay = new Date(this.currentTime.getFullYear(), this.currentTime.getMonth() + 1, 0);
        const firstDayWeek = firstDay.getDay();
        const lastDayWeek = lastDay.getDay();
        // generate 7x7 cell data;
        const prevMonthDays = firstDayWeek - 1;
        const prevDays = this.getMonthDays(this.currentTime.getMonth() - 1, this.currentTime.getFullYear());
        const prevMonthInfo = this.getMonthInfo(this.currentTime, 'prev');

        // get prev month days and get date number
        const nextDays = this.getMonthDays(this.currentTime.getMonth() + 1, this.currentTime.getFullYear());
        const nextMonthDays = 42 - prevMonthDays + currentDays;
        const nextMonthInfo = this.getMonthInfo(this.currentTime, 'next');
        return [
            ...this.getMonthSurplusDays(
                prevDays, prevMonthDays, 'prev', prevMonthInfo.getFullYear(), prevMonthInfo.getMonth() + 1,
            ),
            ...this.generateArrayOrder(currentDays, true, this.currentTime.getFullYear(), this.currentTime.getMonth() + 1),
            ...this.getMonthSurplusDays(
                nextDays, nextMonthDays, 'next', nextMonthInfo.getFullYear(), nextMonthInfo.getMonth() + 1
            ),
        ];
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
     * get month table
     */
    private getMonthTable() {
        const daysList = this.getDisplayDays();
        let tableContent = '';
        for(let i = 0; i < 6; i++) {
            let tdContent = '';
            for(let j = 0; j < 7; j++) {
                const td = daysList[i * 7 + j];
                tdContent += `<td class="${this.prefixClazzName}-table-td">
                    <div class="${this.prefixClazzName}-cell${td.isCurrentMonth ? ' current-days' : ''}" data-time="${td.date}">
                        ${td.value}
                    </div>
                </td>`;
            }
            tableContent += `<tr class="${this.prefixClazzName}-table-tr">${tdContent}</tr>`;
        }
        return `<div class="table-body" id="${this.uuid}-table">
            <table class="${this.prefixClazzName}-table">${this.generateWeekList()}${tableContent}</table>
        </div>`;
    }

    /**
     * panel show input dom
     */
    private getPopInput() {
        return `<div class="${this.prefixClazzName}-pop-input" id="${this.uuid}-pop-input">
            <input className="${this.prefixClazzName}-input" id="${this.uuid}-input" />
        </div>`;
    }

    private getPopOverTableContent() {
        return `
        <div class="form-genki-calendar-panel-wrapper" id="${this.uuid}-panel-container">
            ${this.getPopInput()}
            <div class="form-genki-calendar-panel" id="${this.uuid}-panel">
                ${this.generateCalendarHeader()}
                ${this.getMonthTable()}
                ${this.generateBottomActionPanel()}
            </div>
        </div>
        `;
    }

    /**
     * @override
     */
    handleTpl() {
        return `<div class="${this.prefixClazzName}" id="${this.uuid}">
            <div id="${this.uuid}" name="${this.metaData.name}" class="form-genki-calender ${this.setStyle()}">
                ${this.generateCalendarInput()}
                ${this.getPopOverTableContent()}
            </div>
        </div>`;
    }

    handleAction() {
        const $wrapper = document.getElementById(this.uuid);
        const $input = document.getElementById(`${this.uuid}-input`);
        const $panel = document.getElementById(`${this.uuid}-panel-container`);
        const $popInput = document.getElementById(`${this.uuid}-pop-input`);
        const $table = document.getElementById(`${this.uuid}-table`);
        const me = this;
        $input.addEventListener('click', () => {
            console.log('yes');
            me.toggleItems($panel);
        });
        document.addEventListener('click', (evt) => {
            if (!$input.contains(evt.target as Node)) {
                me.toggleItems($panel);
            }
        });
        $table.addEventListener('click', (evt) => {
            const value = (evt.target as HTMLElement).dataset.time;
            alert(value);
        });
    }

    private toggleItems ($panelWrapper: HTMLElement) {
        if ($panelWrapper.style.display === 'none') {
            $panelWrapper.style.display = 'block';
        } else {
            $panelWrapper.style.display = 'none';
        }
    }

    /**
     * @override
     */
    getValue() {
        return '';
    }
}