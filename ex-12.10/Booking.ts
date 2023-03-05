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
        return this.premiumDelegate?.basePrice || this.getPrivateBasePrice();
    }

    // 위임 클래스가 사용하기 위해 public으로 열어줘야 함.. 그런데 다른 클라이언트들은 이 메서드를 쓰면 안됨
    public getPrivateBasePrice() {
        return this.isPeakDay ? Math.round(this.show.price * EXTRA_COAST) : this.show.price;
    }
}

