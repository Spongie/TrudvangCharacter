import { Component, OnInit } from "@angular/core";
import { TrudvangCharacter } from "../../models/TrudvangCharacter";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "../../services/userService";
import { Router, ActivatedRoute } from "@angular/router";
import { CharacterService } from "../../services/characterService";
import { User } from "../../models/user";

@Component({
  selector: "app-character",
  templateUrl: "./character.component.html",
  styleUrls: ["./character.component.css"]
})
export class CharacterComponent implements OnInit {
  model: TrudvangCharacter;
  searchedUsers: Array<User>;
  canUpdate: boolean;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private _router: Router,
    private CharacterService: CharacterService,
    private route: ActivatedRoute

  ) {
    this.model = new TrudvangCharacter();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.CharacterService.getCharacter(params["id"]).then(data => {
        let tempCharacter = data as TrudvangCharacter;
        this.model.copyFrom(tempCharacter);
        this.canUpdate = this.model.ownerId === this.userService.User._id;
      });
    });

    if (!this.userService.isAuthenticated()) {
      this._router.navigate(["login"]);
    }
  }

  onSubmit() {
    this.model.updateSkillOwners(null);
    this.CharacterService.updateCharacter(this.model);
    this.model.updateSkillOwners(this.model);
  }

  scrollToTop() {
    window.scrollTo(0, 0);
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

  async onSearch() {
    let input = <HTMLInputElement>document.getElementById("inputSearchUser");
    let user = new User();
    user.userName = input.value;
    let users = await this.userService.findUsers(user);
    this.searchedUsers = users;
  }
}
