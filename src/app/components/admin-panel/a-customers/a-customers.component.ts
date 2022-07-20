import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-a-customers',
  templateUrl: './a-customers.component.html',
  styleUrls: ['./a-customers.component.css'],
  providers:[ConfirmationService]
})
export class ACustomersComponent implements OnInit {
  modalRef?: BsModalRef;
  constructor
  (
    private userService:UserService,
    private confirmationService: ConfirmationService,
    private toastrService:ToastrService,
    private modalService: BsModalService,
    private formBuilder:FormBuilder,
  ) { }

  first = 0;
  rows = 6;
  usersVT:User[]=[]
  customers:User[]=[]
  sellers:User[]=[]
  selectedcustomers:User[]=[]
  selectedcustomersId:number[]=[]
  loading:boolean
  userUpdateForm:FormGroup;
  selectedCustomer:User

  ngOnInit(): void {
    this.getAllUsers()

  }

  openModal(template: TemplateRef<any>,customer:User) {
    this.selectedCustomer=customer    
    this.createProfileForm()
    this.modalRef = this.modalService.show(template);
  }
  
  getAllUsers(){
    this.userService.getAllUsers().subscribe((response)=>{
      this.usersVT=response.data;
      this.partitionUsers();
    })
  }

  partitionUsers(){
    this.usersVT.forEach(user => {
      if(user.companyName!=null&&user.taxNo!=null){
        this.sellers.push(user)
      }else{
        this.customers.push(user)
        console.log("customer güncellendi");        
      }
    }); 
  }
  isLastPage(): boolean {
    return this.customers ? this.first === (this.customers.length - this.rows): true;
  }

  isFirstPage(): boolean {
    return this.customers ? this.first === 0 : true;
  }
  
  hidden(){
    this.selectedcustomers.forEach(element => {
      this.selectedcustomersId.push(element.userId)
    });
    this.userService.hidden(this.selectedcustomersId).subscribe((response)=>{
      this.ngOnInit()            
    })    
  }

  hiddenProducts() {
    this.confirmationService.confirm({
        message: 'Seçili Kişiler Gizlenecek!!',
        header: 'DİKKAT',
        icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.hidden()
                this.toastrService.info("Kullanıcı gizlendi")
                this.selectedcustomersId=null
            }
    });
  }

  createProfileForm() {
    this.userUpdateForm=this.formBuilder.group({      
      firstName:[this.selectedCustomer.firstName,Validators.required],
      LastName:[this.selectedCustomer.lastName,Validators.required],
      email:[this.selectedCustomer.email,Validators.required],
      phoneNumber:[this.selectedCustomer.phoneNumber,Validators.required],
    })
  }
  updateUserInfo(){
    if(this.userUpdateForm.valid){
      let userModel=Object.assign({},this.userUpdateForm.value)
      userModel.userId=this.selectedCustomer.userId
      userModel.status=this.selectedCustomer.status
      this.userService.update(userModel).subscribe(response=>{
        console.log("buraya gelme zaten");
        this.toastrService.success(response.message)
        this.modalRef.hide()
        this.getAllUsers()
        this.partitionUsers()
        this.ngOnInit()
      });
    }
    else{
      this.toastrService.warning("Boş alanları doldurmanız gerekir.")
    }
  }

}
