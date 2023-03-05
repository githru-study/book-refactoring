import {
    AfricanSwallow,
    AfricanSwallowData,
    Bird,
    BirdData,
    NorwegianBlueParrot,
    NorwegianBlueParrotData
} from "./Bird";
import {createBird} from "./factory";

describe('새 테스트', () => {
    test('일반 새', () => {
        const data: BirdData = {
            type: '새',
            name: "새",
            plumage: 'a'
        }

        const bird = createBird(data);

        expect(bird).toBeInstanceOf(Bird);
        expect(bird.plumage).toBe('a')
        expect(bird.airSpeedVelocity).toBeNull();
    })
    test('유럽 새', () => {
        const data: BirdData = {
            type: '유럽',
            name: "새",
            plumage: 'a'
        }

        const bird = createBird(data);

        expect(bird).toBeInstanceOf(Bird);
        expect(bird.plumage).toBe('a')
        expect(bird.airSpeedVelocity).toBe(3);
    })
    test('아프리카 새', () => {
        const data: AfricanSwallowData = {
            type: '아프리카',
            name: "새",
            plumage: 'a',
            numberOfCoconuts: 3
        }

        const bird = createBird(data);

        expect(bird).toBeInstanceOf(AfricanSwallow);
        expect(bird.plumage).toBe('a')
        expect(bird.airSpeedVelocity).toBe(34);
    })
    test('노르웨이 새 under 100 voltage', () => {
        const data: NorwegianBlueParrotData = {
            type: '노르웨이',
            name: "새",
            plumage: 'a',
            voltage: 5,
            isNailed: true,
        }

        const bird = createBird(data);

        expect(bird).toBeInstanceOf(NorwegianBlueParrot);
        expect(bird.plumage).toBe('a')
        expect(bird.airSpeedVelocity).toBe(0);
    })
    test('노르웨이 새 nailed', () => {
        const data: NorwegianBlueParrotData = {
            type: '노르웨이',
            name: "새",
            plumage: 'a',
            voltage: 103,
            isNailed: true,
        }

        const bird = createBird(data);

        expect(bird).toBeInstanceOf(NorwegianBlueParrot);
        expect(bird.plumage).toBe('d')
        expect(bird.airSpeedVelocity).toBe(0);
    })
    test('노르웨이 새 not nailed', () => {
        const data: NorwegianBlueParrotData = {
            type: '노르웨이',
            name: "새",
            plumage: 'a',
            voltage: 103,
            isNailed: false,
        }

        const bird = createBird(data);

        expect(bird).toBeInstanceOf(NorwegianBlueParrot);
        expect(bird.plumage).toBe('d')
        expect(bird.airSpeedVelocity).toBe(20.3);
    })

})
