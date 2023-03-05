import {
    Bird,
    BirdData,
    NorwegianBlueParrot,
    NorwegianBlueParrotData
} from "./Bird";

export const createBird = (data: BirdData) => {
    switch (data.type) {
        case "노르웨이":
            return new NorwegianBlueParrot(data as NorwegianBlueParrotData);
        default:
            return new Bird(data);
    }
}
