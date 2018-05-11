import { Specialization } from "./specialization";
import { Skill } from "./skill";

export class Discipline {
    constructor(public name: string, public level: number, public sv: number, public parent: Skill, public specialities: Array<Specialization>) {
    }

    public updateParent(parent) {
        this.parent = parent;
        this.specialities.forEach((specialitie) => {
            if (parent === null) {
                specialitie.updateParent(parent);
            } else {
                specialitie.updateParent(this);
            }
        });
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
        
        return (level * 7) + (-modifier) + this.calculateDisciplineCost(level - 1, modifier);
    }
}