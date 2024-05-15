import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {PagesRoutes} from './pages.routing.module';
import {MaterialModule} from '../material.module';
import {FormsModule} from '@angular/forms';
import {NgApexchartsModule} from 'ng-apexcharts';
// icons
import {TablerIconsModule} from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import {SettingsComponent} from "./profile/settings/settings.component";
import {ClassifiedsComponent} from "./profile/classifieds/classifieds.component";
import {FavoritesComponent} from "./profile/favorites/favorites.component";
import {CreateComponent} from "./classified/create/create.component";
import {EditComponent} from "./classified/edit/edit.component";
import {DetailComponent} from "./classified/detail/detail.component";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    RouterModule.forChild(PagesRoutes),
    TablerIconsModule.pick(TablerIcons),
  ],
  declarations: [
    ClassifiedsComponent,
    FavoritesComponent,
    SettingsComponent,
    CreateComponent,
    EditComponent,
    DetailComponent
  ],
  exports: [TablerIconsModule],
})
export class PagesModule {
}
