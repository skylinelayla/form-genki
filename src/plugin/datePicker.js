/**
 * @file datePicker
 * @author skykun
 */
import Plugin from './plugin';
import {createElement} from '../utils/dom';

const weekCursor = {
    0: 'Su',
    1: 'Mo',
    2: 'Tu',
    3: 'We',
    4: 'Th',
    5: 'Fr',
    6: 'Sa'
};

const tableYearHead = `<tr><td class="prev"><<</td><td class="yearMonth">%YEAR_MONTH%</td><td class="next">>></td><tr>`
const tableWeekHead = `<td class="week">%WEEK_DAY%</td>`;
const tableDayTd = `<td class="day">%DAY%</td>`;

export class DatePickerPlugin extends Plugin {
    constructor(data) {
        super(data);
    }

    render() {

    }

    /**
     * @override
     */
    dispatch() {

    }

    createTableContainer() {
        this.$tableContainer = createElement('table', {class: 'form-genki-date-container'});
    }

    renderWeek() {
        let res = '';
        weekCursor.map(e => {
            res += tableWeekHead.replace('%WEEK_DAY%', )
        })
    }
}