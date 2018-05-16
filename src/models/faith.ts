import { Skill } from "./skill";
import { TrudvangCharacter } from "./TrudvangCharacter";
import { Discipline } from "./discipline";
import { SkillWithModifier } from "./disicplines/skillWithModifier";

export class Faith extends SkillWithModifier {
  maxHolyPoints: number;
  currentBruid: number;
  currentGavlian: number;
  currentIhana: number;
  currentNoaj: number;
  currentStormkelt: number;
  currentThuulforging: number;

  constructor(
    public owner: TrudvangCharacter,
    public name: string,
    public level: number,
    public disciplines: Array<Discipline>
  ) {
    super(owner, name, level, disciplines);
    this.modifier = 0;
  }

  calculateDivinePower(extraCasting: number, extraPower: number) {
    this.maxHolyPoints = this.level;
    let divinePower = this.disciplines.find(discipline => {
      return discipline.name === "Divine power";
    });

    this.maxHolyPoints += divinePower.level * 3;

    this.maxHolyPoints +=
      divinePower.specialities.find(speciality => {
        return speciality.name === "Faithful";
      }).level * 7;

    this.maxHolyPoints +=
      divinePower.specialities.find(speciality => {
        return speciality.name === "Powerful";
      }).level * 7;

    this.maxHolyPoints += extraPower;

    let invoke = this.disciplines.find(disc => {
      return disc.name === "Invoke";
    });

    this.currentBruid =
      invoke.specialities.find(spec => {
        return spec.name === "Bruid";
      }).sv + extraCasting;
    this.currentGavlian =
      invoke.specialities.find(spec => {
        return spec.name === "Gavlian";
      }).sv + extraCasting;
    this.currentIhana =
      invoke.specialities.find(spec => {
        return spec.name === "Ihana";
      }).sv + extraCasting;
    this.currentNoaj =
      invoke.specialities.find(spec => {
        return spec.name === "Noaj";
      }).sv + extraCasting;
    this.currentStormkelt =
      invoke.specialities.find(spec => {
        return spec.name === "Stormkelt";
      }).sv + extraCasting;
    this.currentThuulforging =
      invoke.specialities.find(spec => {
        return spec.name === "Thuul forging";
      }).sv + extraCasting;
  }
}
