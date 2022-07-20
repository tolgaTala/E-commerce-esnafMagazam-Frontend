import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css',
]
})
export class AdminLoginComponent implements OnInit {

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
  adminMail:string
  login(){
    console.log(this.loginForm.get("email").value);
    
    this.userService.getForAdmin().subscribe(response=>{
      this.adminMail=response.data.email
    console.log(this.adminMail);

      if(this.loginForm.get("email").value==this.adminMail){
        if(this.loginForm.valid){
          let loginModel =Object.assign({},this.loginForm.value)
          this.authService.login(loginModel).subscribe(response=>{
            this.getIdByMail(loginModel.email)
            localStorage.setItem("userId",this.user.userId.toString())
            localStorage.setItem("token",response.data.token)
            localStorage.setItem("email",loginModel.email)
            this.toastrService.success(response.message) 
            window.location.reload()    
            
          },responseError=>{
            this.toastrService.error(responseError.error);
            
          })
        }
        else
        this.toastrService.error("Lütfen Boş Bırakmayınız")
      }
      else
        this.toastrService.error("Sadece admine özel alan!!!")
    })
    
    
  }
}
