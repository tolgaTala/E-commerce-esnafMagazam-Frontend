import { Component, Input, OnInit } from '@angular/core';
import { ProductDto } from 'src/app/models/productDto';

@Component({
  selector: 'app-home-slider-fav',
  templateUrl: './home-slider-fav.component.html',
  styleUrls: ['./home-slider-fav.component.css']
})
export class HomeSliderFavComponent implements OnInit {
  responsiveOptions:any;
  
  @Input() productsDto:ProductDto[]=[]
  constructor() { 
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
   
  }
  productsDtoFav: ProductDto[] = [];

  ngOnInit(): void {
    this.getProductsBestFav()
  }

  getProductsBestFav(){
    this.productsDto = this.productsDto.sort((a,b) => (a.likeNumber < b.likeNumber) ? 1 : ((b.likeNumber < a.likeNumber) ? -1 : 0))
  }
}
