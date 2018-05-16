import { Component, OnInit, Input } from '@angular/core';
import { TrudvangCharacter } from '../../../models/TrudvangCharacter';
import { UserService } from '../../../services/userService';
import { CharacterService } from '../../../services/characterService';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-general-tab',
  templateUrl: './general-tab.component.html',
  styleUrls: ['./general-tab.component.css']
})
export class GeneralTabComponent implements OnInit {

  @Input() model: TrudvangCharacter;
  @Input() canUpdate: boolean;
  
  constructor(private userService: UserService, private characterService: CharacterService, private modalService: NgbModal) { 

  }

  ngOnInit() {
  }

  onSubmit() {
    this.model.updateSkillOwners(null);
    this.characterService.updateCharacter(this.model);
    this.model.updateSkillOwners(this.model);
  }

  open(content) {
    this.modalService.open(content).result.then(
      result => {
        console.log(result);
      },
      reason => {
        //Dismissed
      }
    );
  }

  onSubmitModal(form) {
    this.model.extraXp += form.value.inputAddExp;
    this.model.recalculateAvailableXp();
  }
}
