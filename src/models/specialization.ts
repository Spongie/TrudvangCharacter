import { Discipline } from "./discipline";

export class Specialization {
    constructor(public name: string, public level: number, public sv: number, public parent: Discipline) {
    }

    public updateSv() {
        this.sv = this.parent.sv + (this.level * 2);
    }

    calculateCost() {
        return this.calculateSpecializationCost(this.level);
    }

    private calculateSpecializationCost(level:number) {
        if (level === 0) {
            return 0;
        }
        
        return (level * 7) + this.calculateSpecializationCost(level - 1);
    }
}