import { Discipline } from "./discipline";

export class Specialization {
    constructor(public name: string, public level: number, public sv: number, public parent: Discipline) {
    }

    updateParent(parent) {
        this.parent = parent;
    }

    public updateSv() {
        this.sv = this.parent.sv + (this.level * 2);
    }

    calculateCost(modifier: number) {
        return this.calculateSpecializationCost(this.level, modifier);
    }

    private calculateSpecializationCost(level:number, modifier: number) {
        if (level === 0) {
            return 0;
        }
        
        return (level * 7) + (-modifier) + this.calculateSpecializationCost(level - 1, modifier);
    }
}