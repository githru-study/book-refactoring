import {Booking} from "./Booking";
import {Dinner, Extra, Show, TalkBack} from "./helper";
import {PremiumBooking} from "./PremiumBooking";

describe('예약', () => {
    let show: Show;
    let date: Date;
    let extra: Extra;

    beforeEach(() => {
        show = new Show();
        show.talkback = new TalkBack();
        show.price = 1000;

        date = new Date();

        extra = new Extra();
        extra.premiumFee = 500
        extra.dinner = new Dinner();
    })

    describe('일반 예약 클라이언트', () => {
        let booking: Booking;

        beforeEach(() => {
            booking = new Booking(show, date);
        })

        test('피크데이', () =>{
            booking.isPeakDay = true;

            expect(booking.basePrice).toBe(1150);
            expect(booking.hasTalkBack).toBe(false);
        })

        test('피크 아닌 날 ', () =>{
            booking.isPeakDay = false;

            expect(booking.basePrice).toBe(1000);
            expect(booking.hasTalkBack).toBe(true);
        })
    })

    describe('프리미엄 예약 클라이언트', () => {
        let premiumBooking: PremiumBooking;

        beforeEach(() => {
            premiumBooking = new PremiumBooking(show, date, extra);
        })

        test('피크데이', () =>{
            premiumBooking.isPeakDay = true;

            expect(premiumBooking.basePrice).toBe(1650);
            expect(premiumBooking.hasTalkBack).toBe(true);
            expect(premiumBooking.hasDinner).toBe(false);
        })

        test('피크 아닌 날 ', () =>{
            premiumBooking.isPeakDay = false;

            expect(premiumBooking.basePrice).toBe(1500);
            expect(premiumBooking.hasTalkBack).toBe(true);
            expect(premiumBooking.hasDinner).toBe(true);
        })
    })
})
