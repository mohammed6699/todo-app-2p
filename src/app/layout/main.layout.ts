import { Component } from "@angular/core";
import { NavBarComponent } from "../components/nav-bar-component/Nav-Bar.component";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'main-layout',
    imports: [RouterOutlet, NavBarComponent],
    templateUrl: './main.layout.html'
})
export class MainLayoutComponent {

}