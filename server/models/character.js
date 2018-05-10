var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let skillSchema = new Schema({

});

let characterSchema = new Schema({
    name: String,    
    race: String,
    culture: String,
    religion: String,
    gender: String,
    height: Number,
    weight: Number,
    weaponHand: String,
    background: String,
    agility: Object,
    care: Object,
    entertainment: Object,
    knowledge: Object,
    vitnerCraft: Object,
    shadowArts: Object,
    fighting: Object,
    faith: Object,
    wilderness: Object, 
    availableXp: Number,
    usedXp: Number,
    stats: Object,
    baseXp: Number,
    freeCombatPoints: Number,
    attackParriesPoints: Number,
    combatActionsPoints: Number,
    unarmedPoints: Number,
    brawlingPoints: Number,
    wrestlingPoints: Number,
    armedPoints: Number,
    bowsSlingsPoints: Number,
    crossbowPoints: Number,
    lightWeaponPoints: Number,
    heavyWeaponPoints: Number,
    shieldBearerPoints: Number,
    throwingWeaponPoints: Number,
    twoHandedPoints: Number,
    maximumBodyPoints: Number,
    naturalHealing: Number,
    currentBodyPoints: Number,
    currentFear: Number,
    raud: Number,
    movement: Number,
    persistance: Number,
    initiative: Number,
    weapons: Object,
    armors: Object,
    items: Object,
    ownerId: String,
    extraXp: Number,
    fearResist: Number,
    maxVitnerPoints: Number,
    currentVitnerPoints: Number,
    maxHolyPoints: Number,
    currentHolyPoints: Number,
    sharedWith: [String]
});

let Character = mongoose.model('Character', characterSchema);

module.exports = Character;