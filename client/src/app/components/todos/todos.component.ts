import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Todo from 'src/app/models/Todo';
import * as uuid from 'uuid';
import { Router } from '@angular/router';
import { TodosService } from 'src/app/service/todos.service';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user') || '{}')

  todos: Todo[] = [];
  name: string = "";



  constructor(private _router: Router, private todosService: TodosService) { }

  @ViewChild('navdrop') private navdrop: ElementRef;
  dropClick() {
    this.navdrop.nativeElement.classList.toggle("show_dropdown");
  }
  ngOnInit(): void {
    this.todosService.Todos(this.user)
      .subscribe((todo) => {
        this.todos = todo
      })
  }
  addTask(todo) {
    if (todo.text !== "") {
      this.todos.push(todo)
    }
  }



  checkClick(todo) {
    this.todosService.Update_odos(todo).subscribe(()=>{})
    this.todos = this.todos.map(item => {
      if (todo._id === item._id) {
          item.completed = ! item.completed
        }
     return item
     
    })
    

  }

  delete(to) {
    this.todosService.Delete_odos(to).subscribe((data)=>{
   
     console.log(data)
     this.todos = this.todos.filter((t) => {
      return t !== to
    })
    
    })
    
  }
  


  logout() {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    this._router.navigate(['login']);

  }




}


