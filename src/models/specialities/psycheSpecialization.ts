import { Specialization } from "../specialization";

export class PsycheSpecialization extends Specialization {

    calculateCost(modifier: number) {
        return super.calculateCost(this.parent.parent.owner.stats.psyche);
    }
}