import {AfricanSwallowData} from "./Type";

export class AfricanSwallowDelegate {
    private readonly numberOfCoconuts: number;

    constructor({numberOfCoconuts}: AfricanSwallowData) {
        this.numberOfCoconuts = numberOfCoconuts;
    }

    get airSpeedVelocity() {
        return 40 - 2 * this.numberOfCoconuts;
    }
}
