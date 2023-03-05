import {EuropeanSwallowDelegate} from "./EuropeanSwallowDelegate";

export type BirdData = {
    type: '새' | '유럽' | '아프리카' | '노르웨이';
    name: string;
    plumage: string;
}
export type AfricanSwallowData = BirdData & {
    numberOfCoconuts: number;
}
export type NorwegianBlueParrotData = BirdData & {
    voltage: number;
    isNailed: boolean;
}

export class Bird {
    public readonly name: string;
    public readonly _plumage: string;
    private speciesDelegate: any;

    constructor(data: BirdData) {
        this.name = data.name;
        this._plumage = data.plumage;
        this.speciesDelegate = this.selectSpeciesDelegate(data)
    }

    private selectSpeciesDelegate(data: BirdData) {
        switch (data.type) {
            case '유럽':
                return new EuropeanSwallowDelegate();
            default: return null;
        }
    }

    get plumage() {
        return this._plumage || '보통';
    }

    get airSpeedVelocity() { return this.speciesDelegate?.airSpeedVelocity || null; }
}

export class EuropeanSwallow extends Bird {
    get airSpeedVelocity() { return 3; }
}

export class AfricanSwallow extends Bird {
    public readonly numberOfCoconuts: number;

    constructor(data: AfricanSwallowData) {
        super(data);
        this.numberOfCoconuts = data.numberOfCoconuts;
    }

    get airSpeedVelocity() {
        return 40 - 2 * this.numberOfCoconuts;
    }
}

export class NorwegianBlueParrot extends Bird {

    public readonly voltage: number;
    public readonly isNailed: boolean;

    constructor(data) {
        super(data);
        this.voltage = data.voltage;
        this.isNailed = data.isNailed;
    }

    get plumage() {
        if (this.voltage > 100) return 'd';
        else return this._plumage || 'e';
    }
    get airSpeedVelocity() {
        return (this.isNailed) ? 0 : 10 + this.voltage / 10;
    }
}
