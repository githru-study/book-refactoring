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
