import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../models";
import {BehaviorSubject} from 'rxjs';
import {LoginDTO} from "../../dto/authentication/LoginDTO";
import {Router} from "@angular/router";
import {RegisterDTO} from "../../dto/authentication/RegisterDTO";
import {CustomSnackBar} from "../snackbar.service";
import {ActivateDTO} from "../../dto/authentication/ActivateDTO";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public userSubject: BehaviorSubject<User | null>;

  constructor(private http: HttpClient, private router: Router, private snackBar: CustomSnackBar) {
    this.userSubject = new BehaviorSubject<User | null>(null);
  }

  public get userValue(): User | null {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
  }

  login(loginDTO: LoginDTO) {
    const url: string = `${environment.apiUrl}/auth/login`;
    return this.http.post(url, loginDTO).subscribe((res: any) => {
      const user: User = {
        uid: res.uid,
        email: res.email,
        firstname: res.firstName,
        lastname: res.lastName,
        access_token: res.accessToken
      };
      this.userSubject.next(user);
      localStorage.setItem('user', JSON.stringify(user));
      this.snackBar.route(res.message, '/');
    });
  }

  register(registerDTO: RegisterDTO) {
    const url: string = `${environment.apiUrl}/auth/register`;
    return this.http.post(url, registerDTO).subscribe((res: any) => {
      this.snackBar.route(res.message, '/auth/login');
    });
  }

  logout() {
    const url: string = `${environment.apiUrl}/auth/logout`;
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      body: {
        token: this.userValue?.access_token
      }
    }
    this.http.delete<any>(url, options).subscribe(
      (res: any) => {
        this.userSubject.next(null);
        localStorage.removeItem('user');
        this.snackBar.route(res.message, '/auth/login');
      }
    );
  }

  activateAccount(activateDTO: ActivateDTO) {
    const url: string = `${environment.apiUrl}/auth/activate-account`;
    return this.http.post(url, activateDTO).subscribe((res: any) => {
      this.snackBar.route(res.message, '/auth/login');
    });
  }
}
