import {Booking} from "./Booking";
import {Extra, Show} from "./helper";
import {PremiumBooking} from "./PremiumBooking";

export const createBooking =
    (show: Show, date: Date): Booking =>
        new Booking(show, date);
export const createPremiumBooking =
    (show: Show, date: Date, extra: Extra): PremiumBooking => {
        const booking = new PremiumBooking(show, date, extra);
        booking.bePremium(extra);
        return booking;
    }
