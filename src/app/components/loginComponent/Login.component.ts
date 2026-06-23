import { Component } from "@angular/core";
import { UserModel } from "../../models/user.model";
import { Router } from "@angular/router";
import { LoginService } from "../../services/login.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-login',
    imports: [CommonModule, FormsModule],
    templateUrl: './Login.component.html',
    styleUrl: './Login.component.css'
})
export class LoginComponent {
    loginUser: UserModel = {} as UserModel;
    isUserLogged: boolean = false
    constructor(
        private route: Router,
        private userService: LoginService
    ){
        this.isUserLogged = this.userService.isUserLogged
    }
    addUser(){
    
        this.userService.login(this.loginUser).subscribe((data) => {
            console.log(data);
            localStorage.setItem('email', this.loginUser.email);
            localStorage.setItem('password', this.loginUser.password);
            this.isUserLogged = this.userService.isUserLogged
            this.route.navigate(['/home']);
        })
    }
}