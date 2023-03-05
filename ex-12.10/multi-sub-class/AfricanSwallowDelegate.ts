import {BirdDelegate} from "./BirdDelegate";
import {AfricanSwallowData} from "./Type";

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
