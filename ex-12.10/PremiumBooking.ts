import {Extra, Show} from "./helper";
import {Booking} from "./Booking";

export class PremiumBooking extends Booking {
    constructor(protected show: Show, protected date: Date, private extra: Extra) {
        super(show, date);
    }

    public override get hasTalkBack() {
        return !!this.show.talkback;
    }

    public override get basePrice() {
        return Math.round(super.basePrice + this.extra.premiumFee);
    }

    public get hasDinner() {
        return !!this.extra.dinner && !this.isPeakDay;
    }
}
