import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../models";
import {BehaviorSubject} from 'rxjs';
import {LoginDTO} from "../../dto/authentication/LoginDTO";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public userSubject: BehaviorSubject<User | null>;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User | null>(null);
  }

  public get userValue(): User | null {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
  }

  logIn(loginDTO: LoginDTO) {
    const url: string = `${environment.apiUrl}/auth/login`;
    const body: any = {email: loginDTO.email, password: loginDTO.password};

    return this.http.post(url, body).subscribe((res: any) => {

      const user: User = {
        uid: res.uid,
        email: res.email,
        firstname: res.firstName,
        lastname: res.lastName,
        access_token: res.accessToken
      };

      this.userSubject.next(user);

      localStorage.setItem('user', JSON.stringify(user));

      this.router.navigate(['/']);
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
        this.router.navigate(['/auth/login']);
      }
    );

  }
}
