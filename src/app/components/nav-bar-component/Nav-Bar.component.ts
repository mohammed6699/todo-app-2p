import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { LoginService } from "../../services/login.service";

@Component({
    selector: 'app-navBar',
    imports: [RouterLink, CommonModule],
    templateUrl: './Nav-Bar.component.html',
    styleUrl: './Nav-Bar.component.css'
})
export class NavBarComponent {
    isUserLogged: boolean = false;
    constructor(
        private route: Router,
        private userService: LoginService
    ){
        // this.isUserLogged = this.userService.isUserLogged
    }
    deleteUser(){
        this.userService.logout();
        this.route.navigate(['/login'])
        this.isUserLogged = this.userService.isUserLogged
    }
}