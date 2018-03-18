import { Skill } from "./skill";
import { CharacterStats } from "./stats";
import { SkillGenerator } from "./skillGenerator";
import { Specialization } from "./Specialization";
import { Fighting } from "./disicplines/fighting";

export class TrudvangCharacter {
    name: string;    
    race: string;
    culture: string;
    religion: string;
    gender: string;
    height: number;
    weight: number;
    weaponHand: string;
    background: string;
    agility: Skill;
    care: Skill;
    entertainment: Skill;
    knowledge: Skill;
    vitnerCraft: Skill;
    shadowArts: Skill;
    fighting: Fighting;
    faith: Skill;
    wilderness: Skill;
    availableXp: number;
    usedXp: number;
    stats: CharacterStats;
    baseXp: number;
    readonly freeSkillsCost: number;

    freeCombatPoints: number;
    attackParriesPoints: number;
    combatActionsPoints: number;

    unarmedPoints: number;
    brawlingPoints: number;
    wrestlingPoints: number;

    armedPoints: number;
    bowsSlingsPoints: number;
    crossbowPoints: number;
    lightWeaponPoints: number;
    heavyWeaponPoints: number;
    shieldBearerPoints: number;
    throwingWeaponPoints: number;
    twoHandedPoints: number;

    constructor() {
        let skillGenerator = new SkillGenerator();
        this.freeSkillsCost = 56;
        this.agility = skillGenerator.generateAgilityTree();
        this.care = skillGenerator.generateCareTree();
        this.entertainment = skillGenerator.genereateEntertainmentTree();
        this.knowledge = skillGenerator.generateKnowledgeTree();
        this.vitnerCraft = skillGenerator.generateVitnerCraftTree();
        this.shadowArts = skillGenerator.generateShadowArtsTree();
        this.fighting = skillGenerator.generateFightingTree();
        this.faith = skillGenerator.genereateFaithTree();
        this.wilderness = skillGenerator.generateWildernessTree();
        this.baseXp = 350;

        this.availableXp = 0;
        this.usedXp = 0;

        this.stats = new CharacterStats(0,0,0,0,0,0,0);
        
        this.recalculateSkills();
        this.recalculateAvailableXp();
        this.recalculateCombatPoints();
    }

    recalculateAvailableXp() {
        this.availableXp = this.baseXp;
        this.availableXp += -15 * this.stats.charisma;
        this.availableXp += -15 * this.stats.constitution;
        this.availableXp += -15 * this.stats.dexterity;
        this.availableXp += -15 * this.stats.intelligence;
        this.availableXp += -15 * this.stats.perception;
        this.availableXp += -15 * this.stats.psyche;
        this.availableXp += -15 * this.stats.strength;

        this.availableXp -= this.agility.calculateTotalCost(this.stats);
        this.availableXp -= this.care.calculateTotalCost(this.stats);
        this.availableXp -= this.knowledge.calculateTotalCost(this.stats);
        this.availableXp -= this.wilderness.calculateTotalCost(this.stats);
        this.availableXp -= this.shadowArts.calculateTotalCost(this.stats);
        this.availableXp -= this.vitnerCraft.calculateTotalCost(this.stats);
        this.availableXp -= this.faith.calculateTotalCost(this.stats);
        this.availableXp -= this.fighting.calculateTotalCost(this.stats);
        this.availableXp -= this.entertainment.calculateTotalCost(this.stats);
        this.availableXp += this.freeSkillsCost;

        this.recalculateCombatPoints();
    }

    recalculateSkills() {
        this.agility.updateSv();
        this.care.updateSv();
        this.entertainment.updateSv();
        this.knowledge.updateSv();
        this.faith.updateSv();
        this.fighting.updateSv();
        this.vitnerCraft.updateSv();
        this.shadowArts.updateSv();
        this.recalculateAvailableXp();
    }

    recalculateCombatPoints() {
        this.freeCombatPoints = this.fighting.calculateFreeCombatPoints();
        this.attackParriesPoints = this.fighting.calculateAttackParries();
        this.combatActionsPoints = this.fighting.calculateCombatActions();
        this.unarmedPoints = this.fighting.calculateUnarmedFighting();
        this.brawlingPoints = this.fighting.calculateBrawling();
        this.wrestlingPoints = this.fighting.calculateWrestling();
        this.armedPoints = this.fighting.calculateArmedFighting();
        this.bowsSlingsPoints = this.fighting.calculateBowsAndSlings();
        this.crossbowPoints = this.fighting.calculateCrossbow();
        this.lightWeaponPoints = this.fighting.calculateLightWeapons();
        this.heavyWeaponPoints = this.fighting.calculateHeavyWeapons();
        this.shieldBearerPoints = this.fighting.calculateShieldBearer();
        this.throwingWeaponPoints = this.fighting.calculateThrowingWeapons();
        this.twoHandedPoints = this.fighting.calculateTwoHanded();
    }

    isValueValid(value) {
        return value.trim() !== '';
    }

    addForeignTongue() {
        let input = (<HTMLInputElement>document.getElementById('inputForeignTongue'));
        let value = input.value;

        if (this.isValueValid(value)) {
            let language = this.knowledge.disciplines.find((discipline) => {
                return discipline.name === 'Language';
            });

            language.specialities.push(new Specialization('Foreign tongue (' + value + ')', 0, 0, language));
            language.updateSv();
            input.value = '';
        }
    }

    addMotherTongue() {
        let input = (<HTMLInputElement>document.getElementById('inputMotherTongue'));
        let value = input.value;

        if (this.isValueValid(value)) {
            let language = this.knowledge.disciplines.find((discipline) => {
                return discipline.name === 'Language';
            });

            language.specialities.push(new Specialization('Mother tongue (' + value + ')', 0, 0, language));
            language.updateSv();
            input.value = '';
        }
    }

    addReadingWriting() {
        let input = (<HTMLInputElement>document.getElementById('inputReadingWriting'));
        let value = input.value;

        if (this.isValueValid(value)) {
            let language = this.knowledge.disciplines.find((discipline) => {
                return discipline.name === 'Language';
            });

            language.specialities.push(new Specialization('Reading & writing (' + value + ')', 0, 0, language));
            language.updateSv();
            input.value = '';
        }
    }

    addCustomsLaw() {
        let input = (<HTMLInputElement>document.getElementById('inputCustomsLaw'));
        let value = input.value;

        if (this.isValueValid(value)) {
            let cultureKnowledge = this.knowledge.disciplines.find((discipline) => {
                return discipline.name === 'Culture knowledge';
            });

            cultureKnowledge.specialities.push(new Specialization('Customs & law (' + value + ')', 0, 0, cultureKnowledge));
            cultureKnowledge.updateSv();
            input.value = '';
        }
    }

    addLoreLegends() {
        let input = (<HTMLInputElement>document.getElementById('inputLoreLegends'));
        let value = input.value;

        if (this.isValueValid(value)) {
            let cultureKnowledge = this.knowledge.disciplines.find((discipline) => {
                return discipline.name === 'Culture knowledge';
            });

            cultureKnowledge.specialities.push(new Specialization('Lore & legends (' + value + ')', 0, 0, cultureKnowledge));
            cultureKnowledge.updateSv();
            input.value = '';
        }
    }

    addReligion() {
        let input = (<HTMLInputElement>document.getElementById('inputReligion'));
        let value = input.value;

        if (this.isValueValid(value)) {
            let cultureKnowledge = this.knowledge.disciplines.find((discipline) => {
                return discipline.name === 'Culture knowledge';
            });

            cultureKnowledge.specialities.push(new Specialization('Religion (' + value + ')', 0, 0, cultureKnowledge));
            cultureKnowledge.updateSv();
            input.value = '';
        }
    }

    addInsight() {
        let input = (<HTMLInputElement>document.getElementById('inputInsight'));
        let value = input.value;

        if (this.isValueValid(value)) {
            let insight = this.knowledge.disciplines.find((discipline) => {
                return discipline.name === 'Learning';
            });

            insight.specialities.push(new Specialization('Insight (' + value + ')', 0, 0, insight));
            insight.updateSv();
            input.value = '';
        }
    }

    addCityKnowledge() {
        let input = (<HTMLInputElement>document.getElementById('inputCityKnowledge'));
        let value = input.value;

        if (this.isValueValid(value)) {
            let insight = this.wilderness.disciplines.find((discipline) => {
                return discipline.name === 'Geography';
            });

            insight.specialities.push(new Specialization('City knowledge (' + value + ')', 0, 0, insight));
            insight.updateSv();
            input.value = '';
        }
    }

    addLandKnowledge() {
        let input= (<HTMLInputElement>document.getElementById('inputLandKnowledge'));
        let value = input.value;

        if (this.isValueValid(value)) {
            let insight = this.wilderness.disciplines.find((discipline) => {
                return discipline.name === 'Geography';
            });

            insight.specialities.push(new Specialization('Land knowledge (' + value + ')', 0, 0, insight));
            insight.updateSv();
            input.value = '';
        }
    }

    addSeaKnowledge() {
        let input = (<HTMLInputElement>document.getElementById('inputSeaKnowledge'));
        let value = input.value;

        if (this.isValueValid(value)) {
            let insight = this.wilderness.disciplines.find((discipline) => {
                return discipline.name === 'Geography';
            });

            insight.specialities.push(new Specialization('Sea knowledge (' + value + ')', 0, 0, insight));
            insight.updateSv();
            input.value = '';
        }
    }

    addSpeciesHunterKnowledge() {
        let input = (<HTMLInputElement>document.getElementById('inputSpeciesHunterKnowledge'));
        let value = input.value;

        if (this.isValueValid(value)) {
            let insight = this.wilderness.disciplines.find((discipline) => {
                return discipline.name === 'Hunting experience';
            });

            insight.specialities.push(new Specialization('Species hunter (' + value + ')', 0, 0, insight));
            insight.updateSv();
            input.value = '';
        }
    }

    addTerrainExperience() {
        let input = (<HTMLInputElement>document.getElementById('inputTerrainExperienceKnowledge'));
        let value = input.value;

        if (this.isValueValid(value)) {
            let insight = this.wilderness.disciplines.find((discipline) => {
                return discipline.name === 'Survival';
            });

            insight.specialities.push(new Specialization('Terrain experience (' + value + ')', 0, 0, insight));
            insight.updateSv();
            input.value = '';
        }
    }
}