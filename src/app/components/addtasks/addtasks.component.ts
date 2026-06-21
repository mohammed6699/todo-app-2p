import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotToastService } from '@ngxpert/hot-toast';
import { TaskService } from '../../services/Task.service';
import { Router, RouterLink } from '@angular/router';
import { AddUpdateStyle } from '../../directives/add-update-style';

@Component({
  selector: 'app-addtasks',
  imports: [FormsModule, ReactiveFormsModule, RouterLink, AddUpdateStyle],
  templateUrl: './addtasks.component.html',
  styleUrl: './addtasks.component.css',
})
export class AddtasksComponent {
  taskForm!: FormGroup
  constructor(
    private cdr: ChangeDetectorRef,
    private toast: HotToastService,
    private taskService: TaskService,
    private router: Router
  ){
    this.taskForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      status: new FormControl('pendding', Validators.required),
      summary: new FormControl('', Validators.required)
    })
  };
  addNewTask(){
    this.taskService.addNewTask(this.taskForm.value).subscribe({
      next: () => {
        this.taskForm.reset();
        this.cdr.detectChanges();
        this.toast.success('new task added');
        this.router.navigate(['/tasks'])
      },
      error: (err) => {
        console.log('error adding data', err)
        this.toast.error("error adding new task")
      }
    })
  }
}
