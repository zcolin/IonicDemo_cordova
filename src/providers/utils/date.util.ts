/**
 * 日期相关工具类
 */
export class DateUtil {
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
    static getDate(date?: Date, sFormat?: String): string {
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
     * @param pTime 
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
            return Math.round(monthC) + "年前";
        }
        else if (monthC >= 1) {
            return Math.round(monthC) + "个月前";
        }
        else if (weekC >= 1) {
            return Math.round(weekC) + "周前";
        }
        else if (dayC >= 1) {
            return Math.round(dayC) + "天前";
        }
        else if (hourC >= 1) {
            return Math.round(hourC) + "小时前";
        }
        else if (minC >= 1) {
            return Math.round(minC) + "分钟前";
        } else {
            return "刚刚";
        }
    }
}
