import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserLoginModel} from "../models/user-login-model";
import {UserRegisterModel} from "../models/UserRegisterModel";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userAPI = "user";

  constructor(private httpService: HttpClient) { }

  registerUser (user: UserRegisterModel) : Observable<UserRegisterModel>{ // post
    var url = this.userAPI + '/register';
    return this.httpService.post<UserRegisterModel>(url, user);
  }

  login (userLoginModel: UserLoginModel) : Observable<UserLoginModel>{
    var url = this.userAPI + '/login';
    return this.httpService.post<UserLoginModel>(url, userLoginModel);
  }


}
