import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/NotFound.component';
import { LoginComponent } from './components/loginComponent/Login.component';
import { authGuard } from './auth/auth-guard';
import { MainLayoutComponent } from './layout/main.layout';
import { EmptyLayoutComponent } from './layout/EmptyLayout/Empty.layout';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'home', 
        pathMatch: 'full' 
    },
    {
        path: '',
        component: EmptyLayoutComponent,
        pathMatch: 'full',
        children: [
            {path: 'login', component:LoginComponent, title: 'login page'},
        ]
    },
    {
        path: '',
        canActivate: [authGuard],
        component: MainLayoutComponent,
        children: [
            {
                path: 'home',
                loadComponent: () => import('./components/home-component/Home.component').then(task => task.HomeComponent)
    },
    {
        path: 'tasks', 
        loadComponent: () => import('./components/main-component/Main.component').then(task => task.MainComponent)
    },
    {
        path: 'details/:taskId',
        loadComponent: () => import('./components/tasksdetails/tasksdetails.component').then(task => task.TasksdetailsComponent)
    },
    {
        path: 'add',
        loadComponent: () => import('./components/addtasks/addtasks.component').then(task => task.AddtasksComponent)
    },
    {
        path: 'update/:taskId',
        loadComponent: () => import('./components/updatetasks/updatetasks.component').then(task => task.UpdatetasksComponent)
    }],
    },
    {path: '**', component: NotFoundComponent, title: 'Not Found Page'},
];
