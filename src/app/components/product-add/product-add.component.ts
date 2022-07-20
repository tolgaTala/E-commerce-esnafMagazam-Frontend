import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { OrderDetailsDto } from 'src/app/models/orderDetailsDto';
import { User } from 'src/app/models/user';
import { CategoryService } from 'src/app/services/category.service';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  id: number;
  user:User;
  productAddForm: FormGroup;
  selectedFile: File;
  categories:Category[]=[]

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toastrService: ToastrService,
    private userService: UserService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.getUserByMail();
    this.createProductAddForm();
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(response=>{
      this.categories=response.data
    })
  }

  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      price: ['', Validators.required],
      unitInStock: ['', Validators.required],
      categoryId: ['', Validators.required],
      image: [''],
      userId: [this.id],
    });
  }

  getUserByMail() {
    let mail = localStorage.getItem('email');
    this.userService.getIdByMail(mail).subscribe((response) => {
      this.id = response.data.userId;
      this.user=response.data
      console.log(this.user.companyName);
      
    });
  }


  add() {
    console.log(this.productAddForm);
    if (this.productAddForm.valid) {
      console.log("geldi1");
      const formData = new FormData();
      formData.append('userId', this.id.toString());
      formData.append('productName', this.productAddForm.get('productName').value);
      formData.append('price', this.productAddForm.get('price').value);
      formData.append('unitInStock', this.productAddForm.get('unitInStock').value);
      formData.append('categoryId', this.productAddForm.get('categoryId').value);
      formData.append(
          'Image',
          this.selectedFile,
          this.selectedFile.name
        );
      this.productService.add(formData).subscribe((response) => {
        this.toastrService.success(response.message);
        window.location.reload();
      });
    }else{
      this.toastrService.error("Lütfen Boş Bırakmayın")
    }
  }

  onFileSelected(event: any) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.selectedFile = <File>event.target.files[i];
      const file = (event.target as HTMLInputElement).files[i];
      this.productAddForm.patchValue({
        imagePath: file,
      });
      this.productAddForm.get('image').updateValueAndValidity();
    }
  }
}
