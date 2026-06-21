import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TaskModel } from "../models/tasks.model";
import { environment } from "../../enviroments/environment.development";

@Injectable({
    providedIn: 'root'
})
export class TaskService{
    constructor(
        private http: HttpClient
    ){}
    // get all tasks
    getAllTasks(): Observable<TaskModel[]>{
        return this.http.get<TaskModel[]>(`${environment.baseUrl}tasks`);
    };
    // get by id
    getTaskDetails(taskId: string): Observable<TaskModel>{
        return this.http.get<TaskModel>(`${environment.baseUrl}tasks/${taskId}`)
    };
    // delete task
    deleteTask(taskId: string): Observable<TaskModel>{
        return this.http.delete<TaskModel>(`${environment.baseUrl}tasks/${taskId}`)
    }
    // add new tasks
    addNewTask(data: TaskModel): Observable<TaskModel>{
        return this.http.post<TaskModel>(`${environment.baseUrl}tasks`, data)
    }
    // update task
    UpdateTask(data: TaskModel): Observable<TaskModel>{
        return this.http.put<TaskModel>(`${environment.baseUrl}tasks/${data.id}`, data)
    }
}