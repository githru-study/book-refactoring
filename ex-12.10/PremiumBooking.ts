import {Extra, Show} from "./helper";
import {Booking} from "./Booking";
import {PremiumBookingDelegate} from "./PremiumBookingDelegate";

export class PremiumBooking extends Booking {
    constructor(protected show: Show, protected date: Date, private extra: Extra) {
        super(show, date);
    }


}

