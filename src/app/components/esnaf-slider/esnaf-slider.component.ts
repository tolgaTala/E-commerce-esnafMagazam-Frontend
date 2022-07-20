import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { arrow } from '@popperjs/core';
import { ProductDto } from 'src/app/models/productDto';

@Component({
  selector: 'app-esnaf-slider',
  templateUrl: './esnaf-slider.component.html',
  styleUrls: ['./esnaf-slider.component.css']
})
export class EsnafSliderComponent implements OnInit {
  @Input() productsDto:ProductDto[];
  
  arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  totalCards: number = this.arr.length;
  currentPage: number = 1;  
  pagePosition: string = "0%";
  cardsPerPage: number;
  totalPages: number;
  overflowWidth: string;
  cardWidth: string;
  containerWidth: number;
  @ViewChild("container", { static: true, read: ElementRef })
  container: ElementRef;
  @HostListener("window:resize") windowResize() {
    let newCardsPerPage = this.getCardsPerPage();
    if (newCardsPerPage != this.cardsPerPage) {
      this.cardsPerPage = newCardsPerPage;
      this.initializeSlider();
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
        this.populatePagePosition();
      }
    }
  }

  ngOnInit() {
    this.totalCards = this.productsDto.length;
    this.cardsPerPage = this.getCardsPerPage();
    this.initializeSlider();
  }

  initializeSlider() {
    this.totalPages = Math.ceil(this.totalCards / this.cardsPerPage);
    this.overflowWidth = `calc(${this.totalPages * 100}% + ${this.totalPages *
      10}px)`;
    this.cardWidth = `calc((${100 / this.totalPages}% - ${this.cardsPerPage *
      10}px) / ${this.cardsPerPage})`;
  }

  getCardsPerPage() {
    return Math.floor(this.container.nativeElement.offsetWidth / 200);
  }

  changePage(incrementor:any) {
    this.currentPage += incrementor;
    this.populatePagePosition();
  }

  populatePagePosition() {
    this.pagePosition = `calc(${-100 * (this.currentPage - 1)}% - ${10 *
      (this.currentPage - 1)}px)`;
  }

}
