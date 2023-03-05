import {Show} from "./helper";

export class Booking {
    constructor(protected show: Show, protected date: Date) {
    }

    public get hasTalkBack() {
        return !!this.show.talkback && !this.isPeakDay;
    }

    public get basePrice() {
        return this.isPeakDay ? Math.round(this.show.price * 1.15) : this.show.price;
    }

    public get isPeakDay() {
        return false;
    }
}

