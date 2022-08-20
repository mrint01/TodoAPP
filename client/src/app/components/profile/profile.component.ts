import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import User from 'src/app/models/User';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


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
  user = JSON.parse(localStorage.getItem('user') || '{}')

  name: string=""
  email: string=""
  password: string=""
  password2: string=""
  error_msg = ""
  success_msg = ""
  nameold =""
  emailold= ""
  

  ngOnInit(): void {
    this.authService.profile(this.user)
    .subscribe((users) =>{
       this.nameold = users["name"];
       this.emailold = users["email"];

       
    })

   
  }

  updateProfile(){
    if(this.password !== ""){
      if(this.password != this.password2){
        this.error_msg = "passwords does not match";
      }else{
        const update_user ={
          name : this.name,
          email: this.email,
          password: this.password,
          user: this.user
        }
        this.authService.update_profile(update_user,).subscribe((data)=>{
          
    
           if(data['error']){
             this.error_msg = data['error'];
          }
          if(data['message']){
            this.success_msg = data['message'];
            this.ngOnInit();
          }
          
          })
      }
      
    }else{
      const update_user ={
        name : this.name,
        email: this.email,
        user: this.user
      }
      console.log(update_user)
      this.authService.update_profile(update_user,).subscribe((data)=>{
        console.log(data)
  
         if(data['error']){
           this.error_msg = data['error'];
        }
        if(data['message']){
          this.success_msg = data['message'];
          this.ngOnInit();
        }
        
        })
    }
    

  }



}
