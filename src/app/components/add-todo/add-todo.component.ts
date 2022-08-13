import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Todo from 'src/app/models/Todo';
import * as uuid from 'uuid';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  @Output() addEvent = new EventEmitter();
  name: string=""
  constructor() { }

  ngOnInit(): void {
  }

  addTaskTodo(){
    const todo = new Todo(
      this.name,
      false,
      uuid.v4()
    )
    this.addEvent.emit(todo)
    this.name=""

  }

}
