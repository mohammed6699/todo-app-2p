import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'Not-Found',
    imports: [],
    templateUrl: './NotFound.component.html',
    styleUrl: './NotFound.component.css'
})
export class NotFoundComponent {
    constructor(
        private route: Router
    ){}
    navigateToHome(){
        this.route.navigate(['/tasks'])
    }
}