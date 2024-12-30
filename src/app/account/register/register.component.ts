import {Component, Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

@Injectable({providedIn: 'root'})

export class RegisterComponent {
 registerForm: FormGroup;
 userInformation: any;
 isFormSubmitted: boolean = false;
 confirmPassword: any;

  constructor(private fb: FormBuilder, private http: HttpClient) {
   this.registerForm = this.fb.group({
     userName: ['', [Validators.required]],
     email: ['', [Validators.required, Validators.email]],
     password: ['', [Validators.required, Validators.minLength(6)]]
   })

   this.http.get('https://localhost:7088/api/User').subscribe(x =>{
     console.log(x);
     this.userInformation = x;
   })
 }


 onSubmit() {
  this.isFormSubmitted = true;

  if(this.registerForm.valid && this.password?.value == this.confirmPassword) {
    console.log("Form is valid!");
    this.http.post('https://localhost:7088/api/User/register', this.registerForm.value).subscribe();
  }else
    console.log("Form is invalid!");

 }

  isInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return control && this.isFormSubmitted && !control.valid ? true : false;
  }

  get userName(){
    return this.registerForm.get('userName');
  }

  get email(){
    return this.registerForm.get('email');
  }

  get password(){
    return this.registerForm.get('password');
  }

  assignValue(value: any){
    this.confirmPassword = value;
  }

}
