import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginGuard implements CanActivate {
  constructor(private authService:AuthService,private toastrService:ToastrService,private router:Router){

  }
  email=localStorage.getItem("email")
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.authService.isAuthenticated()){
        if(this.email=="admin@admin.com"){
          return true;
        }
        else{
          this.router.navigate(["home"])
          return false
        }
       
      }
      
      else {
        this.router.navigate(["admin/login"])
        this.toastrService.info("Sisteme admin olarak giriş yapmalısınız")
        return false
      }
  }
  
}
