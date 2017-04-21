import { Component } from '@angular/core';
import { IUser } from "../../../models/user.model.js";
import { UserService } from "./user.service.js";

@Component({
  selector: 'app-register',
  templateUrl: `/src/app/account/forms/register.html`,
})
export class RegisterComponent {
  public user: IUser = {} as IUser;
  public errorMessage: string;

  constructor(private userService: UserService) { }

  public register() {
    console.log("register");
    this.userService.registerUser(this.user)
      .subscribe(
      user => console.log(user),
      error => console.log(error)
      );
  }

}
