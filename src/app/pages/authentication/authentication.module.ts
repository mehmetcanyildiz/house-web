import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// icons
import {TablerIconsModule} from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import {AuthenticationRoutes} from './authentication.routing';

import {AppSideLoginComponent} from './login/login.component';
import {AppSideRegisterComponent} from './register/register.component';
import {AppSideForgotComponent} from "./forgot/forgot.component";
import {
  MatStep,
  MatStepLabel,
  MatStepper,
  MatStepperNext,
  MatStepperPrevious
} from "@angular/material/stepper";
import {AppSideActivateComponent} from "./activate/activate.component";
import {AppSideResetComponent} from "./reset/reset.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    NgOptimizedImage,
    MatStep,
    MatStepLabel,
    MatStepper,
    MatStepperPrevious,
    MatStepperNext,
  ],
  declarations: [
    AppSideLoginComponent,
    AppSideRegisterComponent,
    AppSideForgotComponent,
    AppSideActivateComponent,
    AppSideResetComponent
  ],
})
export class AuthenticationModule {
}
