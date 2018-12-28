import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-ant-datetime',
    templateUrl: './ant-datetime.page.html',
    styleUrls: ['./ant-datetime.page.scss'],
})
export class AntDatetimePage implements OnInit {
    extra = {
        '2017/07/15': {info: 'Disable', disable: true}
    };
    now = new Date();
    state: any = {
        en: false,
        date: null,
        show: false,
        pickTime: false,
        now: new Date(),
        type: 'range',
        enterDirection: '',
        rowSize: 'normal',
        showShortcut: false,
        infinite: true,
        defaultValue: undefined,
        minDate: new Date(+this.now - 5184000000),
        maxDate: new Date(+this.now + 31536000000),
        onSelect: undefined,
        getDateExtra: date => {
            return this.extra[+date];
        }
    };

    constructor() {
        this.extra[+new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate() + 5)] = {info: 'Disable', disable: true};
        this.extra[+new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate() + 6)] = {info: 'Disable', disable: true};
        this.extra[+new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate() + 7)] = {info: 'Disable', disable: true};
        this.extra[+new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate() + 8)] = {info: 'Disable', disable: true};

        for (const key in this.extra) {
            if (this.extra.hasOwnProperty(key)) {
                const info = this.extra[key];
                const date = new Date(key);
                if (!Number.isNaN(+date) && !this.extra[+date]) {
                    this.extra[+date] = info;
                }
            }
        }
    }

    ngOnInit(): void {
    }

    initPara() {
        this.state = {
            ...this.state,
            ...{
                show: false,
                date: null,
                pickTime: false,
                now: new Date(),
                type: 'range',
                rowSize: 'normal',
                infinite: true,
                enterDirection: '',
                onSelect: undefined,
                showShortcut: false,
                defaultValue: undefined,
                minDate: new Date(+this.now - 5184000000),
                maxDate: new Date(+this.now + 31536000000),
                getDateExtra: date => {
                    return this.extra[+date];
                }
            }
        };
    }

    changeLanguage() {
        this.state.en = !this.state.en;
    }

    onClick_0() {
        this.initPara();
        this.state.show = true;
        this.state.type = 'one';
        this.state.date = new Date();
    }

    onClick_1() {
        this.initPara();
        this.state.show = true;
    }

    onClick_2() {
        this.initPara();
        this.state.show = true;
        this.state.pickTime = true;
    }

    onClick_3() {
        this.initPara();
        this.state.show = true;
        this.state.type = 'one';
    }

    onClick_4() {
        this.initPara();
        this.state.show = true;
        this.state.pickTime = true;
        this.state.type = 'one';
    }

    onClick_5() {
        this.initPara();
        this.state.show = true;
        this.state.showShortcut = true;
    }

    onClick_6() {
        this.initPara();
        this.state.show = true;
        this.state.pickTime = true;
        this.state.showShortcut = true;
    }

    onClick_7() {
        this.initPara();
        this.state.show = true;
        this.state.rowSize = 'xl';
    }

    onClick_8() {
        this.initPara();
        this.state.show = true;
        this.state.infinite = false;
    }

    onClick_9() {
        this.initPara();
        this.state.show = true;
        this.state.enterDirection = 'horizontal';
    }

    onClick_10() {
        this.initPara();
        this.state.show = true;
        this.state.defaultValue = [new Date(+this.now - 86400000), new Date(+this.now - 345600000)];
    }

    onClick_11() {
        this.initPara();
        this.state.show = true;
        this.state.onSelect = (date, state) => {
            console.log('onSelect', date, state);
            return [date, new Date(+this.now - 604800000)];
        };
    }

    triggerCancel() {
        this.state.show = false;
    }

    triggerConfirm(value) {
        const {startDate, endDate} = value;
        this.state = {
            ...this.state,
            ...{show: false, startDate, endDate}
        };
        this.triggerCancel();
        console.log('onConfirm', startDate, endDate);
    }

    triggerSelectHasDisableDate(dates) {
        console.warn('onSelectHasDisableDate', dates);
    }

}
