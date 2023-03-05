import {Booking} from "./Booking";
import {Extra} from "./helper";

export class PremiumBookingDelegate {
    constructor(private hostBooking: Booking, private extra: Extra) {
    }
}
