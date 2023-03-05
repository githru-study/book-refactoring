import {EuropeanSwallowDelegate} from "./EuropeanSwallowDelegate";
import {AfricanSwallowDelegate} from "./AfricanSwallowDelegate";
import {NorwegianBlueParrotDelegate} from "./NorwegianBlueParrotDelegate";
import {AfricanSwallowData, BirdData, NorwegianBlueParrotData} from "./Type";

export class Bird {
    public readonly name: string;
    public readonly _plumage: string;
    // 만약 이걸 any로 처리했다면?
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
            case '아프리카':
                return new AfricanSwallowDelegate(data as AfricanSwallowData);
            case '노르웨이':
                return new NorwegianBlueParrotDelegate(data as NorwegianBlueParrotData, this);
            default: return null;
        }
    }

    get plumage() {
        return this.speciesDelegate?.getPlumage() || this._plumage || '보통';
    }

    get airSpeedVelocity() { return this.speciesDelegate?.airSpeedVelocity ?? null; }
}
