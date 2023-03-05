import {Booking} from "./Booking";
import {Extra} from "./helper";
import {BookingDelegate} from "./BookingDelegate";

export class PremiumBookingDelegate extends BookingDelegate{
    constructor(protected hostBooking: Booking, private extra: Extra) {
        super(hostBooking);
    }

    public get hasTalkBack() {
        return !!this.hostBooking.getShow().talkback;
    }

    public get basePrice() {
        return Math.round(super.basePrice + this.extra.premiumFee);
    }

    public get hasDinner() {
        return !!this.extra.dinner && !this.hostBooking.isPeakDay;
    }
}
