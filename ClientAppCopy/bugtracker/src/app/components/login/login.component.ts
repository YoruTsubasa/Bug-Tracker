import {Component, Pipe, PipeTransform} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {UserLoginModel} from "../../models/user-login-model";
import {Router} from "@angular/router";
import {FormControlPipe} from "../../pipes/form-control-pipe";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  constructor(private userService: UserService, private authService: AuthService , private formBuilder: FormBuilder, private router: Router) {
  }

  onSubmit(): void { // login
    if(!this.loginForm.valid) {
      console.log('formGroup not valid');
      return;
    }

    var userLoginModel = new UserLoginModel(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value, null);
    this.userService.login(userLoginModel).subscribe((result)=> {
      userLoginModel.token = result.token;

      if(userLoginModel.token)
        localStorage.setItem('jwtToken', userLoginModel.token); // put token in localStorage
    });

    if(!this.authService.verifyToken(userLoginModel.token)) {
      console.log('token is not valid.');
      return;
    }

    this.router.navigate(['home']);
    this.loginForm.reset();
  }
}

