import {
    Bird,
    BirdData,
} from "./Bird";

export const createBird = (data: BirdData) => {
    return new Bird(data);
}
