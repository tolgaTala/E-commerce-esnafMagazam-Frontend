import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';
import { ProductDto } from '../models/productDto';

@Pipe({
  name: 'filterPipe',
})
export class FilterPipePipe implements PipeTransform {
  transform(value: ProductDto[]): ProductDto[] {

    let gelen = localStorage.getItem("filterText");
    console.log(gelen);

    
    gelen = gelen ? gelen.toLocaleLowerCase() : '';
    return gelen
      ? value.filter(
          (p: ProductDto) =>
            p.productName.toLocaleLowerCase().indexOf(gelen) !== -1,
            
            )
        
      : value;
  }
}
