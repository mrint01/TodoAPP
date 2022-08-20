import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/service/auth.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private _router: Router) { }
  form: FormGroup = new FormGroup({
  
    email: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),   
    password: new FormControl('', Validators.required),
  });

  email: string="test1@yahoo.ca"
  password: string="hatem1995"
  error_msg = ""

  ngOnInit(): void {
    //const user = JSON.parse(localStorage.getItem('user') || '{}');
    //console.log(user)
  }
  Sigin(){
    const user_log = {
      email :this.email,
      password: this.password

    }
    this.authService.Sigin(user_log).subscribe(
      result => {
        // Handle result
        this.error_msg =""
        localStorage.setItem("user", JSON.stringify(result))
        localStorage.setItem("token", JSON.stringify(result['token']))
      },
      error => {
        console.log(error.error.message)
        this.error_msg = error.error.message;
      },
      () => {
        this._router.navigate(['todos']);
      }
    )

  }

}
