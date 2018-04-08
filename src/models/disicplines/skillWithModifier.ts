import { Skill } from "../skill";
import { Discipline } from "../discipline";
import { TrudvangCharacter } from "../TrudvangCharacter";

export class SkillWithModifier extends Skill {

    constructor(player: TrudvangCharacter, name: string, level: number, disciplines: Array<Discipline>) {
        super(player, name, level, disciplines);
    }

    calculateTotalCostWithModifier(intellect: number) {
        this.modifier = intellect;
        return this.calculateTotalCost();
    }

}