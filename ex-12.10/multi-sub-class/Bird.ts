import {EuropeanSwallowDelegate} from "./EuropeanSwallowDelegate";
import {AfricanSwallowDelegate} from "./AfricanSwallowDelegate";
import {BirdDelegate} from "./BirdDelegate";
import {NorwegianBlueParrotDelegate} from "./NorwegianBlueParrotDelegate";
import {AfricanSwallowData, BirdData, NorwegianBlueParrotData} from "./Type";

export class Bird {
    public readonly name: string;
    public readonly _plumage: string;
    private speciesDelegate: BirdDelegate;

    constructor(data: BirdData) {
        this.name = data.name;
        this._plumage = data.plumage;
        this.speciesDelegate = this.selectSpeciesDelegate(data)
    }

    private selectSpeciesDelegate(data: BirdData) {
        switch (data.type) {
            case '유럽':
                return new EuropeanSwallowDelegate();
            case '아프리카':
                return new AfricanSwallowDelegate(data as AfricanSwallowData);
            case '노르웨이':
                return new NorwegianBlueParrotDelegate(data as NorwegianBlueParrotData, this);
            default: return null;
        }
    }

    get plumage() {
        return this.speciesDelegate?.plumage || this._plumage || '보통';
    }

    get airSpeedVelocity() { return this.speciesDelegate?.airSpeedVelocity ?? null; }
}
