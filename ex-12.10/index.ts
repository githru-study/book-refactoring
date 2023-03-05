class Show {
    public price: number;
    public talkback: TalkBack;
}

class Extra {
    public premiumFee: number;
    public dinner: Dinner;
}

class Dinner {

}

class TalkBack {

}

class Booking {
    constructor(protected show: Show, protected date: Date) {
    }

    public get hasTalkBack() {
        return !!this.show.talkback && !this.isPeakDay;
    }

    public get basePrice() {
        return this.isPeakDay ? Math.round(this.show.price * 1.15) : this.show.price;
    }

    public get isPeakDay() {
        return false;
    }
}

class PremiumBooking extends Booking {
    constructor(protected show: Show, protected date: Date, private extra: Extra) {
        super(show, date);
    }

    public override get hasTalkBack() {
        return !!this.show.talkback;
    }

    public override get basePrice() {
        return Math.round(super.basePrice + this.extra.premiumFee);
    }

    public get hasDinner() {
        return !!this.extra.dinner && !this.isPeakDay;
    }
}
