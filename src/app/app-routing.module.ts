import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './components/basket/basket.component';
import { LoginComponent } from './components/login/login.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AnasayfaGuard } from './guards/anasayfa.guard';
import { LoginGuard } from './guards/login.guard';
import { OrderComponent } from './components/order/order.component';
import { MyorderComponent } from './components/myorder/myorder.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { HesabimComponent } from './components/hesabim/hesabim.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EsnafMagazaComponent } from './components/esnaf-magaza/esnaf-magaza.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AProductsComponent } from './components/admin-panel/a-products/a-products.component';
import { ACustomersComponent } from './components/admin-panel/a-customers/a-customers.component';
import { ADefaultComponent } from './components/admin-panel/a-default/a-default.component';
import { ASellersComponent } from './components/admin-panel/a-sellers/a-sellers.component';
import { AOrdersComponent } from './components/admin-panel/a-orders/a-orders.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { ProductHomeComponent } from './components/product-home/product-home.component';
import { EsnafPanelComponent } from './components/esnaf-panel/esnaf-panel.component';
import { AdminGuard } from './guards/admin.guard';
import { AdminLoginGuard } from './guards/admin-login.guard';
import { NaviComponent } from './components/navi/navi.component';
import { AddressComponent } from './components/address/address.component';
import { ACategoriesComponent } from './components/admin-panel/a-categories/a-categories.component';
import { ACommentsComponent } from './components/admin-panel/a-comments/a-comments.component';

const routes: Routes = [
  {path:'',component:NaviComponent,children:[
    {path:"",pathMatch:"full", component:ProductHomeComponent},
    {path:"products",pathMatch:"full", component:ProductComponent},
    {path:"anasayfa", component:ProductAddComponent},
    {path:"products/category/:categoryID", component:ProductComponent},
    {path:"products/add", component:ProductAddComponent, canActivate:[LoginGuard]},
    {path:"login", component:LoginComponent,canActivate:[AnasayfaGuard]},
    {path:"basket", component:BasketComponent},
    {path:"register", component:RegisterComponent,canActivate:[AnasayfaGuard]},
    {path:"productdetails/:productId", component:ProductDetailsComponent},
    {path:"productdetails", component:ProductDetailsComponent},
    {path:"favorites", component:FavoriteComponent ,canActivate:[LoginGuard]},
    {path:"hesabim", component:HesabimComponent ,children:[
      {path:"profil", component:ProfileComponent},
      {path:"siparislerim",component:MyorderComponent},
      {path:"adres",component:AddressComponent},      
      {path:"orderdetail/:orderId", component:OrderDetailComponent},
    ],canActivate:[LoginGuard]},
    
    {path:"magaza", component:EsnafMagazaComponent ,canActivate:[LoginGuard]},
    {path:"esnaf-Panel", component:EsnafPanelComponent ,canActivate:[LoginGuard]},
    {path:"basket/orderaddress", component:OrderComponent ,canActivate:[LoginGuard]},
    {path:"magaza/:sellerId", component:EsnafMagazaComponent },    
    {path:"home", component:ProductHomeComponent},
  ]},
  {path:"admin/login", component:AdminLoginComponent,canActivate:[AdminGuard]},
  {path:"admin", component:AdminPanelComponent,children:[
    {path:"products", component:AProductsComponent},
    {path:"customers", component:ACustomersComponent},
    {path:"default",component:ADefaultComponent},
    {path:"sellers",component:ASellersComponent},
    {path:"orders",component:AOrdersComponent},
    {path:"categories",component:ACategoriesComponent},
    {path:"comments",component:ACommentsComponent}
  ],canActivate:[AdminLoginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
