import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TasksComponent } from "../tasks/tasks.component";

@Component({
    selector: 'main-component',
    imports: [FormsModule, TasksComponent],
    templateUrl: './Main.component.html',
    styleUrl: './Main.component.css'
})
export class MainComponent{
searchLogic!: string;

}