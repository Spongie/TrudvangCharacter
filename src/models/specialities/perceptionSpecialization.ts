import { Specialization } from "../specialization";

export class PerceptionSpecialization extends Specialization {

    calculateCost(modifier: number) {
        return super.calculateCost(this.parent.parent.owner.stats.perception);
    }
}