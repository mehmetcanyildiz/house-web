import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

// icons
import {TablerIconsModule} from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

//Import all material modules
import {MaterialModule} from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgScrollbarModule} from 'ngx-scrollbar';

//Import Layouts
import {FullComponent} from './layouts/full/full.component';
import {BlankComponent} from './layouts/blank/blank.component';

// Vertical Layout
import {HeaderComponent} from './layouts/full/header/header.component';
import {NgOptimizedImage} from "@angular/common";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {ErrorHandlerService, HttpInterceptorService, JwtInterceptor} from "./helpers";

export const PROVIDERS: any[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  },
  {
    provide: ErrorHandler,
    useClass: ErrorHandlerService
  },
];

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    BlankComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TablerIconsModule.pick(TablerIcons),
    NgScrollbarModule,
    NgOptimizedImage,
  ],
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],
  providers: [
    PROVIDERS,
    provideAnimationsAsync()
  ],
})
export class AppModule {
}
