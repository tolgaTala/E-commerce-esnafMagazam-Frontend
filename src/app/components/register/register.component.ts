import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  gelenParola = '';
  gelenParola2 = '';
  user: User;
  registerForm: FormGroup;
  vatandas1 = true;
  esnaf1 = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
    
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      taxNo: [null],
      lastName: ['', Validators.required],
      companyName: [null],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  getIdByMail(email: string) {
    this.userService.getIdByMail(email).subscribe((response) => {
      this.user = response.data;
    });
  }

  register() {
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value);
      console.log(registerModel)
      if (registerModel.password == registerModel.password2) {
        this.authService.register(registerModel).subscribe(
          (response) => {
            this.getIdByMail(registerModel.email);
            console.log(response);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', registerModel.email);
            this.toastrService.success(response.message);
            window.location.reload();
          },
          (responseError) => {
            this.toastrService.error(responseError.error);
          }
        );
      } else
      this.toastrService.error("Parola Aynı Olmalı") 
    }
    else this.toastrService.error('Lütfen Boş Bırakmayınız');
   
  }

  vatandas() {
    this.vatandas1 = true;
    this.esnaf1 = false;
  }
  esnaf() {
    this.esnaf1 = true;
    this.vatandas1 = false;
  }

  doActiveVatandas() {
    if (this.vatandas1) {
      return 'active';
    } else return '';
  }
  doActiveEsnaf() {
    if (this.esnaf1) {
      return 'active';
    } else return '';
  }
}
