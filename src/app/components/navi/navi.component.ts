import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  categories: Category[] = [];
  currentCategory: Category;
  currentCategory2: Category;
  filter = '';
  letNone = false;
  isAuthantice = false;
  userMail = localStorage.getItem('email');
  user: User;
  esnaf = false;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private userService: UserService
  ) {}

  
  ngOnInit(): void {
    this.getCategories();
    this.isAuthanticed();
    this.isEsnaf();
  }

  onKey(event: any) {
    let filterText = event.target.value;
    this.filter = filterText;
    localStorage.setItem('filterText', filterText);
  }


  isEsnaf() {
    this.userService.getIdByMail(this.userMail).subscribe((response) => {
      this.user = response.data;
    if (this.user.companyName) {
      this.esnaf = true;
    }
    else {
      this.esnaf=false
    }    
    });
    
  }

  isAuthanticed() {
    if (this.authService.isAuthenticated()) {
      this.isAuthantice = true;
    } else this.isAuthantice = false;
  }

  search() {
    if (this.filter == '') {
      localStorage.removeItem('filterText');
    }
    window.location.assign('products');
  }
  profile() {
    window.location.assign('hesabim');
  }
  orders() {
    window.location.assign('hesabim');
  }
  magaza() {
    window.location.assign('esnaf-Panel');
  }
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    window.location.reload();
  }

  setCurrentCategory(category: Category) {
    this.currentCategory = category;
  }
  getCurrentCategoryClass(category: Category) {
    if (category == this.currentCategory) {
      return 'link active';
    } else return 'link';
  }
  getAllCategoryClass() {
    if (!this.currentCategory) return 'list-group-item active';
    else return 'list-group-item ';
  }
  unloadCurrentCategory() {
    this.currentCategory = this.currentCategory2;
    this.toastrService.success('asdasdads');
  }
  login() {
    this.letNone = true;
    window.location.assign('login');
  }
  register() {
    this.letNone = true;
    window.location.assign('register');
  }

  letnone() {
    if (this.letNone) {
      return 'display:none';
    } else return '';
  }
  getCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response.data;
    });
  }
}