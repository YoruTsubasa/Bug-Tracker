import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SuperHeroComponent} from './components/super-hero/super-hero.component';
import {LoginComponent} from "./components/login/login.component";
import {UserRegisterComponent} from "./components/user-register/user-register.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuardService} from "./services/auth-guard.service";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'super-hero', component: SuperHeroComponent, canActivate: [AuthGuardService]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: UserRegisterComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: '**', component: LoginComponent, pathMatch: 'full'}, // invalid urls
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
