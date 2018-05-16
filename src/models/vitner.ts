import { Skill } from "./skill";
import { TrudvangCharacter } from "./TrudvangCharacter";
import { Discipline } from "./discipline";
import { SkillWithModifier } from "./disicplines/skillWithModifier";

export class Vitner extends SkillWithModifier {
    
  maxVitnerPoints: number;
  currentSejding: number;
  currentGalding: number;
  currentVyrding: number;

  constructor(
    public owner: TrudvangCharacter,
    public name: string,
    public level: number,
    public disciplines: Array<Discipline>
  ) {
    super(owner, name, level, disciplines);
    this.modifier = 0;
  }

  calculateVitner(extraCasting: number, extraPower: number) {
    this.maxVitnerPoints = this.level;
    let callOfVitner = this.disciplines.find(discipline => {
      return discipline.name === "Call of vitner";
    });

    this.maxVitnerPoints += callOfVitner.level * 5;
    this.maxVitnerPoints += callOfVitner.specialities.find(speciality => {
        return speciality.name === "Hwitalja";
      }).level * 10;

    this.maxVitnerPoints +=
      callOfVitner.specialities.find(speciality => {
        return speciality.name === "Darkhwitalja";
      }).level * 20;

    this.maxVitnerPoints +=
      callOfVitner.specialities.find(speciality => {
        return speciality.name === "Vaagritalja";
      }).level * 15;

    this.maxVitnerPoints +=
      callOfVitner.specialities.find(speciality => {
        return speciality.name === "Vitner habit";
      }).level * 10;

    this.maxVitnerPoints += extraPower;

    let vitnerShaping = this.disciplines.find(disc => {
        return disc.name === "Vitner shaping";
      });

    this.currentGalding =
      vitnerShaping.specialities.find(spec => {
        return spec.name === "Galding";
      }).sv + extraCasting;

    this.currentSejding =
      vitnerShaping.specialities.find(spec => {
        return spec.name === "Sejding";
      }).sv + extraCasting;
    this.currentVyrding =
      vitnerShaping.specialities.find(spec => {
        return spec.name === "Vyrding";
      }).sv + extraCasting;
  }
}
