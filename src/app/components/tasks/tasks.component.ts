import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { TaskModel } from '../../models/tasks.model';
import { TaskService } from '../../services/Task.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../confirmDialog/confirmDialog.component';
import { UpdatetasksComponent } from '../updatetasks/updatetasks.component';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit{
  tasks!: TaskModel[];
  searchTasks!: TaskModel[];
  searchTerm: string = '';
  filterTask: string = 'all';
  taskId!:string;
  constructor(
    private tasksService: TaskService,
    private cdr: ChangeDetectorRef,
    private toast: HotToastService,
    private router: Router,
    private dialog: MatDialog
  ){}
  ngOnInit(): void {
    this.getTasksList()
  }
  getTasksList(){
    this.tasksService.getAllTasks().subscribe({
      next:(data) => {
        this.tasks = data;
        this.searchTasks = [...this.tasks];
        // console.log(data);
        this.cdr.detectChanges();
      },
      error: (err) =>{
        console.log("Error showing data", err);
        this.toast.error('error show task list')
      }
    })
  };
  @Input() set searchLogic(search: string){
    this.searchTasks = this.tasks?.filter((task) => 
      task.name.toLowerCase().includes(search.toLowerCase()))
  };
  deleteTask(id: string){
    const dialogRef = this.dialog.open(ConfirmationDialog, {
        width: '500px',
        data: {title: 'Delete Todo', message: 'Are you sure you want to delete this item'},
        disableClose: true
      });
      dialogRef.afterClosed().subscribe((confirm: boolean) => {
        if(confirm){
          this.tasksService.deleteTask(id).subscribe({
            next: () => {
                this.tasks = this.tasks.filter(task => task.id !== id);
                this.searchTasks = this.tasks.filter(task => task.id !== id);
                this.toast.success("task deleted");
                this.cdr.detectChanges();
            },
            error: (err) => {
              console.log("Error deleting task", err);
              this.toast.error("Failed to delete Task")
            }
          
          })
        }
      })
    
  };
  editTasks(id: string){
      const editDialog = this.dialog.open(UpdatetasksComponent, {
        width: '800px',
        height: '800px',
        disableClose: true,
        data: { taskId: id }
      });
      editDialog.afterClosed().subscribe(result => {
        if(result === true) {
          this.getTasksList()
        }
      })
  }
  filterMethod(){
    this.searchTasks = this.tasks.filter(task => {
      const matchSearch = task.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchFilter = this.filterTask === 'all' || task.status === this.filterTask;
      return matchSearch && matchFilter
    })
  }
  // navigate to add page
  navigateToAdd(){
    this.router.navigate(['/add'])
  }
}
