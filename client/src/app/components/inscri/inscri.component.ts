import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/service/auth.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-inscri',
  templateUrl: './inscri.component.html',
  styleUrls: ['./inscri.component.css']
})
export class InscriComponent implements OnInit {

   public static matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
}
  constructor(private authService: AuthService, private _router: Router) { }
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    //email: new FormControl('', Validators.required),
    email: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),   
    password: new FormControl('', Validators.required),
    password2: new FormControl('', [
      Validators.required,
      InscriComponent.matchValues('password'),
    ]),
  });
  name: string=""
  email: string=""
  password: string=""
  password2: string=""
  

  ngOnInit(): void {
  }

   error_msg = ""

  Signup(){
    this.form.markAllAsTouched();
    if(this.password != this.password2){
      this.error_msg = "passwords does not match";
    }else{
      if (this.form.valid) {
        const user = new User(
          this.name,
          this.email,
          this.password
        )
        this.authService.Siginup(user).subscribe((data)=>{
         if(data['message']){
            this.error_msg = data['message'];
         }else{
          this._router.navigate(['login']);
         }
         })
      } 
    }
  
  }
}
