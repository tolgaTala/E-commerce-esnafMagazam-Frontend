export interface ProductDto {
  productId: number;
  categoryId: number;
  userId: number;
  unitInStock: number;
  price: number;
  productName: string;
  categoryName: string;
  userCompany: string;
  imagePath: string;
  productDescription: string;
  likeNumber:number;
  status:boolean
  addedTime:Date
  starRating:number
}
