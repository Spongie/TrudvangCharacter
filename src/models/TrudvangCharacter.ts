import { Skill } from "./skills";

export class TrudvangCharacter {
    name: string;    
    race: string;
    culture: string;
    religion: string;
    gender: string;
    height: number;
    weight: number;
    weaponHand: string;
    background: string;
    skills: Array<Skill>
    
    constructor() {
    }
}