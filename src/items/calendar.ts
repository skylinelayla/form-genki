/**
 * @file calendar
 * @author skykun
 */

import Input from "./input";

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
        return new Date(year, month, 0).getDate();
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


  
}