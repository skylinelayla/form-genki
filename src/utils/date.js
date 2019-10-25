/**
 * @file date
 * @author skykun
 */

const BIG_MONTH = [1, 3, 5, 7, 8, 10, 12];
const now = new Date();

function getMonthDays(y, m) {
    now.setMonth(m || now.getMonth() + 1);
    now.setDate(0);
    return now.getDate();
}

export {getMonthDays};