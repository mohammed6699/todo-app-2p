import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TaskModel } from '../../models/tasks.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/Task.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddUpdateStyle } from '../../directives/add-update-style';

@Component({
  selector: 'app-updatetasks',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink, AddUpdateStyle],
  templateUrl: './updatetasks.component.html',
  styleUrl: './updatetasks.component.css',
})
export class UpdatetasksComponent implements OnInit{
  taskList!: TaskModel;
  taskId!: string;
  currentId!: string;
  updateTaskForm!: FormGroup
  taskObj: TaskModel = {} as TaskModel;
  constructor(
    private cdr: ChangeDetectorRef,
    private taskService: TaskService,
    private toast: HotToastService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.updateTaskForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      status: new FormControl('pendding', Validators.required),
      summary: new FormControl('', Validators.required)
    })
  }
  ngOnInit(): void {
      this.route.paramMap.subscribe((task) => {
        const id = task.get('taskId');
        if(!id){
          this.toast.error('error get taskId');
          return;
        }
        this.currentId = id;
        this.taskService.getTaskDetails(this.currentId).subscribe({
          next: (data) => {
            this.taskObj = data;
            this.updateTaskForm.patchValue({
              name: this.taskObj.name,
              description: this.taskObj.description,
              status: this.taskObj.status,
              summary: this.taskObj.summary
            })
          }
        })
      })
  }
  updateTaskMethod(){
    if(this.updateTaskForm.valid){
      const updateForm: TaskModel = {
        id: this.currentId,
        name: this.updateTaskForm.value.name,
        description: this.updateTaskForm.value.description,
        status: this.updateTaskForm.value.status,
        summary: this.updateTaskForm.value.summary
      };
      this.taskService.UpdateTask(updateForm).subscribe(() => {
        this.cdr.detectChanges();
          this.toast.success('task updated')
          this.router.navigate(['/tasks'])
      })
    }
  }
}
