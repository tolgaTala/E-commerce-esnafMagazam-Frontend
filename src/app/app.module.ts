import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule ,ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { CategoryComponent } from './components/category/category.component';
import { NaviComponent } from './components/navi/navi.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';

import { ToastrModule } from 'ngx-toastr';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { BasketComponent } from './components/basket/basket.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CommentComponent } from './components/comment/comment.component';
import { OrderComponent } from './components/order/order.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { MyorderComponent } from './components/myorder/myorder.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { HesabimComponent } from './components/hesabim/hesabim.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { AddressComponent } from './components/address/address.component';
import { EsnafMagazaComponent } from './components/esnaf-magaza/esnaf-magaza.component';
import { EsnafSliderComponent } from './components/esnaf-slider/esnaf-slider.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AProductsComponent } from './components/admin-panel/a-products/a-products.component';
import { APanelLeftComponent } from './components/admin-panel/a-panel-left/a-panel-left.component';
import { ACustomersComponent } from './components/admin-panel/a-customers/a-customers.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import {DataViewModule} from 'primeng/dataview';
import { DropdownModule } from "primeng/dropdown";
import { PaginatorModule } from "primeng/paginator";
import { SharedModule, Header, Footer } from 'primeng/api';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenubarModule } from 'primeng/menubar';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { FocusTrapModule } from 'primeng/focustrap';
import { CheckboxModule } from 'primeng/checkbox';
import { TreeTableModule } from 'primeng/treetable';
import { TreeModule } from 'primeng/tree';
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RippleModule } from 'primeng/ripple';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ProgressBarModule} from 'primeng/progressbar';
import {RatingModule} from 'primeng/rating';
import {InputNumberModule} from 'primeng/inputnumber';
import {ScrollTopModule} from 'primeng/scrolltop';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from "primeng/fileupload";
import {CarouselModule} from 'primeng/carousel';
import {GalleriaModule} from 'primeng/galleria';
import {ImageModule} from 'primeng/image';
import { ADefaultComponent } from './components/admin-panel/a-default/a-default.component';
import {ChartModule} from 'primeng/chart';
import { ASellersComponent } from './components/admin-panel/a-sellers/a-sellers.component';
import { AOrdersComponent } from './components/admin-panel/a-orders/a-orders.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { PasswordModule } from "primeng/password";
import { ProductHomeComponent } from './components/product-home/product-home.component';
import { HomeSliderFavComponent } from './components/product-home/home-slider-fav/home-slider-fav.component';
import { EsnafPanelComponent } from './components/esnaf-panel/esnaf-panel.component';
import { ACategoriesComponent } from './components/admin-panel/a-categories/a-categories.component';
import { ACommentsComponent } from './components/admin-panel/a-comments/a-comments.component';





@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CategoryComponent,
    NaviComponent,
    FilterPipePipe,
    ProductAddComponent,
    LoginComponent,
    RegisterComponent,
    BasketComponent,
    ProductDetailsComponent,
    CommentComponent,
    OrderComponent,
    MyorderComponent,
    OrderDetailComponent,
    FavoriteComponent,
    HesabimComponent,
    ProfileComponent,
    AddressComponent,
    EsnafMagazaComponent,
    EsnafSliderComponent,
    AdminPanelComponent,
    AProductsComponent,
    APanelLeftComponent,
    ACustomersComponent,
    ADefaultComponent,
    ASellersComponent,
    AOrdersComponent,
    AdminLoginComponent,
    ProductHomeComponent,
    HomeSliderFavComponent,
    EsnafPanelComponent,
    ACategoriesComponent,
    ACommentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    NgxStarRatingModule,
    TableModule, 
    InputTextModule,
    DialogModule,
    ButtonModule,
    PanelModule,
    TabViewModule,
    CodeHighlighterModule,
    DataViewModule,
    DropdownModule,
    PaginatorModule,
    SharedModule,
	  ConfirmDialogModule,
	  MenubarModule,
	  ListboxModule,
	  RadioButtonModule,
	  AccordionModule,
	  CalendarModule,
	  FocusTrapModule,
	  CheckboxModule,
	  TreeTableModule,
	  TreeModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    ToolbarModule,
    RippleModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    ProgressBarModule,
    RatingModule,
    InputNumberModule,
    InputTextareaModule,
    FileUploadModule,
    CarouselModule,
    ChartModule,
    PasswordModule,
    GalleriaModule,
    ScrollTopModule,
    ImageModule

  ],
  exports: [ TableModule ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor, multi:true},BsModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
