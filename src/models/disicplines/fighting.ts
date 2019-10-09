import { Discipline } from "../discipline";
import { Skill } from "../skill";
import { TrudvangCharacter } from "../TrudvangCharacter";

export class Fighting extends Skill {

    constructor(public owner: TrudvangCharacter, name: string, level: number, disciplines: Array<Discipline>) {
        super(owner, name, level, disciplines);
    }

    readonly BattleExperience = 'Battle experience';
    readonly CombatActions = 'Combat actions';
    readonly ArmedFighting = 'Armed fighting';
    readonly UnArmedFighting = 'Unarmed fighting';
    readonly AttackParries = 'Fighter';
    readonly Brawling = 'Brawling';
    readonly Wrestling = 'Wrestling';
    readonly BowsAndSlings = 'Bows & slings';
    readonly Crossbow = 'Crossbow';
    readonly OneHandLightWeapon =  '1H light weapons';
    readonly OneHandHeavyWeapon ='1H heavy weapons';
    readonly ShieldBearer =   'Shield bearer';
    readonly ThrowingWeapons = 'Throwing weapons';
    readonly TwoHanded = '2H weapons';

    calculateFreeCombatPoints() {
        let points = this.level;
        return points + this.getBattleExperience().level;
    }

    calculateCombatActions() {
        let points = this.calculateFreeCombatPoints();
        return points + this.getCombatActions().level * 2;
    }

    calculateAttackParries() {
        let points = this.calculateFreeCombatPoints();
        return points + this.getAttackParries().level * 2;
    }

    calculateArmedFighting() {
        let points = this.calculateFreeCombatPoints() + this.getAttackParries().level * 2;
        return points + this.getArmedFighting().level;
    }

    calculateBowsAndSlings() {
        let points = this.calculateArmedFighting();
        return points + (this.getBowsAndSlings().level * 2 );
    }

    calculateCrossbow() {
        let points = this.calculateArmedFighting();
        return points + (this.getCrossbow().level * 2 );
    }

    calculateLightWeapons() {
        let points = this.calculateArmedFighting();
        return points + (this.getOneHandLightWeapon().level * 2 );
    }

    calculateHeavyWeapons() {
        let points = this.calculateArmedFighting();
        return points + (this.getOneHandHeavyWeapon().level * 2 );
    }

    calculateShieldBearer() {
        let points = this.calculateArmedFighting();
        return points + (this.getShieldBearer().level * 2 );
    }

    calculateThrowingWeapons() {
        let points = this.calculateArmedFighting();
        return points + (this.getThrowingWeapons().level * 2 );
    }

    calculateTwoHanded() {
        let points = this.calculateArmedFighting();
        return points + (this.getTwoHanded().level * 2 );
    }

    calculateBrawling() {
        let points = this.calculateUnarmedFighting() + this.getAttackParries().level * 2;
        return points + (this.getBrawling().level * 2 );
    }

    calculateUnarmedFighting() {
        let points = this.calculateFreeCombatPoints();
        return points + this.getUnArmedFighting().level;
    }

    calculateWrestling() {
        let points = this.calculateUnarmedFighting();
        return points + (this.getWrestling().level * 2 );
    }

    getBattleExperience() {
        return this.disciplines.find(discipline => {
            return discipline.name === this.BattleExperience;
        });
    }

    private getCombatActions() {
        return this.getBattleExperience().specialities.find(speciality => {
            return speciality.name === this.CombatActions;
        });
    }

    getArmedFighting() {
        return this.disciplines.find(discipline => {
            return discipline.name === this.ArmedFighting;
        });
    }
    
    private getUnArmedFighting() {
        return this.disciplines.find(discipline => {
            return discipline.name === this.UnArmedFighting;
        });
    }

    private getWrestling() {
        return this.getUnArmedFighting().specialities.find(speciality => {
            return speciality.name === this.Wrestling;
        });
    }

    private getBrawling() {
        return this.getUnArmedFighting().specialities.find(speciality => {
            return speciality.name === this.Brawling;
        });
    }

    private getAttackParries() {
        return this.getBattleExperience().specialities.find(speciality => {
            return speciality.name === this.AttackParries;
        });
    }

    private getBowsAndSlings() {
        return this.getArmedFighting().specialities.find(speciality => {
            return speciality.name === this.BowsAndSlings;
        });
    }

    private getCrossbow() {
        return this.getArmedFighting().specialities.find(speciality => {
            return speciality.name === this.Crossbow;
        });
    }

    private getOneHandHeavyWeapon() {
        return this.getArmedFighting().specialities.find(speciality => {
            return speciality.name === this.OneHandHeavyWeapon;
        });
    }

    private getOneHandLightWeapon() {
        return this.getArmedFighting().specialities.find(speciality => {
            return speciality.name === this.OneHandLightWeapon;
        });
    }

    private getShieldBearer() {
        return this.getArmedFighting().specialities.find(speciality => {
            return speciality.name === this.ShieldBearer;
        });
    }

    private getThrowingWeapons() {
        return this.getArmedFighting().specialities.find(speciality => {
            return speciality.name === this.ThrowingWeapons;
        });
    }

    private getTwoHanded() {
        return this.getArmedFighting().specialities.find(speciality => {
            return speciality.name === this.TwoHanded;
        });
    }
}