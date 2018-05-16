import { Component, OnInit } from "@angular/core";
import { TrudvangCharacter } from "../../models/TrudvangCharacter";
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
  canUpdate: boolean;

  constructor(
    private userService: UserService,
    private _router: Router,
    private characterService: CharacterService,
    private route: ActivatedRoute

  ) {
    this.model = new TrudvangCharacter();
  }

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.characterService.getCharacter(params["id"]).then(data => {
        let tempCharacter = data as TrudvangCharacter;
        this.model.copyFrom(tempCharacter);
        this.canUpdate = this.model.ownerId === this.userService.User._id;
      });
    });

    if (!this.userService.isAuthenticated()) {
      this._router.navigate(["login"]);
    }
  }
}
