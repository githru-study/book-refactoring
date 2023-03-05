import {Booking} from "./Booking";
import {Extra} from "./helper";

export class PremiumBookingDelegate {
    constructor(private hostBooking: Booking, private extra: Extra) {
    }

    public get hasTalkBack() {
        return !!this.hostBooking.getShow().talkback;
    }

    public getExtendedBasePrice(base: number) {
        return Math.round(base + this.extra.premiumFee);
    }
}
