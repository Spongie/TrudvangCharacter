import { CharacterStats } from "./stats";
import { Discipline } from "./discipline";
import { TrudvangCharacter } from "./TrudvangCharacter";

export class Skill {

    costTable: Array<number>;
    public modifier: number;

    constructor(public owner: TrudvangCharacter, public name: string, public level: number, public disciplines: Array<Discipline>) {
        this.costTable = [7, 14, 21, 28, 35];
        this.modifier = 0;
    }

    updateSv() {
        this.disciplines.forEach((disipline) => {
            disipline.updateSv();
        });
    }

    calculateTotalCost() {
        let skillCost = this.calculateSkillCost(this.level);
        let disciplineCost = 0;

        for(let discipline of this.disciplines) {
            disciplineCost += discipline.calculateCost(this.modifier);
        }

        return skillCost + disciplineCost;
    }

    protected calculateSkillCost(level:number) {
        if (level === 1) {
            return 0;
        }
        
        return level + this.calculateSkillCost(level - 1);
    }
}