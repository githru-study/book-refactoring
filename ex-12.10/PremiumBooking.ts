import {Extra, Show} from "./helper";
import {Booking} from "./Booking";
import {PremiumBookingDelegate} from "./PremiumBookingDelegate";

export class PremiumBooking extends Booking {
    constructor(protected show: Show, protected date: Date, private extra: Extra) {
        super(show, date);
    }

    public override get hasTalkBack() {
        return this.premiumDelegate.hasTalkBack;
    }

    public override get basePrice() {
        return this.premiumDelegate.basePrice;
    }

    public get hasDinner() {
        return !!this.extra.dinner && !this.isPeakDay;
    }

    public bePremium(extra: Extra) {
        this.premiumDelegate = new PremiumBookingDelegate(this, extra);
    }
}
