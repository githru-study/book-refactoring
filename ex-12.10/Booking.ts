import {Show} from "./helper";
import {PremiumBookingDelegate} from "./PremiumBookingDelegate";

export const EXTRA_COAST = 1.15;
export class Booking {
    public isPeakDay: boolean = false;
    protected premiumDelegate: PremiumBookingDelegate;

    constructor(protected show: Show, protected date: Date) {
    }

    public getShow() {
        return this.show;
    }

    public get hasTalkBack() {
        return this.premiumDelegate
            ? this.premiumDelegate.hasTalkBack
            : !!this.show.talkback && !this.isPeakDay;
    }

    public get basePrice() {
        const base = this.isPeakDay ? Math.round(this.show.price * EXTRA_COAST) : this.show.price;
        return this.premiumDelegate?.getExtendedBasePrice(base) || base;
    }
}

