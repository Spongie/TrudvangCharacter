import { Skill } from "./skill";
import { Discipline } from "./discipline";
import { Specialization } from "./Specialization";
import { Fighting } from "./disicplines/fighting";
import { SkillWithModifier } from "./disicplines/SkillWithModifier";

export class SkillGenerator {

    public generateAgilityTree() {
        let agility = new Skill('Agility', 1, []);
        agility.disciplines = [
            new Discipline('Battle maneuver', 0, 0, agility, []),
            new Discipline('Body control', 0, 0, agility, []),
            new Discipline('Horsemanship', 0, 0, agility, [])
        ];

        agility.disciplines[0].specialities = [
            new Specialization('Combat movement', 0, 0, agility.disciplines[0]),
            new Specialization('Evade', 0, 0, agility.disciplines[0]),
            new Specialization('Ironclad', 0, 0, agility.disciplines[0])
        ];

        agility.disciplines[1].specialities = [
            new Specialization('Ambidexterity', 0, 0, agility.disciplines[1]),
            new Specialization('Jestering', 0, 0, agility.disciplines[1]),
            new Specialization('Jump, Climb & Bal.', 0, 0, agility.disciplines[1]),
            new Specialization('Swim', 0, 0, agility.disciplines[1])
        ];

        agility.disciplines[2].specialities = [
            new Specialization('Driving wagon', 0, 0, agility.disciplines[2]),
            new Specialization('Riding', 0, 0, agility.disciplines[2]),
        ];

        return agility;
    }

    public generateCareTree() {
        let care = new Skill('Care', 1, []);

        care.disciplines = [
            new Discipline('Handicraft', 0, 0, care, []),
            new Discipline('Handler', 0, 0, care, []),
            new Discipline('Healing & drugs', 0, 0, care, []),
            new Discipline('Tradesman', 0, 0, care, [])
        ];

        care.disciplines[0].specialities = [
            new Specialization('Counterfeiting', 0, 0, care.disciplines[0]),
            new Specialization('Hard materials', 0, 0, care.disciplines[0]),
            new Specialization('Soft materials', 0, 0, care.disciplines[0])
        ];

        care.disciplines[1].specialities = [
            new Specialization('Commander', 0, 0, care.disciplines[1]),
            new Specialization('Sage', 0, 0, care.disciplines[1])
        ];

        care.disciplines[2].specialities = [
            new Specialization('Extract & potions', 0, 0, care.disciplines[2]),
            new Specialization('First aid & nursing', 0, 0, care.disciplines[2]),
        ];

        care.disciplines[3].specialities = [
            new Specialization('Barber', 0, 0, care.disciplines[3]),
            new Specialization('Brewer', 0, 0, care.disciplines[3]),
            new Specialization('Cooking', 0, 0, care.disciplines[3]),
            new Specialization('Peasant', 0, 0, care.disciplines[3]),
            new Specialization('Trader', 0, 0, care.disciplines[3]),
        ];
        
        return care;
    }

    public genereateEntertainmentTree() {
        let entertainment = new Skill('Entertainment', 1, []);
        entertainment.disciplines = [
            new Discipline('Gambling', 0, 0, entertainment, []),
            new Discipline('Music & dancing', 0, 0, entertainment, []),
            new Discipline('Storytelling', 0, 0, entertainment, [])
        ];

        entertainment.disciplines[0].specialities = [
            new Specialization('Cheater', 0, 0, entertainment.disciplines[0]),
            new Specialization('Game strategist', 0, 0, entertainment.disciplines[0]),
            new Specialization('Great gambler', 0, 0, entertainment.disciplines[0])
        ];

        entertainment.disciplines[1].specialities = [
            new Specialization('Dance', 0, 0, entertainment.disciplines[1]),
            new Specialization('Singing & playing', 0, 0, entertainment.disciplines[1])
        ];

        entertainment.disciplines[2].specialities = [
            new Specialization('Libel', 0, 0, entertainment.disciplines[2]),
            new Specialization('Playwright', 0, 0, entertainment.disciplines[2])
        ];

        return entertainment;
    }

    public genereateFaithTree() {
        let faith = new SkillWithModifier('Faith', 1, []);

        faith.disciplines = [
            new Discipline('Divine power', 0, 0, faith, []),
            new Discipline('God focus', 0, 0, faith, []),
            new Discipline('Invoke', 0, 0, faith, [])
        ];

        faith.disciplines[0].specialities = [
            new Specialization('Faithful', 0, 0, faith.disciplines[0]),
            new Specialization('Powerful', 0, 0, faith.disciplines[0])
        ];

        faith.disciplines[1].specialities = [
            new Specialization('Composed', 0, 0, faith.disciplines[1]),
            new Specialization('Lighting-quick inv.', 0, 0, faith.disciplines[1]),
            new Specialization('Potent', 0, 0, faith.disciplines[1]),
            new Specialization('Rigorous', 0, 0, faith.disciplines[1])
        ];

        faith.disciplines[2].specialities = [
            new Specialization('Bruid', 0, 0, faith.disciplines[2]),
            new Specialization('Gavlian', 0, 0, faith.disciplines[2]),
            new Specialization('Ihana', 0, 0, faith.disciplines[2]),
            new Specialization('Noaj', 0, 0, faith.disciplines[2]),
            new Specialization('Stormkelt', 0, 0, faith.disciplines[2]),
            new Specialization('Thuul forging', 0, 0, faith.disciplines[2])
        ];

        

        return faith;
    }

    public generateFightingTree() {
        let fighting = new Fighting('Fighting', 1, []);
        fighting.disciplines = [
            new Discipline('Armed fighting', 0, 0, fighting, []),
            new Discipline('Battle experience', 0, 0, fighting, []),
            new Discipline('Unarmed fighting', 0, 0, fighting, [])
        ];

        fighting.disciplines[0].specialities = [
            new Specialization('Bows & slings', 0, 0, fighting.disciplines[0]),
            new Specialization('Crossbow', 0, 0, fighting.disciplines[0]),
            new Specialization('1H light weapons', 0, 0, fighting.disciplines[0]),
            new Specialization('1H heavy weapons', 0, 0, fighting.disciplines[0]),
            new Specialization('Shield bearer', 0, 0, fighting.disciplines[0]),
            new Specialization('Throwing weapons', 0, 0, fighting.disciplines[0]),
            new Specialization('2H weapons', 0, 0, fighting.disciplines[0])
        ];

        fighting.disciplines[1].specialities = [
            new Specialization('Armor bearer', 0, 0, fighting.disciplines[1]),
            new Specialization('Combat actions', 0, 0, fighting.disciplines[1]),
            new Specialization('Combat reaction', 0, 0, fighting.disciplines[1]),
            new Specialization('Crossbow loader', 0, 0, fighting.disciplines[1]),
            new Specialization('Fighter', 0, 0, fighting.disciplines[1])
        ];
        
        fighting.disciplines[2].specialities = [
            new Specialization('Brawling', 0, 0, fighting.disciplines[2]),
            new Specialization('Wrestling', 0, 0, fighting.disciplines[2])
        ];   

        return fighting;
    }

    public generateShadowArtsTree() {
        let shadowArts = new Skill('Shadow arts', 1, []);

        shadowArts.disciplines = [
            new Discipline('Shadowing', 0, 0, shadowArts, []),
            new Discipline('Thievery', 0, 0, shadowArts, [])
        ];

        shadowArts.disciplines[0].specialities = [
            new Specialization('Walking in shadows', 0, 0, shadowArts.disciplines[0]),
            new Specialization('Sneak attack', 0, 0, shadowArts.disciplines[0]),
            new Specialization('Finding & spotting', 0, 0, shadowArts.disciplines[0]),
            new Specialization('Camouflage & hiding', 0, 0, shadowArts.disciplines[0])
        ];

        shadowArts.disciplines[1].specialities = [
            new Specialization('Disguise', 0, 0, shadowArts.disciplines[1]),
            new Specialization('Locks & traps', 0, 0, shadowArts.disciplines[1]),
            new Specialization('Stealing', 0, 0, shadowArts.disciplines[1]),
            new Specialization('Shadow world', 0, 0, shadowArts.disciplines[1]),
            new Specialization('Theif signs', 0, 0, shadowArts.disciplines[1])
        ];

        return shadowArts;
    }

    public generateVitnerCraftTree() {
        let vitnerCraft = new SkillWithModifier('Vitner craft', 1, []);

        vitnerCraft.disciplines = [
            new Discipline('Call of vitner', 0, 0, vitnerCraft, []),
            new Discipline('Vitner focus', 0, 0, vitnerCraft, []),
            new Discipline('Vitner shaping', 0, 0, vitnerCraft, [])
        ];

        vitnerCraft.disciplines[0].specialities = [
            new Specialization('Hwitalja', 0, 0, vitnerCraft.disciplines[0]),
            new Specialization('Darkhwitalja', 0, 0, vitnerCraft.disciplines[0]),
            new Specialization('Vaagritalja', 0, 0, vitnerCraft.disciplines[0]),
            new Specialization('Vitner habit', 0, 0, vitnerCraft.disciplines[0])
        ];

        vitnerCraft.disciplines[1].specialities = [
            new Specialization('Vitner weavers', 0, 0, vitnerCraft.disciplines[1]),
            new Specialization('Safe-weaving', 0, 0, vitnerCraft.disciplines[1]),
            new Specialization('Potency', 0, 0, vitnerCraft.disciplines[1])
        ];

        vitnerCraft.disciplines[2].specialities = [
            new Specialization('Galding', 0, 0, vitnerCraft.disciplines[2]),
            new Specialization('Sejding', 0, 0, vitnerCraft.disciplines[2]),
            new Specialization('Vitner runes', 0, 0, vitnerCraft.disciplines[2]),
            new Specialization('Vyrding', 0, 0, vitnerCraft.disciplines[2])
        ];

        return vitnerCraft;
    }

    public generateWildernessTree() {
        let wilderness = new Skill('Wilderness', 1, []);

        wilderness.disciplines = [
            new Discipline('Geography', 1, 0, wilderness, []),
            new Discipline('Hunting experience', 0, 0, wilderness, []),
            new Discipline('Nature knowledge', 0, 0, wilderness, []),
            new Discipline('Seafarer', 0, 0, wilderness, []),
            new Discipline('Survival', 0, 0, wilderness, [])
        ];

        wilderness.disciplines[0].specialities = [
            new Specialization('Land knowledge', 1, 0, wilderness.disciplines[0]),
            new Specialization('Orienteering & cartography', 0, 0, wilderness.disciplines[0])
        ];

        wilderness.disciplines[1].specialities = [
            new Specialization('Carve & butcher', 0, 0, wilderness.disciplines[1]),
            new Specialization('Hunting & fishing', 0, 0, wilderness.disciplines[1]),
            new Specialization('Tracker', 0, 0, wilderness.disciplines[1]),
            new Specialization('Wilderness signs', 0, 0, wilderness.disciplines[1])
        ];

        wilderness.disciplines[2].specialities = [
            new Specialization('Animal friend', 0, 0, wilderness.disciplines[2]),
            new Specialization('Botany', 0, 0, wilderness.disciplines[2]),
            new Specialization('Weatherman', 0, 0, wilderness.disciplines[2]),
            new Specialization('Zoology', 0, 0, wilderness.disciplines[2])
        ];

        wilderness.disciplines[3].specialities = [
            new Specialization('Navigation', 0, 0, wilderness.disciplines[3]),
            new Specialization('Seaman', 0, 0, wilderness.disciplines[3])
        ];

        wilderness.disciplines[4].specialities = [
            new Specialization('Camper', 0, 0, wilderness.disciplines[4]),
            new Specialization('Pathwalker', 0, 0, wilderness.disciplines[4]),
            new Specialization('Weathered', 0, 0, wilderness.disciplines[4])
        ];

        return wilderness;
    }

    public generateKnowledgeTree() {
        let knowledge = new SkillWithModifier('Knowledge', 1, []);
        
        knowledge.disciplines = [
            new Discipline('Race knowledge', 0, 0, knowledge, []),
            new Discipline('Culture knowledge', 1, 0, knowledge, []),
            new Discipline('Language', 1, 0, knowledge, []),
            new Discipline('Learning', 0, 0, knowledge, [])
        ];

        knowledge.disciplines[0].specialities = [
            new Specialization('Monster lore', 0, 0, knowledge.disciplines[0]),
            new Specialization('Spirit lore', 0, 0, knowledge.disciplines[0])
        ];

        knowledge.disciplines[2].specialities = [
            new Specialization('Bribery', 0, 0, knowledge.disciplines[2]),
            new Specialization('Calculate', 0, 0, knowledge.disciplines[2]),
            new Specialization('Mother tongue', 3, 0, knowledge.disciplines[2]),
            new Specialization('Silver tongue', 0, 0, knowledge.disciplines[2])
        ];

        knowledge.disciplines[3].specialities = [
            new Specialization('Insight', 0, 0, knowledge.disciplines[3])
        ];

        return knowledge;
    }
}