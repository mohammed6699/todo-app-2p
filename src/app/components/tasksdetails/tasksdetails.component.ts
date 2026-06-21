import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TaskModel } from '../../models/tasks.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { TaskService } from '../../services/Task.service';

@Component({
  selector: 'app-tasksdetails',
  imports: [RouterLink],
  templateUrl: './tasksdetails.component.html',
  styleUrl: './tasksdetails.component.css',
})
export class TasksdetailsComponent implements OnInit{
  task?: TaskModel;
  taskId!: string;
  constructor(
    private active: ActivatedRoute,
    private toast: HotToastService,
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ){}
  ngOnInit(): void {
    this.active.paramMap.subscribe((taskParam) => {
      const taskId = taskParam.get('taskId');
      if(!taskId){
        this.toast.error('error get task Id')
        return;
      }
      this.taskId = taskId;
      this.taskDetails();
    })
  };
  taskDetails(){
    this.taskService.getTaskDetails(this.taskId).subscribe({
      next: (data) => {
        this.task = data;
        this.toast.success('show details success');
        this.cdr.detectChanges()
      },
      error: (err) => {
        this.toast.error('error showing task details', err)
      }
    })
  }
}
