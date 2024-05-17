import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlankComponent} from './layouts/blank/blank.component';
import {FullComponent} from './layouts/full/full.component';
import {AuthGuard} from "./guards";

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
