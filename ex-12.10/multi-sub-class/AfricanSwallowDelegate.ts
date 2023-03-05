import {AfricanSwallowData} from "./Bird";
import {BirdDelegate} from "./BirdDelegate";

export class AfricanSwallowDelegate extends BirdDelegate{
    private readonly numberOfCoconuts: number;

    constructor({numberOfCoconuts}: AfricanSwallowData) {
        super();
        this.numberOfCoconuts = numberOfCoconuts;
    }

    get airSpeedVelocity() {
        return 40 - 2 * this.numberOfCoconuts;
    }
}
