export class Skill {

    constructor(public name: string, public lvl: number, public disciplines: Array<Discipline>) {

    }

    updateSv() {
        this.disciplines.forEach((disipline) => {
            disipline.updateSv();
        });
    }
}

export class SkillGenerator {
    public generateBaseSkills() {
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

        let faith = new Skill('Faith', 1, []);
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

        let fighting = new Skill('Fighting', 1, []);
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

        let vitnerCraft = new Skill('Vitner craft', 1, []);

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

        let wilderness = new Skill('Wilderness', 1, []);

        wilderness.disciplines = [
            new Discipline('Geography', 0, 0, wilderness, []),
            new Discipline('Hunting experience', 0, 0, wilderness, []),
            new Discipline('Nature knowledge', 0, 0, wilderness, []),
            new Discipline('Seafarer', 0, 0, wilderness, []),
            new Discipline('Survival', 0, 0, wilderness, [])
        ];

        wilderness.disciplines[0].specialities = [
            new Specialization('City knowledge', 0, 0, wilderness.disciplines[0]),
            new Specialization('Land knowledge', 0, 0, wilderness.disciplines[0]),
            new Specialization('Sea knowledge', 0, 0, wilderness.disciplines[0]),
            new Specialization('Orienteering & cartography', 0, 0, wilderness.disciplines[0])
        ];

        wilderness.disciplines[1].specialities = [
            new Specialization('Carve & butcher', 0, 0, wilderness.disciplines[1]),
            new Specialization('Hunting & fishing', 0, 0, wilderness.disciplines[1]),
            new Specialization('Species hunter', 0, 0, wilderness.disciplines[1]),
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
            new Specialization('Weathered', 0, 0, wilderness.disciplines[4]),
            new Specialization('Terrain experience (mountains)', 0, 0, wilderness.disciplines[4]),
            new Specialization('Terrain experience (forest)', 0, 0, wilderness.disciplines[4]),
            new Specialization('Terrain experience (sea)', 0, 0, wilderness.disciplines[4]),
            new Specialization('Terrain experience (snow & cold)', 0, 0, wilderness.disciplines[4]),
            new Specialization('Terrain experience (plains)', 0, 0, wilderness.disciplines[4])
        ];

        let knowledge = new Skill('Knowledge', 1, []);
        
        knowledge.disciplines = [
            new Discipline('Race knowledge', 0, 0, knowledge, []),
            new Discipline('Culture knowledge', 0, 0, knowledge, []),
            new Discipline('Language', 0, 0, knowledge, []),
            new Discipline('Learning', 0, 0, knowledge, [])
        ];

        knowledge.disciplines[0].specialities = [
            new Specialization('Monster lore', 0, 0, knowledge.disciplines[0]),
            new Specialization('Spirit lore', 0, 0, knowledge.disciplines[0])
        ];

        knowledge.disciplines[1].specialities = [
            new Specialization('Customs & law (Stormlanders)', 0, 0, knowledge.disciplines[1]),
            new Specialization('Customs & law (Mittlanders)', 0, 0, knowledge.disciplines[1]),
            new Specialization('Customs & law (Viranns)', 0, 0, knowledge.disciplines[1]),
            new Specialization('Customs & law (Wildfolk)', 0, 0, knowledge.disciplines[1]),
            new Specialization('Customs & law (Dwarves)', 0, 0, knowledge.disciplines[1]),
            new Specialization('Customs & law (Elves)', 0, 0, knowledge.disciplines[1]),
            new Specialization('Lore & legends (Stormlanders)', 0, 0, knowledge.disciplines[1]),
            new Specialization('Lore & legends (Mittlanders)', 0, 0, knowledge.disciplines[1]),
            new Specialization('Lore & legends (Viranns)', 0, 0, knowledge.disciplines[1]),
            new Specialization('Lore & legends (Wildfolk)', 0, 0, knowledge.disciplines[1]),
            new Specialization('Lore & legends (Dwarves)', 0, 0, knowledge.disciplines[1]),
            new Specialization('Lore & legends (Elves)', 0, 0, knowledge.disciplines[1]),
            new Specialization('Religion (Stormlanders)', 0, 0, knowledge.disciplines[1]),
            new Specialization('Religion (Mittlanders)', 0, 0, knowledge.disciplines[1]),
            new Specialization('Religion (Viranns)', 0, 0, knowledge.disciplines[1]),
            new Specialization('Religion (Wildfolk)', 0, 0, knowledge.disciplines[1]),
            new Specialization('Religion (Dwarves)', 0, 0, knowledge.disciplines[1]),
            new Specialization('Religion (Elves)', 0, 0, knowledge.disciplines[1])
        ];

        knowledge.disciplines[2].specialities = [
            new Specialization('Bribery', 0, 0, knowledge.disciplines[2]),
            new Specialization('Calculate', 0, 0, knowledge.disciplines[2]),
            new Specialization('Mother tongue', 0, 0, knowledge.disciplines[2]),
            new Specialization('Silver tongue', 0, 0, knowledge.disciplines[2]),
            new Specialization('Foreign tongue (Eika)', 0, 0, knowledge.disciplines[2]),
            new Specialization('Foreign tongue (Futhark)', 0, 0, knowledge.disciplines[2]),
            new Specialization('Foreign tongue (Rona)', 0, 0, knowledge.disciplines[2]),
            new Specialization('Foreign tongue (Vrok)', 0, 0, knowledge.disciplines[2]),
            new Specialization('Foreign tongue (Estiatic)', 0, 0, knowledge.disciplines[2]),
            new Specialization('Foreign tongue (Wild vrok)', 0, 0, knowledge.disciplines[2]),
            new Specialization('Foreign tongue (Thronelandic)', 0, 0, knowledge.disciplines[2]),
            new Specialization('Foreign tongue (Bastjumal)', 0, 0, knowledge.disciplines[2]),
            new Specialization('Foreign tongue (Ancient vrok)', 0, 0, knowledge.disciplines[2]),
            new Specialization('Foreign tongue (Forneika)', 0, 0, knowledge.disciplines[2]),
            new Specialization('Foreign tongue (Ancient rona)', 0, 0, knowledge.disciplines[2]),
            new Specialization('Foreign tongue (Dragerthian)', 0, 0, knowledge.disciplines[2]),
            new Specialization('Reading & writing (Eika)', 0, 0, knowledge.disciplines[2]),
            new Specialization('Reading & writing (Futhark)', 0, 0, knowledge.disciplines[2]),
            new Specialization('Reading & writing (Rona)', 0, 0, knowledge.disciplines[2]),
            new Specialization('Reading & writing (Vrok)', 0, 0, knowledge.disciplines[2]),
            new Specialization('Reading & writing (Estiatic)', 0, 0, knowledge.disciplines[2]),
            new Specialization('Reading & writing (Wild vrok)', 0, 0, knowledge.disciplines[2]),
            new Specialization('Reading & writing (Thronelandic)', 0, 0, knowledge.disciplines[2]),
            new Specialization('Reading & writing (Bastjumal)', 0, 0, knowledge.disciplines[2]),
            new Specialization('Reading & writing (Ancient vrok)', 0, 0, knowledge.disciplines[2]),
            new Specialization('Reading & writing (Forneika)', 0, 0, knowledge.disciplines[2]),
            new Specialization('Reading & writing (Ancient rona)', 0, 0, knowledge.disciplines[2]),
            new Specialization('Reading & writing (Dragerthian)', 0, 0, knowledge.disciplines[2])
        ];

        knowledge.disciplines[3].specialities = [
            new Specialization('Insight', 0, 0, knowledge.disciplines[3])
        ];
    }
}

export class Discipline {
    constructor(public name: string, public lvl: number, public sv: number, public parent: Skill, public specialities: Array<Specialization>) {
    }

    public updateSv() {
        this.sv = this.parent.lvl + this.lvl;
        this.specialities.forEach((specialitie) => {
            specialitie.updateSv();
        });
    }
}

export class Specialization {
    constructor(public name: string, public lvl: number, public sv: number, public parent: Discipline) {
    }

    public updateSv() {
        this.sv = this.parent.lvl + (this.lvl * 2);
    }
}