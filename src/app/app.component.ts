import {Component} from '@angular/core';
import {AuthenticationService} from "./services";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Apartment House Application';
  constructor(private _auth: AuthenticationService) {
    let user = localStorage.getItem('user')
    if (typeof user !== 'undefined' && user !== null && _auth.userValue == null) {
      _auth.userSubject.next(JSON.parse(user));
    }
  }
}
