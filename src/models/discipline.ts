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

    calculateCost() {
        let disciplineCost = this.calculateDisciplineCost(this.level);;
        let specialitiesCost = 0;

        for (let specialitie of this.specialities) {
            specialitiesCost += specialitie.calculateCost();
        }

        return disciplineCost + specialitiesCost;
    }

    private calculateDisciplineCost(level:number) {
        if (level === 0) {
            return 0;
        }
        
        return (level * 7) + this.calculateDisciplineCost(level - 1);
    }
}