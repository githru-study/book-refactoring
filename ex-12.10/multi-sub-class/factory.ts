import {
    AfricanSwallow,
    AfricanSwallowData,
    Bird,
    BirdData,
    NorwegianBlueParrot,
    NorwegianBlueParrotData
} from "./Bird";

export const createBird = (data: BirdData) => {
    switch (data.type) {
        case "아프리카":
            return new AfricanSwallow(data as AfricanSwallowData);
        case "노르웨이":
            return new NorwegianBlueParrot(data as NorwegianBlueParrotData);
        default:
            return new Bird(data);
    }
}
