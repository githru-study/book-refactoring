import {Bird} from "./Bird";
import {NorwegianBlueParrotData} from "./Type";

export class NorwegianBlueParrotDelegate {
    private readonly voltage: number;
    private readonly isNailed: boolean;

    constructor({voltage, isNailed, plumage}: NorwegianBlueParrotData, private readonly bird: Bird) {
        this.voltage = voltage;
        this.isNailed = isNailed;
    }

    public getPlumage() {
        if (this.voltage > 100) return 'd';
        else return this.bird._plumage || 'e';
    }

    get airSpeedVelocity() {
        return (this.isNailed) ? 0 : 10 + this.voltage / 10;
    }
}
