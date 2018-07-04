import { Animation, PageTransition } from 'ionic-angular';

export class ModalAlertEnter extends PageTransition {
    public init() {
        super.init();
        const ele = this.enteringView.pageRef().nativeElement;

        const backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
        backdrop.beforeStyles({ 'z-index': 0, 'opacity': 0.5, 'visibility': 'visible' });

        const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
        wrapper.beforeStyles({ 'opacity': 1 });
        wrapper.fromTo('transform', 'scale(0.9)', 'scale(1.1)').fromTo('transform', 'scale(1.1)', 'scale(1)');


        this.element(this.enteringView.pageRef())
            .duration(300)
            .easing('cubic-bezier(.25, .1, .25, 1)')
            .add(backdrop)
            .add(wrapper);
    }
}


export class ModalAlertLeave extends PageTransition {
    public init() {
        super.init();
    }
}
