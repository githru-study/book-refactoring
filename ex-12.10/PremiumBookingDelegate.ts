import {Booking} from "./Booking";
import {Extra} from "./helper";

export class PremiumBookingDelegate {
    constructor(private hostBooking: Booking, private extra: Extra) {
    }

    public get hasTalkBack() {
        return !!this.hostBooking.getShow().talkback;
    }

    public get basePrice() {
        return Math.round(this.hostBooking.getPrivateBasePrice() + this.extra.premiumFee);
    }
}
