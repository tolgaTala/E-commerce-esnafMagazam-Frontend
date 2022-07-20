import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder, Form } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  disabled: boolean = true;

  user:User;
  passwdChangeForm:FormGroup;
  profileForm:FormGroup;
  esnafProfileForm:FormGroup;
  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,    
    private userService:UserService) { }

  ngOnInit(): void {
    
    this.getUserByMail();
    this.createPasswdChangeForm();
  }

  getUserByMail() {
    let mail = localStorage.getItem('email');
    this.userService.getIdByMail(mail).subscribe((response) => {
      this.user=response.data
      this.createProfileForm();
      this.createEsnafProfileForm();
      console.log(this.user.firstName);
      
    });
  }
  deleteUser(){
    this.userService.delete(this.user).subscribe(response=>{
      this.toastrService.info("hesap silindi")
    })
  }
  createProfileForm() {
    this.profileForm=this.formBuilder.group({
      email:[this.user.email,Validators.required],
      firstName:[this.user.firstName,Validators.required],
      LastName:[this.user.lastName,Validators.required],
      phoneNumber:[this.user.phoneNumber,Validators.required]
    })
  }
  createEsnafProfileForm() {
    this.esnafProfileForm=this.formBuilder.group({
      email:[this.user.email,Validators.required],
      firstName:[this.user.firstName,Validators.required],
      LastName:[this.user.lastName,Validators.required],
      phoneNumber:[this.user.phoneNumber,Validators.required],
      companyName:[this.user.companyName,Validators.required],
      taxNo:[this.user.taxNo,Validators.required]
    })
  }
  createPasswdChangeForm(){
    this.passwdChangeForm=this.formBuilder.group({
      oldPasswd:["",Validators.required],
      newPasswd:["",Validators.required],
      newPasswd2:["",Validators.required]
    })
  }
  changePasswd(){    
    if(this.passwdChangeForm.valid){      
      let oldPwd=this.passwdChangeForm.value.oldPasswd;
      let newPwd=this.passwdChangeForm.value.newPasswd;
      let newPwd2=this.passwdChangeForm.value.newPasswd2;
      if(newPwd==newPwd2){        
        this.userService.changePwd(this.user.userId,oldPwd,newPwd).subscribe(response=>{          
          this.toastrService.success(response.message)
        },
        (responseError) => {
          this.toastrService.error("Yanlış Parola")
        })
      }
      else(
        this.toastrService.error("yeni şifre ve tekrarı aynı olmalı")
      )
    }
    else{
      this.toastrService.error("Şifre Değiştirmek için"," alanları doldurun")
      
    }
  }
  updateUserInfo(){
    
    console.log(this.esnafProfileForm.get('taxNo').value);
    
    if(this.user.taxNo){
      if(this.esnafProfileForm.valid){
        let userModel=Object.assign({},this.esnafProfileForm.value)
        userModel.userId=this.user.userId
        this.userService.update(userModel).subscribe(response=>{
          this.toastrService.success("Bilgileriniz güncellendi.")
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'doğrulama hatası'
              );
            }
          }
        }
      )
      }
      else{
        this.toastrService.warning("Boş alanları doldurmanız gerekir.")
      }
    }
    else{
      if(this.profileForm.valid){
        let userModel=Object.assign({},this.profileForm.value)
        userModel.userId=this.user.userId
        this.userService.update(userModel).subscribe(response=>{
          this.toastrService.success("Bilgileriniz güncellendi.")
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'doğrulama hatası'
              );
            }
          }
        }
      )
      }
      else{
        this.toastrService.warning("Boş alanları doldurmanız gerekir.")
      }
    }
    
  }
  
}