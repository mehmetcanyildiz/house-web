import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authenticationService.userValue;
    if (!user) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
