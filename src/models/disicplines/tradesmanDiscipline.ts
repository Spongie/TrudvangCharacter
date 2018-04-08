import { Discipline } from "../discipline";
import { TrudvangCharacter } from "../TrudvangCharacter";
import { Skill } from "../skill";
import { Specialization } from "../Specialization";

export class TradesmanDiscipline extends Discipline {
    
    constructor(public level: number, public sv: number, public parent: Skill, public specialities: Array<Specialization>) {
        super('Tradesman', level, sv, parent, specialities);
    }

    calculateCost(modifier: number) {
        return super.calculateCost(this.parent.owner.stats.charisma);
    }
}