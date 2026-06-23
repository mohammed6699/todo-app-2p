import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserModel } from "../models/user.model";
import { Observable } from "rxjs";
import { environment } from "../../enviroments/environment.development";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(
        private http: HttpClient
    ){}
    login(credentials: UserModel): Observable<UserModel>{
        let token = 'aaaaaaeeeeeeeeeeeetttttttt2547852';
        localStorage.setItem('userToken', token)
        return this.http.post<UserModel>(`${environment.baseUrl}user`, credentials);
    }
    get isUserLogged(): boolean{
        return (localStorage.getItem('userToken')) ? true : false
    }
    logout(){
        localStorage.clear()
        // localStorage.removeItem('userToken')
    }
}