import { Skill, SkillGenerator, Specialization } from "./skills";

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
    fighting: Skill;
    faith: Skill;
    wilderness: Skill;
    availableXp: number;
    usedXp: number;

    constructor() {
        let skillGenerator = new SkillGenerator();
        this.agility = skillGenerator.generateAgilityTree();
        this.care = skillGenerator.generateCareTree();
        this.entertainment = skillGenerator.genereateEntertainmentTree();
        this.knowledge = skillGenerator.generateKnowledgeTree();
        this.vitnerCraft = skillGenerator.generateVitnerCraftTree();
        this.shadowArts = skillGenerator.generateShadowArtsTree();
        this.fighting = skillGenerator.generateFightingTree();
        this.faith = skillGenerator.genereateFaithTree();
        this.wilderness = skillGenerator.generateWildernessTree();
        
        this.availableXp = 0;
        this.usedXp = 0;
        
        this.recalculateSkills();
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