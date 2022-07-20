import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[]=[];
  currentCategory:Category;
  currentCategory2:Category;

  constructor(private categoryService:CategoryService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getCategories();
  }


  setCurrentCategory(category:Category){
    this.currentCategory =category
    
  }
  getCurrentCategoryClass(category:Category){
    if(category==this.currentCategory){
      return "list-group-item active"
    }
    else
    return "list-group-item "
  }
  getAllCategoryClass(){
    if(!this.currentCategory)
    return "list-group-item active"
    else
    return "list-group-item "
  }
  unloadCurrentCategory(){
    this.currentCategory = this.currentCategory2
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(response=>{
      this.categories=response.data
    })
  }
}
