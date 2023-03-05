import {Show} from "./helper";

export const EXTRA_COAST = 1.15;
export class Booking {
    public isPeakDay: boolean = false;

    constructor(protected show: Show, protected date: Date) {
    }

    public get hasTalkBack() {
        return !!this.show.talkback && !this.isPeakDay;
    }

    public get basePrice() {
        return this.isPeakDay ? Math.round(this.show.price * EXTRA_COAST) : this.show.price;
    }
}

