import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-a-sellers',
  templateUrl: './a-sellers.component.html',
  styleUrls: ['./a-sellers.component.css'],
  providers:[ConfirmationService]
})
export class ASellersComponent implements OnInit {
  modalRef?: BsModalRef;
  constructor
  (
    private userService:UserService,
    private confirmationService: ConfirmationService,
    private formBuilder:FormBuilder,
    private modalService: BsModalService,
    private toastrService:ToastrService
  ) { }

  first = 0;
  rows = 6;
  usersVT:User[]=[]
  customers:User[]=[]
  sellers:User[]=[]
  selectedSellers:User[]=[]
  selectedSeller:User
  loading:boolean
  sellerUpdateForm:FormGroup;

  
  ngOnInit(): void {
    this.getAllUsers()
  }

  openModal(template: TemplateRef<any>,customer:User) {
    this.selectedSeller=customer    
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
      }
    }); 
  }


  
  isLastPage(): boolean {
    return this.customers ? this.first === (this.customers.length - this.rows): true;
  }

  isFirstPage(): boolean {
    return this.customers ? this.first === 0 : true;
  }

  createProfileForm() {
    this.sellerUpdateForm=this.formBuilder.group({
      email:[this.selectedSeller.email,Validators.required],
      firstName:[this.selectedSeller.firstName,Validators.required],
      LastName:[this.selectedSeller.lastName,Validators.required],
      phoneNumber:[this.selectedSeller.phoneNumber,Validators.required],
      companyName:[this.selectedSeller.companyName,Validators.required],
      taxNo:[this.selectedSeller.taxNo,Validators.required],
    })
  }
  updateSellerInfo(){
    if(this.sellerUpdateForm.valid){
      let userModel=Object.assign({},this.sellerUpdateForm.value)
      userModel.userId=this.selectedSeller.userId
      userModel.status=this.selectedSeller.status
      this.userService.update(userModel).subscribe(response=>{
        this.toastrService.success(response.message)
        this.modalRef.hide()
        this.ngOnInit()
      });
    }
    else{
      this.toastrService.warning("Boş alanları doldurmanız gerekir.")
    }
  }
  

}

