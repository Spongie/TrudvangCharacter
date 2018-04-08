import { Specialization } from "./Specialization";
import { Skill } from "./skill";

export class Discipline {
    constructor(public name: string, public level: number, public sv: number, public parent: Skill, public specialities: Array<Specialization>) {
    }

    public updateSv() {
        this.sv = this.parent.level + this.level;
        this.specialities.forEach((specialitie) => {
            specialitie.updateSv();
        });
    }

    calculateCost(modifier: number) {
        let disciplineCost = this.calculateDisciplineCost(this.level, modifier);
        let specialitiesCost = 0;

        for (let specialitie of this.specialities) {
            specialitiesCost += specialitie.calculateCost(modifier);
        }

        return disciplineCost + specialitiesCost;
    }

    private calculateDisciplineCost(level:number, modifier: number) {
        if (level === 0) {
            return 0;
        }
        
        return (level * 7) + modifier + this.calculateDisciplineCost(level - 1, modifier);
    }
}