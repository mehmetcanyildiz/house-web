import {Routes} from '@angular/router';

import {AppSideLoginComponent} from './login/login.component';
import {AppSideRegisterComponent} from './register/register.component';
import {AppSideForgotComponent} from "./forgot/forgot.component";
import {GuestGuard} from "../../guards";
import {AppSideActivateComponent} from "./activate/activate.component";

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AppSideLoginComponent,
        canActivate: [GuestGuard],
      },
      {
        path: 'register',
        component: AppSideRegisterComponent,
        canActivate: [GuestGuard],
      },
      {
        path: 'forgot-password',
        component: AppSideForgotComponent,
        canActivate: [GuestGuard],
      },
      {
        path: 'activate-account',
        component: AppSideActivateComponent,
        canActivate: [GuestGuard],
      },
    ],
  },
];
