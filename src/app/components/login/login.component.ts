import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User;
  user1:User;
  loginForm:FormGroup;
  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,    
    private userService:UserService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  getIdByMail(email:string){
    this.userService.getIdByMail(email).subscribe(response=>{
      this.user=response.data   
    })
  }

  createLoginForm() {
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]

    })
  }
  login(){
    if(this.loginForm.valid){
      let loginModel =Object.assign({},this.loginForm.value)
      this.authService.login(loginModel).subscribe(response=>{
        this.getIdByMail(loginModel.email)
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("email",loginModel.email)
        this.toastrService.success(response.message)
        window.location.reload();

        
      },responseError=>{
        this.toastrService.error(responseError.error);
        
      })
    }
    else
    this.toastrService.error("Lütfen Boş Bırakmayınız")
  }
}
