import { Skill } from "../skill";
import { Discipline } from "../discipline";

export class SkillWithModifier extends Skill {

    constructor(name: string, level: number, disciplines: Array<Discipline>) {
        super(name, level, disciplines);
    }

    calculateTotalCostWithModifier(intellect: number) {
        this.modifier = intellect;
        return this.calculateTotalCost();
    }

}