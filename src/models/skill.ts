import { CharacterStats } from "./stats";
import { Discipline } from "./discipline";
import { TrudvangCharacter } from "./TrudvangCharacter";

export class Skill {

    public modifier: number;

    constructor(public owner: TrudvangCharacter, public name: string, public level: number, public disciplines: Array<Discipline>) {
        this.modifier = 0;
    }

    public copyFrom(other : Skill) {
        Object.assign(this, other);
    }

    setOwner(owner) {
        this.owner = owner;
        this.disciplines.forEach((disipline) => {
            if (owner === null) {
                disipline.updateParent(owner);
            } else {
                disipline.updateParent(this);
            }
        });
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