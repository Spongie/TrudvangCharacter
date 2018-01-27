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

    addForeignTongue() {
        let value = (<HTMLInputElement>document.getElementById('inputForeignTongue')).value;

        if (value.trim() !== '') {
            let language = this.knowledge.disciplines.find((discipline) => {
                return discipline.name === 'Language';
            });

            language.specialities.push(new Specialization(value, 0, 0, language));
            language.updateSv();
        }
    }

    addCultureKnowledge() {
        let value = (<HTMLInputElement>document.getElementById('inputCultureKnowledge')).value;

        if (value.trim() !== '') {
            let cultureKnowledge = this.knowledge.disciplines.find((discipline) => {
                return discipline.name === 'Culture knowledge';
            });

            cultureKnowledge.specialities.push(new Specialization(value, 0, 0, cultureKnowledge));
            cultureKnowledge.updateSv();
        }
    }
}