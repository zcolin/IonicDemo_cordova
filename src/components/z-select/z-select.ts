import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { UiService } from '../../providers/ui.service';

@Component({
    selector: 'z-select',
    templateUrl: 'z-select.html'
})
export class ZSelectComponent {
    @Input() arrText: string[];
    @Input() selectedPos: number | number[];
    @Input() okCallback: (selectedPos, selectedText, isAllSelected?) => void;
    @Input() multi: boolean;
    @Input() addAll: boolean;
    @Input() allSelected: boolean;
    @Input() allText: string;
    @Input() outLine: boolean = true;
    @Input() minWidth: number;
    @Output() onSubmit = new EventEmitter();
    @ViewChild('thSelectOption') container: ElementRef;
    defText: string;

    constructor(private uiService: UiService) {

    }

    ngOnChanges(changes) {
        this.refresh();
    }

    private refresh() {
        if (this.container) {
            if (this.minWidth) {
                this.container.nativeElement.style.minWidth = this.minWidth + 'px';
            }

            if (this.outLine != true) {
                this.container.nativeElement.style.borderWidth = '0px';
            }
        }

        if (this.arrText) {
            if (this.multi) {
                if (this.arrText && this.selectedPos != undefined && typeof this.selectedPos != 'number' && this.arrText.length == this.selectedPos.length) {
                    this.defText = "全部"
                } else if (typeof this.selectedPos != 'number' && this.selectedPos.length > 0) {
                    this.defText = this.arrText[this.selectedPos[0]] + (this.selectedPos.length > 1 ? '...' : '');
                } else {
                    this.defText = "全部"
                }
            } else {
                let text = this.arrText ? this.arrText[this.selectedPos == undefined || typeof this.selectedPos != 'number' ? 0 : this.selectedPos] : '';
                this.defText = text || '';
            }
        }
    }

    showPopover(event) {
        if (this.multi) {
            this.uiService.showMultiSelect(
                event,
                this.arrText,
                typeof this.selectedPos == 'number' ? [this.selectedPos] : this.selectedPos,
                (selectedValue, selectedText, allSelected) => {
                    this.onSubmit.emit({ selectedValue, selectedText, allSelected });
                },
                this.addAll,
                this.allSelected
            );
        } else {
            this.uiService.showSelect(
                event,
                this.arrText,
                typeof this.selectedPos == 'number' ? this.selectedPos : 0,
                (selectedValue, selectedText) => {
                    this.onSubmit.emit({ selectedValue, selectedText });
                },
            );
        }
    }

}
