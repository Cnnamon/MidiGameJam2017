import { Component } from '@angular/core';
import { IUser } from "../../../models/user.model.js";
import { UserService } from "./user.service.js";

@Component({
  selector: 'app-login',
  templateUrl: `/src/app/account/forms/login.html`,
})
export class LoginComponent {

  public user: IUser = {} as IUser;

  constructor(private userService: UserService) { }

  public login() {
    console.log(this.user);
    console.log("login");
    this.userService.loginUser(this.user.email, this.user.password)
      .subscribe(
      response => console.log(response),
      error => console.log(error)
      );
  }

}