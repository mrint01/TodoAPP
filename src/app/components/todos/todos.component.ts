import { Component, OnInit, ViewChild ,ElementRef} from '@angular/core';
import Todo from 'src/app/models/Todo';
import * as uuid from 'uuid';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos =[
    {
      
      text: "task 1",
      completed: true,
      id:"1"
  },
  {
   
    text: "task 2",
    completed: false,
    id:"2"
  },
  {
   
    text: "task 3",
    completed: true,
    id:"3"
}, 
  ];
  name: string ="";
  checkClick(todo){
    this.todos = this.todos.map(item=>{
      if(todo.id  === item.id){
        item.completed =! item.completed
      }
      return item
    })

  }


  constructor() { }

  @ViewChild('navdrop') private  navdrop: ElementRef;
  dropClick() {
    this.navdrop.nativeElement.classList.toggle("show_dropdown");
  }
  ngOnInit(): void {
    
  }

  delete(todo){
    this.todos = this.todos.filter((t)=>{
      return t !== todo
      
    })
  }
/*
  addTask(){
    if(this.name !== ""){
      const t = new Todo(
        this.name,
        false,
        uuid.v4()
        
      )
      this.todos.push(t);
      this.name="";
    }
    
*/

addTask(todo){
  if(todo.text !== ""){
    this.todos.push(todo)
  }
}




  }


