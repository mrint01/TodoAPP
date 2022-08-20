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
    return this.http.get<Todo[]>('auth/todos/get/' + body.user._id )
  }
  Add_odos(body){
    return this.http.post('auth/add',body )
  }
  Update_odos(body){
    return this.http.put('auth/todos/update/' +body._id, body)
  }
  Delete_odos(body: any){
    return this.http.delete<Todo[]>('auth/todos/delete/'+body._id )
  }
}
