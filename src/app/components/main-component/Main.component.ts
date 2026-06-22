import { Component } from "@angular/core";
import { PageStyle } from "../../directives/page-style";
import { FormsModule } from "@angular/forms";
import { TasksComponent } from "../tasks/tasks.component";

@Component({
    selector: 'main-component',
    imports: [PageStyle, FormsModule, TasksComponent],
    templateUrl: './Main.component.html',
    styleUrl: './Main.component.css'
})
export class MainComponent{
searchLogic!: string;

}