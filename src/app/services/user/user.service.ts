import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomSnackBar} from "../snackbar.service";
import {environment} from "../../../environments/environment";
import {SettingsDTO} from "../../dto/user/SettingsDTO";
import {AuthenticationService} from "../authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private snackBar: CustomSnackBar
  ) {
  }

  updateSettings(formDTO: SettingsDTO) {
    const url: string = `${environment.apiUrl}/user/update`;
    let user = this.authService.userValue;
    return this.http.put(url, formDTO).subscribe((res: any) => {
      if (user) {
        user.firstname = formDTO.firstname;
        user.lastname = formDTO.lastname;
        user.phone = formDTO.phone;
        this.authService.userSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));
      }
      this.snackBar.message(res.message);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    });
  }
}
