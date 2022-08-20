import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Todo from 'src/app/models/Todo';
import * as uuid from 'uuid';
import { TodosService } from 'src/app/service/todos.service';
@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user') || '{}')

  @Output() addEvent = new EventEmitter();
  name: string=""
  constructor(private todosService: TodosService) { }

  ngOnInit(): void {
  }

  addTaskTodo(){
    const todo = {
      text: this.name,
      completed: false,
      user: this.user
    }
    
    console.log(todo)
    this.todosService.Add_odos(todo).subscribe(() => {})
    this.addEvent.emit(todo)
    this.name=""

  }

}
