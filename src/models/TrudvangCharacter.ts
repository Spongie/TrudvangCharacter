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
    _id: string;
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
    extraXp: number;
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

    weapons: Array<Weapon>;
    armors: Array<Armore>;
    items: Array<Item>;
    ownerId: String;

    constructor() {
        this.name = 'New character'
        
        this.freeKnowledgeSkillsCost = 56;
        this.freeWildernessSkillsCost = 14;

        this.init();
    }

    private init() {
        let skillGenerator = new SkillGenerator();
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
    }

    doFullRecalc() {
        this.recalculateSkills();
        this.recalculateAvailableXp();
        this.recalculateCombatPoints();
        this.recalculateBodyAndFear();
        this.calculateInitiative();
    }

    copyFrom(character: TrudvangCharacter) {
        this.init();

        //do retard copy...
        this._id = character._id;
        this.name = character.name;
        this.race = character.race;
        this.culture = character.culture;
        this.religion = character.religion;
        this.gender = character.gender;
        this.height = character.height;
        this.weight = character.weight;
        this.weaponHand = character.weaponHand;
        this.background = character.background;

        this.stats.charisma = character.stats.charisma;
        this.stats.strength = character.stats.strength;
        this.stats.psyche = character.stats.psyche;
        this.stats.perception = character.stats.perception;
        this.stats.intelligence = character.stats.intelligence;
        this.stats.constitution = character.stats.constitution;
        this.stats.dexterity = character.stats.dexterity;

        this.raud = character.raud;
        this.extraXp = character.extraXp;
        this.usedXp = character.usedXp;

        character.weapons.forEach((weapon) => {
            this.weapons.push(weapon);
        });

        character.armors.forEach((armor) => {
            this.armors.push(armor);
        });

        character.items.forEach((item) => {
            this.items.push(item);
        });

        this.resetSkill(this.agility, character.agility);
        this.resetSkill(this.care, character.care);
        this.resetSkill(this.fighting, character.fighting);
        this.resetSkill(this.faith, character.faith);
        this.resetSkill(this.shadowArts, character.shadowArts);
        this.resetSkill(this.vitnerCraft, character.vitnerCraft);
        this.resetSkill(this.entertainment, character.entertainment);
        this.resetSkill(this.knowledge, character.knowledge);
        this.resetSkill(this.wilderness, character.wilderness);
        
        this.updateSkillOwners(this);
        this.doFullRecalc();
    }

    resetSkill(skill:Skill, newSkill:Skill) {
        skill.level = newSkill.level;
        skill.modifier = newSkill.modifier;

        skill.disciplines.forEach((discipline) => {
            let newDisc = newSkill.disciplines.find(disc => {
                return disc.name === discipline.name;
            });
            discipline.level = newDisc.level;

            discipline.specialities.forEach((speciality) => {
                let newSpec = newDisc.specialities.find(disc => {
                    return disc.name === speciality.name;
                });
                speciality.level = newSpec.level;
            });
        });
    }

    updateSkillOwners(owner) {
        this.agility.setOwner(owner);
        this.care.setOwner(owner);
        this.entertainment.setOwner(owner);
        this.knowledge.setOwner(owner);
        this.vitnerCraft.setOwner(owner);
        this.shadowArts.setOwner(owner);
        this.fighting.setOwner(owner);
        this.faith.setOwner(owner);
        this.wilderness.setOwner(owner);
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
        if (this.extraXp === undefined || this.extraXp === null) {
            this.extraXp = 0;
        }
        
        this.availableXp = this.baseXp;
        this.availableXp += -15 * this.stats.charisma;
        this.availableXp += -15 * this.stats.constitution;
        this.availableXp += -15 * this.stats.dexterity;
        this.availableXp += -15 * this.stats.intelligence;
        this.availableXp += -15 * this.stats.perception;
        this.availableXp += -15 * this.stats.psyche;
        this.availableXp += -15 * this.stats.strength;

        let totalXp = 0;
        totalXp += this.agility.calculateTotalCostWithModifier(this.stats.dexterity);
        totalXp += this.care.calculateTotalCost();
        totalXp += this.knowledge.calculateTotalCostWithModifier(this.stats.intelligence);
        totalXp += this.wilderness.calculateTotalCost();
        totalXp += this.shadowArts.calculateTotalCost();
        totalXp += this.vitnerCraft.calculateTotalCostWithModifier(this.stats.intelligence);
        totalXp += this.faith.calculateTotalCostWithModifier(this.stats.intelligence);
        totalXp += this.fighting.calculateTotalCost();
        totalXp += this.entertainment.calculateTotalCostWithModifier(this.stats.charisma);
        
        totalXp -= this.freeKnowledgeSkillsCost + (this.stats.intelligence * 5);
        totalXp -= this.freeWildernessSkillsCost;

        this.usedXp = totalXp;
        this.availableXp -= this.usedXp;
        this.availableXp += this.extraXp;

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