import {Booking} from "./Booking";
import {Extra, Show} from "./helper";

export const createBooking =
    (show: Show, date: Date): Booking =>
        new Booking(show, date);
export const createPremiumBooking =
    (show: Show, date: Date, extra: Extra): Booking => {
        const booking = new Booking(show, date);
        booking.bePremium(extra);
        return booking;
    }
