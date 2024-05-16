import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {LoginHttpService} from "../../services/auth/LoginHttpService";
import {LoginDTO} from "./LoginDTO";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private applicationToken = 'applicationToken';
  constructor(
    private router: Router,
    private loginHttpService: LoginHttpService
  ) {}

  public login(loginDTO:LoginDTO): void {
    this.loginHttpService.login(loginDTO).subscribe((responseModel) => {
      localStorage.setItem(this.applicationToken, responseModel.token);
      this.router.navigate(['/']);
    });
  }

}
