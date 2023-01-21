import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userAPI = "authentication";

  constructor( private httpService: HttpClient) { }
  public isAuthenticated(): boolean {

    var jwtHelper= new JwtHelperService();
    const token = localStorage.getItem('jwtToken'); // Check whether the token is expired and return
    return !jwtHelper.isTokenExpired(token);
  }


  public verifyToken(token: string | null) : Observable<boolean>{
    var url = this.userAPI + '/verify-token';
    return this.httpService.post<boolean>(url, token);
  }

}
