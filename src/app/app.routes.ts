import { Routes } from '@angular/router';
import { App } from './app';
import { TasksComponent } from './components/tasks/tasks.component';
import { TasksdetailsComponent } from './components/tasksdetails/tasksdetails.component';
import { AddtasksComponent } from './components/addtasks/addtasks.component';
import { UpdatetasksComponent } from './components/updatetasks/updatetasks.component';
import { MainComponent } from './components/main-component/Main.component';

export const routes: Routes = [
    {path: '', component: App, children: [
        {path: '', redirectTo: 'tasks', pathMatch: 'full'},
        // {path: 'tasks', component: TasksComponent, title: 'Tasks Page'},
        {path: 'tasks', component: MainComponent, title: 'Tasks Page'},
        {path: 'tasks/:taskId', component: TasksdetailsComponent, title: 'Task Details Page'},
        {path: 'add-task', component: AddtasksComponent, title: 'Add New Task Page'},
        {path: 'update-task/:taskId', component: UpdatetasksComponent, title: 'Update Task Page'}
    ]}
];
