/**
 * @file time range
 * @author skykun
 */
import Input from './input';
import DateSvg from '../assets/icon/calendar.svg';
import Calendar from './calendar';
import { FormType } from './form';

export default class DateRange extends Input {
    private prefixClazzName: string;
    private prevDate: Calendar;
    private nextDate: Calendar;
    constructor(data: FormType) {
        super(data);
        this.prefixClazzName = 'form-genki-date-range-wrapper';
        this.prevDate = new Calendar(data);
        this.nextDate = new Calendar(data);
    }
    /**
     * @override
     */
    handleTpl() {
        return `<div class="${this.prefixClazzName}">
          <div id="${this.uuid}" name="${this.metaData.name}" class="form-genki-date-range ${this.setStyle()}">
            ${this.generateDateRangeInput()}
          </div>
        </div>`;
    }

    handleAction() {
        // this.prevDate.handleAction();
        // this.nextDate.handleAction();
    }

    private generateDateRangeInput() {
        return `<div class="${this.prefixClazzName}-input">
            <div id="${this.uuid}-input-slot">
              <span>开始日期</span>
              <span>~</span>
              <span>结束日期</span>
              <span class="${this.prefixClazzName}-icon">${DateSvg}</span>
            </div>
            ${this.generateDateRangePanel()}
        </div>`;
    }

    private generateDateRangePanel() {
        return `<div class="${this.prefixClazzName}-panel">
            ${this.prevDate.getMonthTable()}
            ${this.nextDate.getMonthTable()}
        </div>`
    }
}
