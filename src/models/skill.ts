import { CharacterStats } from "./stats";
import { Discipline } from "./discipline";

export class Skill {

    costTable: Array<number>;

    constructor(public name: string, public level: number, public disciplines: Array<Discipline>) {
        this.costTable = [7, 14, 21, 28, 35];
    }

    updateSv() {
        this.disciplines.forEach((disipline) => {
            disipline.updateSv();
        });
    }

    calculateTotalCost(stats: CharacterStats) {
        let skillCost = this.calculateSkillCost(this.level);
        let disciplineCost = 0;

        for(let discipline of this.disciplines) {
            disciplineCost += discipline.calculateCost();
        }

        return skillCost + disciplineCost;
    }

    private calculateSkillCost(level:number) {
        if (level === 1) {
            return 0;
        }
        
        return level + this.calculateSkillCost(level - 1);
    }
}