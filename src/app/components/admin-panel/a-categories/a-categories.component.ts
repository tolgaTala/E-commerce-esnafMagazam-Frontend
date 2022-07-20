import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryScale } from 'chart.js';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-a-categories',
  templateUrl: './a-categories.component.html',
  styleUrls: ['./a-categories.component.css'],
  providers: [ConfirmationService],
})
export class ACategoriesComponent implements OnInit {

  constructor(
    private categoryService:CategoryService,
    private confirmationService: ConfirmationService,
    private toastrService:ToastrService,
    private modalService: BsModalService,
    private formBuilder:FormBuilder,
  ) { }

  modalRef?: BsModalRef;
  first = 0;
  rows = 6;
  categories:Category[]=[]
  categoryAddForm:FormGroup;

  ngOnInit(): void {
    this.getCategories()
  }

  openModal(template: TemplateRef<any>) {   
    this.createCategoryForm()
    this.modalRef = this.modalService.show(template);
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((response)=>{
      this.categories=response.data
      console.log(this.categories);
      
    })
  }


  createCategoryForm() {
    this.categoryAddForm=this.formBuilder.group({      
      categoryName:["",Validators.required],
    })
  }
  AddCategory(){
    if(this.categoryAddForm.valid){
      let categoryModel=Object.assign({},this.categoryAddForm.value)
      this.categoryService.add(categoryModel).subscribe(response=>{
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
