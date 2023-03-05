import {
    Bird,

} from "./Bird";
import {BirdData} from "./Type";

export const createBird = (data: BirdData) => {
    return new Bird(data);
}
