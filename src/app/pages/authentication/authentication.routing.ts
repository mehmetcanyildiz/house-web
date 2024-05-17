import {Routes} from '@angular/router';

import {AppSideLoginComponent} from './login/login.component';
import {AppSideRegisterComponent} from './register/register.component';
import {AppSideForgotComponent} from "./forgot/forgot.component";
import {GuestGuard} from "../../guards";
import {AppSideActivateComponent} from "./activate/activate.component";
import {AppSideResetComponent} from "./reset/reset.component";

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AppSideLoginComponent,
        canActivate: [GuestGuard],
        data: {
          title: 'Login'
        }
      },
      {
        path: 'register',
        component: AppSideRegisterComponent,
        canActivate: [GuestGuard],
        data: {
          title: 'Register'
        }
      },
      {
        path: 'forgot-password',
        component: AppSideForgotComponent,
        canActivate: [GuestGuard],
        data: {
          title: 'Forgot Password'
        }
      },
      {
        path: 'reset-password',
        component: AppSideResetComponent,
        canActivate: [GuestGuard],
        data: {
          title: 'Reset Password'
        }
      },
      {
        path: 'activate-account',
        component: AppSideActivateComponent,
        canActivate: [GuestGuard],
        data: {
          title: 'Activate Account'
        }
      },
    ],
  },
];
