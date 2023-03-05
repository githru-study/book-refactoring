import {Extra, Show} from "./helper";
import {PremiumBookingDelegate} from "./PremiumBookingDelegate";
import {BookingDelegate} from "./BookingDelegate";

export const EXTRA_COAST = 1.15;
export class Booking {
    public isPeakDay: boolean = false;
    protected bookingDelegate: BookingDelegate;

    constructor(protected show: Show, protected date: Date) {
        this.bookingDelegate = new BookingDelegate(this);
    }

    public getShow() {
        return this.show;
    }

    public get hasTalkBack() {
        return this.bookingDelegate?.hasTalkBack || false;
    }

    public get basePrice() {
        return this.bookingDelegate?.basePrice || this.show.price;
    }

    public get hasDinner() {
        return this.bookingDelegate?.hasDinner || false;
    }

    public bePremium(extra: Extra) {
        this.bookingDelegate = new PremiumBookingDelegate(this, extra);
    }

    public get isPremium() {
        return !!this.bookingDelegate && this.bookingDelegate instanceof PremiumBookingDelegate;
    }
}

