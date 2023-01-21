import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SuperHeroComponent} from './components/super-hero/super-hero.component';
import {LoginComponent} from './components/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {InterceptorService} from "./services/interceptor.service";


import { HomeComponent } from './components/home/home.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { TextInputComponent } from './components/templates/text-input/text-input.component';
import {FormControlPipe} from "./pipes/form-control-pipe";
import {JwtHelperService, JWT_OPTIONS} from "@auth0/angular-jwt";
import {AuthService} from "./services/auth.service";
import {AuthGuardService} from "./services/auth-guard.service";

@NgModule({
  declarations: [
    AppComponent,
    SuperHeroComponent,
    LoginComponent,
    HomeComponent,
    UserRegisterComponent,
    ForgotPasswordComponent,
    TextInputComponent,
    FormControlPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS,
      useClass: JwtHelperService,
      multi: true,
    },
    [AuthGuardService]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
