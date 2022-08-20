import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import User from '../models/User';
import { Observable } from 'rxjs';
import Todo from '../models/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {



 
  constructor(private http: HttpClient) { }

  Todos(body): Observable<Todo[]>{
    return this.http.get<Todo[]>('http://127.0.0.1:3000/auth/todos/get/id' + body.user._id )
  }
  Add_odos(body: any){
    return this.http.post<Todo[]>('http://127.0.0.1:3000/auth/add',body )
  }
  Update_odos(body){
    return this.http.put('http://127.0.0.1:3000/auth/todos/update/' +body._id, body)
  }
  Delete_odos(body: any){
    return this.http.delete<Todo[]>('http://127.0.0.1:3000/auth/todos/delete/'+body._id )
  }
}
