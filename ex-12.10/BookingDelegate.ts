import {Booking, EXTRA_COAST} from "./Booking";

export class BookingDelegate {
    constructor(protected hostBooking: Booking) {
    }

    public get hasTalkBack() {
        return !!this.hostBooking.getShow().talkback && !this.hostBooking.isPeakDay;
    }

    public get basePrice() {
        return this.hostBooking.isPeakDay
            ? Math.round(this.hostBooking.getShow().price * EXTRA_COAST)
            : this.hostBooking.getShow().price;
    }

    public get hasDinner() {
        return false;
    }
}
