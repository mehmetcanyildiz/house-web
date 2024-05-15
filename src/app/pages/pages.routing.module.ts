import {Routes} from '@angular/router';
import {AppDashboardComponent} from './dashboard/dashboard.component';
import {SettingsComponent} from "./profile/settings/settings.component";
import {FavoritesComponent} from "./profile/favorites/favorites.component";
import {ClassifiedsComponent} from "./profile/classifieds/classifieds.component";
import {CreateComponent} from "./classified/create/create.component";
import {DetailComponent} from "./classified/detail/detail.component";
import {EditComponent} from "./classified/edit/edit.component";

export const PagesRoutes: Routes = [
  {
    path: '',
    component: AppDashboardComponent,
    data: {
      title: 'Dashboard',
    },
  },
  {
    path: 'profile',
    children: [
      {
        path: 'my-classifieds',
        component: ClassifiedsComponent,
        data: {
          title: 'My Classifieds',
        },
      },
      {
        path: 'my-favorites',
        component: FavoritesComponent,
        data: {
          title: 'My Favorites',
        },
      },
      {
        path: 'settings',
        component: SettingsComponent,
        data: {
          title: 'Profile Settings',
        },
      },
    ],
  },
  {
    path: 'classified',
    children: [
      {
        path: 'create',
        component: CreateComponent,
        data: {
          title: 'Create Property',
        },
      },
      {
        path: 'edit/:id',
        component: EditComponent,
        data: {
          title: 'Edit Property'
        },
      },
      {
        path: 'detail/:id',
        component: DetailComponent,
        data: {
          title: 'Detail Property',
        },
      },
    ],
  },
];
