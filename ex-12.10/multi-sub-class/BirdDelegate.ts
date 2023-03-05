import {BirdData} from "./Bird";

export abstract class BirdDelegate {
    abstract get airSpeedVelocity();
    get plumage() {
        return null
    }
}
