import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule,FormsModule,ReactiveFormsModule,RouterOutlet,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  submitted = false;
  public user:any;
  //onSubmit() { this.submitted = true; }

  //Form Validables
  loginForm: any = FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
   this.createForm();
 }
  createForm() {
   this.loginForm = this.fb.group({
      username: ['', Validators.required ],
      password: ['', Validators.required ]
   });
 }

 login(){
  this.http.get<any>("http://localhost:3000/customers")
  .subscribe(response=>{
    console.log(response)
    const customer = response.find((cust:any)=>{
      return cust.username === this.loginForm.value.username && cust.password === this.loginForm.value.password
    });
    console.log(customer)
    if(customer){
      // alert("Login Success!!");
      if(this.loginForm.value.username==customer.username){
      this.loginForm.reset();
      this.router.navigate(['account-summary'],{queryParams:{ userId: JSON.stringify(customer.userId)}})
      }
    }
    else{
      alert("User not found.Try Again!!");
    }
  })
 }



}