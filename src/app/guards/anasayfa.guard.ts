import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnasayfaGuard implements CanActivate {

  constructor(private authService:AuthService,private toastrService:ToastrService,private router:Router){
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.authService.isAuthenticated()){
        this.router.navigate(["home"])
        this.toastrService.info("Ana Sayfaya yönlendirildiniz")
        return false;
      }
      
      else {
                
        return true
      }
  }
  
}
