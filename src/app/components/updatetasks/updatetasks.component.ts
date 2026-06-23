import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { TaskModel } from '../../models/tasks.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/Task.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-updatetasks',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './updatetasks.component.html',
  styleUrl: './updatetasks.component.css',
})
export class UpdatetasksComponent implements OnInit{
  taskList!: TaskModel;
  taskId!: string;
  currentId!: string;
  updateTaskForm!: FormGroup
  taskObj: TaskModel = {} as TaskModel;
  private phoneRegex = '^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$';
  private emailRegex = '[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+'
  // dialog
   public diaologRef = inject(MatDialogRef<UpdatetasksComponent>, {optional: true});
  public data = inject(MAT_DIALOG_DATA, {optional: true});

  constructor(
    private taskService: TaskService,
    private toast: HotToastService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.updateTaskForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.emailRegex)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(this.phoneRegex)]),
      status: new FormControl('pendding', Validators.required),
      summary: new FormControl('', Validators.required)
    })
  }
  ngOnInit(): void {
      const id = this.data?.taskId;
      if(id){
        this.loadTaskDetails(id);
      }else {
        this.route.paramMap.subscribe((task) => {
          const routeId = task.get('taskId');
          if(!routeId){
          this.toast.error('error get taskId');
          return;
          }
        })
      }
  }
  loadTaskDetails(id: string){
    this.currentId = id
    this.taskService.getTaskDetails(this.currentId).subscribe({
          next: (data) => {
            this.taskObj = data;
            this.updateTaskForm.patchValue({
              name: this.taskObj.name,
              email: this.taskObj.email,
              phone: this.taskObj.phone,
              status: this.taskObj.status,
              summary: this.taskObj.summary
            })
          }
        })
  }
  updateTaskMethod(){
    if(this.updateTaskForm.valid){
      const updateForm: TaskModel = {
        id: this.currentId,
        name: this.updateTaskForm.value.name,
        email: this.updateTaskForm.value.email,
        phone: this.updateTaskForm.value.phone,
        status: this.updateTaskForm.value.status,
        summary: this.updateTaskForm.value.summary
      };
      this.taskService.UpdateTask(updateForm).subscribe({
        next: () => {
          if(this.diaologRef){
          this.diaologRef.close(true)
          this.toast.success('task updated')
          } else {
            this.router.navigate(['/tasks'])
          }
        },
        error: () => {
          this.toast.error("Error update task")
        }
      })
    }
  }
  onCancel(){
    if(this.diaologRef){
      this.diaologRef.close(false);
      this.toast.success('update cancelled')
    } else {
      this.router.navigate(['/tasks'])
    }
  }
}
