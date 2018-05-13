import { Skill } from "./skill";
import { CharacterStats } from "./stats";
import { SkillGenerator } from "./skillGenerator";
import { Specialization } from "./specialization";
import { Fighting } from "./disicplines/fighting";
import { SkillWithModifier } from "./disicplines/skillWithModifier";
import { PsycheSpecialization } from "./specialities/psycheSpecialization";
import { Weapon } from "./weapon";
import { Armore } from "./armor";
import { Item } from "./item";
import { User } from "./user";

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

    fearResist: number;
    maximumBodyPoints: number;
    naturalHealing: number;
    currentBodyPoints: number;
    currentFear: number;
    raud: number;
    movement: number;
    persistance: number;
    initiative: number;
    currentFearModifier: string;

    weapons: Array<Weapon>;
    armors: Array<Armore>;
    items: Array<Item>;
    ownerId: String;

    lightlyInjured: number;
    injured: number;
    seriouslyInjured: number;
    criticallyInjured: number;
    currentInjury: string;

    maxVitnerPoints: number;
    currentVitnerPoints: number;
    maxHolyPoints: number;
    currentHolyPoints: number;
    sharedWith: Array<string>;

    constructor() {
        this.name = 'New character'

        this.freeKnowledgeSkillsCost = 56;
        this.freeWildernessSkillsCost = 14;
        this.currentFear = 0;
        this.stats = new CharacterStats(0,0,0,0,0,0,0);
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
        Object.assign(this, character);

        this.stats = new CharacterStats(character.stats.charisma, character.stats.constitution, character.stats.dexterity, character.stats.intelligence,
            character.stats.perception, character.stats.psyche, character.stats.strength);
        this.init();

        character.weapons.forEach((weapon) => {
            if (weapon !== null) {
                this.weapons.push(weapon);
            }
        });

        character.armors.forEach((armor) => {
            if (armor !== null) {
                this.armors.push(armor);
            }            
        });

        character.items.forEach((item) => {
            if (item !== null) {
                this.items.push(item);
            }
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

    removeWeapon(weapon: Weapon) {
        let index = this.weapons.indexOf(weapon);
        if (index >= 0) {
            this.weapons.splice(index, 1);
        }
    }

    removeArmor(armor: Armore) {
        let index = this.armors.indexOf(armor);
        if (index >= 0) {
            this.armors.splice(index, 1);
        }
    }

    removeItem(item: Item) {
        let index = this.items.indexOf(item);
        if (index >= 0) {
            this.items.splice(index, 1);
        }
    }

    resetSkill(skill: Skill, newSkill: Skill) {
        skill.level = newSkill.level;
        skill.modifier = newSkill.modifier;

        newSkill.disciplines.forEach((newdiscipline) => {
            let oldDisc = skill.disciplines.find(disc => {
                return disc.name === newdiscipline.name;
            });
            oldDisc.level = newdiscipline.level;

            newdiscipline.specialities.forEach((newSpeciality) => {
                let oldSpec = oldDisc.specialities.find(disc => {
                    return disc.name === newSpeciality.name;
                });

                if (oldSpec !== undefined) {
                    oldSpec.level = newSpeciality.level;
                } else {
                    let speciality = new Specialization(newSpeciality.name, newSpeciality.level, newSpeciality.sv, oldDisc);
                    oldDisc.specialities.push(speciality);
                }
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

    private roundInjury(value: number, level: number) {
        let damageString = value.toString();

        if (damageString.endsWith('.25')) {
            if (level === 1) {
                return value + 0.75;
            } else {
                return value - 0.25;
            }
        } else if (damageString.endsWith('.5')) {
            if (level <= 2) {
                return value + 0.5;
            } else {
                return value - 0.5;
            }
        } else if (damageString.endsWith('.75')) {
            if (level <= 3) {
                return value + 0.25;
            } else {
                return value - 0.75;
            }
        }

        return value;
    }

    recalculateBodyAndFear() {
        this.naturalHealing = 1 + this.stats.constitution > 0 ? this.stats.constitution : 1;
        this.maximumBodyPoints = this.stats.strength + this.stats.constitution + this.getRaceBaseBodyPoints();
        this.fearResist = -this.stats.psyche;

        this.lightlyInjured = this.roundInjury(this.maximumBodyPoints / 4, 1);
        this.injured = this.roundInjury((this.maximumBodyPoints / 4) * 2, 2);
        this.seriouslyInjured = this.roundInjury((this.maximumBodyPoints / 4) * 3, 3);
        this.criticallyInjured = this.roundInjury((this.maximumBodyPoints / 4) * 4, 4);

        let damage = this.maximumBodyPoints - this.currentBodyPoints;

        if (damage === 0) {
            this.currentInjury = "Perfectly healthy";
        } else if (damage <= this.lightlyInjured) {
            this.currentInjury = "Lightly injured: 0";
        } else if (damage <= this.injured) {
            this.currentInjury = "Injured: -1";
        } else if (damage <= this.seriouslyInjured) {
            this.currentInjury = "Seriously injured: -3";
        } else if (damage <= this.criticallyInjured) {
            this.currentInjury = "Critically injured: -7";
        }

        if (this.currentFear <= 10) {
            this.currentFearModifier = "Not scared";
        } else if (this.currentFear <= 20) {
            this.currentFearModifier = "Slightly scared (-1 dice)";
        } else if (this.currentFear <= 30) {
            this.currentFearModifier = "Scared (-3 dice)";
        } else if (this.currentFear <= 40) {
            this.currentFearModifier = "You think you are dying scared (-5 dice)";
        } else {
            this.currentFearModifier = "Holy shit scared (-7 dice)";
        }
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

        totalXp -= this.freeKnowledgeSkillsCost - (this.stats.intelligence * 5);
        totalXp -= this.freeWildernessSkillsCost;

        this.usedXp = totalXp;
        this.availableXp -= this.usedXp;
        this.availableXp += this.extraXp;

        this.recalculateCombatPoints();
        this.recalculateBodyAndFear();
        this.calculateInitiative();

        this.movement = 10 + this.stats.dexterity;
        this.persistance = 10 + this.stats.psyche + this.wilderness.level;

        this.maxVitnerPoints = this.vitnerCraft.level;
        let callOfVitner = this.vitnerCraft.disciplines.find((discipline) => {
            return discipline.name === 'Call of vitner';
        });

        this.maxVitnerPoints += callOfVitner.level * 5;
        this.maxVitnerPoints += callOfVitner.specialities.find((speciality) => {
            return speciality.name === 'Hwitalja';
        }).level * 10;
        this.maxVitnerPoints += callOfVitner.specialities.find((speciality) => {
            return speciality.name === 'Darkhwitalja';
        }).level * 20;
        this.maxVitnerPoints += callOfVitner.specialities.find((speciality) => {
            return speciality.name === 'Vaagritalja';
        }).level * 15;
        this.maxVitnerPoints += callOfVitner.specialities.find((speciality) => {
            return speciality.name === 'Vitner habit';
        }).level * 10;

        this.maxHolyPoints = this.faith.level;
        let divinePower = this.faith.disciplines.find((discipline) => {
            return discipline.name === 'Divine power';
        });
        this.maxHolyPoints += divinePower.level * 3;

        this.maxHolyPoints += divinePower.specialities.find((speciality) => {
            return speciality.name === 'Faithful';
        }).level * 7;
        this.maxHolyPoints += divinePower.specialities.find((speciality) => {
            return speciality.name === 'Powerful';
        }).level * 7;
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

    startSharing(user: User) {
        this.sharedWith.push(user.userName);
    }

    stopSharing(user: User) {
        let index = this.sharedWith.indexOf(user.userName);
        this.sharedWith.splice(index, 1);
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
            let learning = this.knowledge.disciplines.find((discipline) => {
                return discipline.name === 'Learning';
            });

            learning.specialities.push(new Specialization('Insight (' + value + ')', 0, 0, learning));
            learning.updateSv();
            input.value = '';
        }
    }

    addCityKnowledge() {
        let input = (<HTMLInputElement>document.getElementById('inputCityKnowledge'));
        let value = input.value;

        if (this.isValueValid(value)) {
            let geography = this.wilderness.disciplines.find((discipline) => {
                return discipline.name === 'Geography';
            });

            geography.specialities.push(new Specialization('City knowledge (' + value + ')', 0, 0, geography));
            geography.updateSv();
            input.value = '';
        }
    }

    addLandKnowledge() {
        let input = (<HTMLInputElement>document.getElementById('inputLandKnowledge'));
        let value = input.value;

        if (this.isValueValid(value)) {
            let geography = this.wilderness.disciplines.find((discipline) => {
                return discipline.name === 'Geography';
            });

            geography.specialities.push(new Specialization('Land knowledge (' + value + ')', 0, 0, geography));
            geography.updateSv();
            input.value = '';
        }
    }

    addSeaKnowledge() {
        let input = (<HTMLInputElement>document.getElementById('inputSeaKnowledge'));
        let value = input.value;

        if (this.isValueValid(value)) {
            let geography = this.wilderness.disciplines.find((discipline) => {
                return discipline.name === 'Geography';
            });

            geography.specialities.push(new Specialization('Sea knowledge (' + value + ')', 0, 0, geography));
            geography.updateSv();
            input.value = '';
        }
    }

    addSpeciesHunterKnowledge() {
        let input = (<HTMLInputElement>document.getElementById('inputSpeciesHunterKnowledge'));
        let value = input.value;

        if (this.isValueValid(value)) {
            let huntingExperience = this.wilderness.disciplines.find((discipline) => {
                return discipline.name === 'Hunting experience';
            });

            huntingExperience.specialities.push(new Specialization('Species hunter (' + value + ')', 0, 0, huntingExperience));
            huntingExperience.updateSv();
            input.value = '';
        }
    }

    addTerrainExperience() {
        let input = (<HTMLInputElement>document.getElementById('inputTerrainExperienceKnowledge'));
        let value = input.value;

        if (this.isValueValid(value)) {
            let survival = this.wilderness.disciplines.find((discipline) => {
                return discipline.name === 'Survival';
            });

            survival.specialities.push(new PsycheSpecialization('Terrain experience (' + value + ')', 0, 0, survival));
            survival.updateSv();
            input.value = '';
        }
    }

    addVitnerTablet() {
        let input = (<HTMLInputElement>document.getElementById('inputNewVitnerTablet'));
        let value = input.value;

        if (this.isValueValid(value)) {
            let vitnerShaping = this.vitnerCraft.disciplines.find((discipline) => {
                return discipline.name === 'Vitner shaping';
            });

            vitnerShaping.specialities.push(new PsycheSpecialization('Vitner tablet (' + value + ')', 0, 0, vitnerShaping));
            vitnerShaping.updateSv();
            input.value = '';
        }
    }

    addHolyTablet() {
        let input = (<HTMLInputElement>document.getElementById('inputNewHolyTablet'));
        let value = input.value;

        if (this.isValueValid(value)) {
            let invoke = this.faith.disciplines.find((discipline) => {
                return discipline.name === 'Invoke';
            });

            invoke.specialities.push(new PsycheSpecialization('Holy tablet (' + value + ')', 0, 0, invoke));
            invoke.updateSv();
            input.value = '';
        }
    }

    private getRaceBaseBodyPoints() {
        switch (this.race) {
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