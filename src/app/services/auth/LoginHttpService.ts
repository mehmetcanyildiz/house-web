import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LoginDTO} from "../../dto/auth/LoginDTO";

@Injectable({
  providedIn: 'root',
})
export class LoginHttpService {
  constructor(private http: HttpClient) {
  }

  apiUrl = 'http://localhost:8090/api/auth';

  login(LoginDTO: LoginDTO): Observable<any> {
    return this.http.post(this.apiUrl + '/login', LoginDTO);
  }

}
