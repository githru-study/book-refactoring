import {
    AfricanSwallow,
    AfricanSwallowData,
    Bird,
    BirdData,
    EuropeanSwallow,
    NorwegianBlueParrot,
    NorwegianBlueParrotData
} from "./Bird";

export const createBird = (data: BirdData) => {
    switch (data.type) {
        case "유럽":
            return new EuropeanSwallow(data);
        case "아프리카":
            return new AfricanSwallow(data as AfricanSwallowData);
        case "노르웨이":
            return new NorwegianBlueParrot(data as NorwegianBlueParrotData);
        default:
            return new Bird(data);
    }
}
