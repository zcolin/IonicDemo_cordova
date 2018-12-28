import {Component} from '@angular/core';
import {range} from 'rxjs/internal/observable/range';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-ant-tabs',
    templateUrl: './ant-tabs.page.html',
    styleUrls: ['./ant-tabs.page.scss'],
})
export class AntTabsPage {

    index = 0;
    items: string[] = [];
    direction = 'horizontal';
    animation = true;
    tabCount = 3;
    position = 'top';

    constructor() {
        range(1, 50).pipe(map(value => 'Item------Text--' + value)).subscribe(value => this.items.push(value));
    }

    selectCard(e) {
        console.log(' ', JSON.stringify(e));
    }

    changeDirection() {
        if (this.direction === 'horizontal') {
            this.direction = 'vertical';
        } else {
            this.direction = 'horizontal';
        }
    }

    changePosition() {
        switch (this.position) {
            case 'top':
                this.position = 'right';
                break;
            case 'right':
                this.position = 'bottom';
                break;
            case 'bottom':
                this.position = 'left';
                break;
            case 'left':
                this.position = 'top';
                break;
        }
    }

    changeTabCount() {
        this.tabCount++;
        if (this.tabCount >= 7) {
            this.tabCount = 4;
        }
    }

    changeAnimation() {
        this.animation = !this.animation;
    }
}
