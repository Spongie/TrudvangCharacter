import { Skill } from "./skill";
import { CharacterStats } from "./stats";
import { SkillGenerator } from "./skillGenerator";
import { Specialization } from "./Specialization";
import { Fighting } from "./disicplines/fighting";
import { SkillWithModifier } from "./disicplines/SkillWithModifier";
import { PsycheSpecialization } from "./specialities/psycheSpecialization";
import { Weapon } from "./weapon";
import { Armore } from "./armor";
import { Item } from "./item";

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
    agility: SkillWithModifier;
    care: Skill;
    entertainment: SkillWithModifier;
    knowledge: SkillWithModifier;
    vitnerCraft: SkillWithModifier;
    shadowArts: Skill;
    fighting: Fighting;
    faith: SkillWithModifier;
    wilderness: Skill;
    availableXp: number;
    usedXp: number;
    stats: CharacterStats;
    baseXp: number;

    readonly freeKnowledgeSkillsCost: number;
    readonly freeWildernessSkillsCost: number;

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

    maximumBodyPoints: number;
    naturalHealing: number;
    currentBodyPoints: number;
    currentFear: number;
    raud: number;
    movement: number;
    persistance: number;
    initiative: number;

    weapons: Array<Weapon>
    armors: Array<Armore>
    items: Array<Item>

    constructor() {
        let skillGenerator = new SkillGenerator();
        this.freeKnowledgeSkillsCost = 56;
        this.freeWildernessSkillsCost = 14;
        this.agility = skillGenerator.generateAgilityTree(this);
        this.care = skillGenerator.generateCareTree(this);
        this.entertainment = skillGenerator.genereateEntertainmentTree(this);
        this.knowledge = skillGenerator.generateKnowledgeTree(this);
        this.vitnerCraft = skillGenerator.generateVitnerCraftTree(this);
        this.shadowArts = skillGenerator.generateShadowArtsTree(this);
        this.fighting = skillGenerator.generateFightingTree(this);
        this.faith = skillGenerator.genereateFaithTree(this);
        this.wilderness = skillGenerator.generateWildernessTree(this);
        this.baseXp = 350;

        this.availableXp = 0;
        this.usedXp = 0;

        this.stats = new CharacterStats(0,0,0,0,0,0,0);
        this.weapons = new Array<Weapon>();
        this.armors = new Array<Armore>();
        this.items = new Array<Item>();
        
        this.recalculateSkills();
        this.recalculateAvailableXp();
        this.recalculateCombatPoints();
        this.recalculateBodyAndFear();
    }

    addItem() {
        this.items.push(new Item());
    }

    addWeapon() {
        this.weapons.push(new Weapon());
    }

    addArmor() {
        this.armors.push(new Armore());
    }

    recalculateBodyAndFear() {
        this.naturalHealing = 1 * this.stats.constitution > 0 ? this.stats.constitution : 1;
        this.maximumBodyPoints = this.stats.strength + this.stats.constitution + this.getRaceBaseBodyPoints();
        this.currentBodyPoints = this.maximumBodyPoints;
        this.currentFear = 0;
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

        this.availableXp -= this.agility.calculateTotalCostWithModifier(this.stats.dexterity);
        this.availableXp -= this.care.calculateTotalCost();
        this.availableXp -= this.knowledge.calculateTotalCostWithModifier(this.stats.intelligence);
        this.availableXp -= this.wilderness.calculateTotalCost();
        this.availableXp -= this.shadowArts.calculateTotalCost();
        this.availableXp -= this.vitnerCraft.calculateTotalCostWithModifier(this.stats.intelligence);
        this.availableXp -= this.faith.calculateTotalCostWithModifier(this.stats.intelligence);
        this.availableXp -= this.fighting.calculateTotalCost();
        this.availableXp -= this.entertainment.calculateTotalCostWithModifier(this.stats.charisma);

        this.availableXp += this.freeKnowledgeSkillsCost + (this.stats.intelligence * 5);
        this.availableXp += this.freeWildernessSkillsCost;

        this.recalculateCombatPoints();
        this.recalculateBodyAndFear();
        this.calculateInitiative();

        this.movement = 10 + this.stats.dexterity;
        this.persistance = 10 + this.stats.psyche;
    }

    calculateInitiative() {
        let battleExperience = this.fighting.getBattleExperience();

        let combatReactions = battleExperience.specialities.find(speciality => {
            return speciality.name === "Combat reaction";
        });

        this.initiative = this.stats.dexterity + battleExperience.level + (combatReactions.level * 2);
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
        this.wilderness.updateSv();
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

    rollRaud() {
        let roll = Math.floor((Math.random() * 6) + 1) + this.stats.charisma;

        if (roll < 0) {
            roll = 0;
        }

        this.raud = roll;
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

            insight.specialities.push(new PsycheSpecialization('Terrain experience (' + value + ')', 0, 0, insight));
            insight.updateSv();
            input.value = '';
        }
    }

    private getRaceBaseBodyPoints() {
        switch (this.race){
            case 'Human':
                return 32;
            case 'Elf':
                return 30;
            case 'Dwarf (Buratja)':
                return 28;
            case 'Dwarf (Borjornikka)':
                return 30;
            case 'Half-troll':
                return 30;
            case 'Half-elf':
                return 30;
            case 'Dwarf-troll':
                return 34;
        }
    }
}