import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-ant-ui-gather',
    templateUrl: './ant-ui-gather.page.html',
    styleUrls: ['./ant-ui-gather.page.scss'],
})
export class AntUiGatherPage implements OnInit {
    activeKey = [0, 1, 2];
    accordions: Array<any> = [
        {title: 'Title 1', child: ['content 1', 'content 1', 'content 1']},
        {title: 'Title 2', child: ['content 2', 'content 2', 'content 2'], inactive: false},
        {title: 'Title 3', child: ['content 3', 'content 3', 'content 3'], inactive: true}
    ];
    right = [
        {
            text: 'Cancel',
            onPress: () => console.log('cancel'),
            style: {backgroundColor: '#ddd', color: 'white'}
        },
        {
            text: 'Delete',
            onPress: () => console.log('delete'),
            style: {backgroundColor: '#F4333C', color: 'white'}
        }
    ];

    left = [
        {
            text: 'Reply',
            onPress: () => console.log('reply'),
            style: {backgroundColor: '#108ee9', color: 'white'}
        },
        {
            text: 'Cancel',
            onPress: () => console.log('cancel'),
            style: {backgroundColor: '#ddd', color: 'white'}
        }
    ];

    constructor() {
    }

    ngOnInit() {
    }

    open() {
        console.log('open');
    }

    close() {
        console.log('close');
    }

    click() {
        console.log('clicked!');
    }

    onChange(event) {
        console.log('onChange!');
    }

    onClose() {
        console.log('onClose!');
    }

    afterClose() {
        console.log('afterClose!');
    }
}
