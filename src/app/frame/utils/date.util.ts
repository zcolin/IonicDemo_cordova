/**
 * 日期相关工具类
 */
export class DateUtil {

    /**
     * 获取秒时间戳
     * @returns {number}
     * @param date
     */
    static getTimeSecondStamp(date: string | number | Date): number {
        const d = this.getDate(date);
        return d ? d.getTime() / 1000 : 0;
    }

    /**
     * 获取当前秒时间戳
     * @returns {number}
     */
    static getCurTimeSecondStamp(): number {
        return new Date().getTime() / 1000;
    }

    /**
     * 获取一天中最晚的时间戳
     * @param {string | number | Date} date
     * @returns {Date}
     */
    static getLatestSecondStampInDay(date: string | number | Date): number {
        return this.getLatestTimeInDay(date) ? this.getLatestTimeInDay(date).getTime() / 1000 : 0;
    }

    /**
     * 获取一天中最早的时间戳
     * @param {string | number | Date} date
     * @returns {Date}
     */
    static getEarliestSecondStampInDay(date: string | number | Date) {
        return this.getEarliestTimeInDay(date) ? this.getEarliestTimeInDay(date).getTime() / 1000 : 0;
    }

    /**
     * 获取一月中最早的时间戳
     * @param {string | number | Date} date
     * @returns {Date}
     */
    static getEarliestSecondStampInMonth(date: string | number | Date) {
        return this.getEarliestTimeInMonth(date) ? this.getEarliestTimeInMonth(date).getTime() / 1000 : 0;
    }

    /**
     * 获取一月中最晚的时间戳
     * @param {string | number | Date} date
     * @returns {Date}
     */
    static getLatestSecondStampInMonth(date: string | number | Date) {
        return this.getLatestTimeInMonth(date) ? this.getLatestTimeInMonth(date).getTime() / 1000 : 0;
    }

    /**
     * 获取一季度中最早的时间戳
     * @param {string | number | Date} date
     * @returns {Date}
     */
    static getEarliestSecondStampInQuarter(date: string | number | Date) {
        return this.getEarliestTimeInQuarter(date) ? this.getEarliestTimeInQuarter(date).getTime() / 1000 : 0;
    }

    /**
     * 获取一季度中最晚的时间戳
     * @param {string | number | Date} date
     * @returns {Date}
     */
    static getLatestSecondStampInQuarter(date: string | number | Date) {
        return this.getLatestTimeInQuarter(date) ? this.getLatestTimeInQuarter(date).getTime() / 1000 : 0;
    }

    /**
     * 获取当前年
     * @returns {number}
     */
    static getCurrentYear(): number {
        return new Date().getFullYear();
    }

    /**
     * 获取当前月
     * @returns {number}
     */
    static getCurrentMonth(): number {
        return new Date().getMonth();
    }

    /**
     * 获取当前天
     * @returns {number}
     */
    static getCurrentDay(): number {
        return new Date().getDay();
    }

    /**
     * 获取一天的最晚时间
     * @param {string | number | Date} date
     * @returns {Date}
     */
    static getLatestTimeInDay(date: string | number | Date): Date {
        const d = this.getDate(date);
        if (d) {
            d.setHours(23, 59, 59, 0);
        }
        return d;
    }

    /**
     * 获取一天的最早时间
     * @param {string | number | Date} date
     * @returns {Date}
     */
    static getEarliestTimeInDay(date: string | number | Date): Date {
        const d = this.getDate(date);
        if (d) {
            d.setHours(0, 0, 0, 0);
        }
        return d;
    }

    /**
     * 获取一月的最早时间
     * @param {string | number | Date} date
     * @returns {Date}
     */
    static getEarliestTimeInMonth(date: string | number | Date): Date {
        const d = this.getDate(date);
        if (d) {
            d.setDate(1);
            d.setHours(0, 0, 0, 0);
        }
        return d;
    }

    /**
     * 获取一月的最晚时间
     * @param {string | number | Date} date
     * @returns {Date}
     */
    static getLatestTimeInMonth(date: string | number | Date): Date {
        const d = this.getDate(date);
        if (d) {
            d.setDate(this.getDaysInMonth(d.getFullYear(), d.getMonth()));
            d.setHours(23, 59, 59, 0);
        }
        return d;
    }

    /**
     * 获取季度的最早时间
     * @param {string | number | Date} date
     * @returns {Date}
     */
    static getEarliestTimeInQuarter(date: string | number | Date): Date {
        const d = this.getDate(date);
        if (d) {
            d.setMonth(this.getEarliestMonthInQuarter(date));
            d.setDate(1);
            d.setHours(0, 0, 0, 0);
        }
        return d;
    }

    /**
     * 获取季度的最晚时间
     * @param {string | number | Date} date
     * @returns {Date}
     */
    static getLatestTimeInQuarter(date: string | number | Date): Date {
        const d = this.getDate(date);
        if (d) {
            d.setMonth(this.getLatestMonthInQuarter(date));
            d.setDate(this.getDaysInMonth(d.getFullYear(), d.getMonth()));
            d.setHours(23, 59, 59, 0);
        }
        return d;
    }

    /**
     * 日期对象转为日期字符串
     * @param date 需要格式化的日期对象
     * @param sFormat 输出格式,默认为yyyy-MM-dd                        年：y，月：M，日：d，时：h，分：m，秒：s
     * @example  dateFormat(new Date())                               "2017-02-28"
     * @example  dateFormat(new Date(),'yyyy-MM-dd')                  "2017-02-28"
     * @example  dateFormat(new Date(),'yyyy-MM-dd HH:mm:ss')         "2017-02-28 13:24:00"   ps:HH:24小时制
     * @example  dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss')         "2017-02-28 01:24:00"   ps:hh:12小时制
     * @example  dateFormat(new Date(),'hh:mm')                       "09:24"
     * @example  dateFormat(new Date(),'yyyy-MM-ddTHH:mm:ss+08:00')   "2017-02-28T13:24:00+08:00"
     * @example  dateFormat(new Date('2017-02-28 13:24:00'),'yyyy-MM-ddTHH:mm:ss+08:00')   "2017-02-28T13:24:00+08:00"
     * @returns {string}
     */
    static getDateStr(date?: Date, sFormat?: String): string {
        date = date ? date : new Date();
        sFormat = sFormat ? sFormat : 'yyyy-MM-dd';
        const time = {
            Year: 0,
            TYear: '0',
            Month: 0,
            TMonth: '0',
            Day: 0,
            TDay: '0',
            Hour: 0,
            THour: '0',
            hour: 0,
            Thour: '0',
            Minute: 0,
            TMinute: '0',
            Second: 0,
            TSecond: '0',
            Millisecond: 0
        };
        time.Year = date.getFullYear();
        time.TYear = String(time.Year).substr(2);
        time.Month = date.getMonth() + 1;
        time.TMonth = time.Month < 10 ? '0' + time.Month : String(time.Month);
        time.Day = date.getDate();
        time.TDay = time.Day < 10 ? '0' + time.Day : String(time.Day);
        time.Hour = date.getHours();
        time.THour = time.Hour < 10 ? '0' + time.Hour : String(time.Hour);
        time.hour = time.Hour < 13 ? time.Hour : time.Hour - 12;
        time.Thour = time.hour < 10 ? '0' + time.hour : String(time.hour);
        time.Minute = date.getMinutes();
        time.TMinute = time.Minute < 10 ? '0' + time.Minute : String(time.Minute);
        time.Second = date.getSeconds();
        time.TSecond = time.Second < 10 ? '0' + time.Second : String(time.Second);
        time.Millisecond = date.getMilliseconds();

        return sFormat.replace(/yyyy/ig, String(time.Year))
                      .replace(/yyy/ig, String(time.Year))
                      .replace(/yy/ig, time.TYear)
                      .replace(/y/ig, time.TYear)
                      .replace(/MM/g, time.TMonth)
                      .replace(/M/g, String(time.Month))
                      .replace(/dd/ig, time.TDay)
                      .replace(/d/ig, String(time.Day))
                      .replace(/HH/g, time.THour)
                      .replace(/H/g, String(time.Hour))
                      .replace(/hh/g, time.Thour)
                      .replace(/h/g, String(time.hour))
                      .replace(/mm/g, time.TMinute)
                      .replace(/m/g, String(time.Minute))
                      .replace(/ss/ig, time.TSecond)
                      .replace(/s/ig, String(time.Second))
                      .replace(/fff/ig, String(time.Millisecond));
    }

    /**
     * 获取时间用..以前的形式
     * @param oldTime
     */
    static getTimeAgo(oldTime: Date): string {
        const minute: number = 1000 * 60;
        const hour: number = minute * 60;
        const day: number = hour * 24;
        const month: number = day * 30;
        const year: number = day * 365;
        const now = new Date().getTime();
        const old = oldTime.getTime();
        const diffValue = now - old;
        const yearC = diffValue / year;
        const monthC = diffValue / month;
        const weekC = diffValue / (7 * day);
        const dayC = diffValue / day;
        const hourC = diffValue / hour;
        const minC = diffValue / minute;
        if (yearC >= 1) {
            return Math.floor(monthC) + '年前';
        } else if (monthC >= 1) {
            return Math.floor(monthC) + '个月前';
        } else if (weekC >= 1) {
            return Math.floor(weekC) + '周前';
        } else if (dayC >= 1) {
            return Math.floor(dayC) + '天前';
        } else if (hourC >= 1) {
            return Math.floor(hourC) + '小时前';
        } else if (minC >= 1) {
            return Math.floor(minC) + '分钟前';
        } else {
            return '刚刚';
        }
    }

    /**
     * 获取时间以几分钟前，几小时前，昨天，大于两天显示日期
     */
    static getServealTimeAgo(oldTime: Date): string {
        const minute: number = 1000 * 60;
        const hour: number = minute * 60;
        const day: number = hour * 24;
        const month: number = day * 30;
        const year: number = day * 365;
        const now = new Date().getTime();
        const old = oldTime.getTime();
        const diffValue = now - old;
        const yearC = diffValue / year;
        const monthC = diffValue / month;
        const weekC = diffValue / (7 * day);
        const dayC = diffValue / day;
        const hourC = diffValue / hour;
        const minC = diffValue / minute;
        if (dayC >= 2) {
            return this.getDateStr(oldTime, 'yyyy-MM-dd HH:mm:ss');
        } else if (dayC >= 1) {
            return '昨天' + this.getDateStr(oldTime, 'HH:mm');
        } else if (hourC >= 1) {
            return Math.floor(hourC) + '小时前';
        } else if (minC >= 1) {
            return Math.floor(minC) + '分钟前';
        } else {
            return '刚刚';
        }
    }

    /**
     * 获得季度的开端月份
     */
    static getEarliestMonthInQuarter(date: string | number | Date) {
        return this.getQuarter(date) * 3;
    }

    /**
     * 获得季度的结束月份
     */
    static getLatestMonthInQuarter(date: string | number | Date) {
        return this.getQuarter(date) * 3 + 2;
    }

    /**
     * 获得日期的季度
     */
    static getQuarter(date: string | number | Date) {
        const d = this.getDate(date);
        if (d) {
            const month = d.getMonth();
            return Math.floor(month / 3);
        }
        return 0;
    }

    /**
     * 获取某月的天数
     * @param year
     * @param month
     * @returns {number}
     */
    static getDaysInMonth(year: number, month: number) {
        month++;
        const temp = new Date(year, month, 0);
        return temp.getDate();
    }

    /**
     * 获取日期实例
     * @param {string | number | Date} date
     * @returns {Date}
     */
    static getDate(date: string | number | Date) {
        let d: Date;
        if (typeof date === 'string') {
            d = new Date(date);
        } else if (typeof date === 'number') {
            d = new Date(date);
        } else {
            d = date;
        }
        return d;
    }

    /**
     * 获取当前日期到之前某一年的季度信息(名称以及minDate、maxDate)
     * @param {string | number | Date} earlyYear 最早的年份
     * @returns {{ des: string, minDate: number, maxDate: number }[]}
     */
    static getEarlyQuartsInfo(earlyYear: number) {
        const dateItems: { des: string, minDate: number, maxDate: number }[] = [];
        const currentYear = DateUtil.getCurrentYear();
        for (let i = currentYear; i >= earlyYear; i--) {
            let k = 4; // 默认第四季度
            if (i === currentYear) {
                k = DateUtil.getQuarter(new Date()) + 1;
            }
            for (let j = k; j >= 1; j--) {
                const dateStr = `${i}/${j * 3}/01`;
                dateItems.push({
                    des: i + '年第' + j + '季度',
                    minDate: DateUtil.getEarliestSecondStampInQuarter(dateStr),
                    maxDate: DateUtil.getLatestSecondStampInQuarter(dateStr)
                });
            }
        }
        return dateItems;
    }
}
