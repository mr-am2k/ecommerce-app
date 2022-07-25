import ProductModel from './product-model';
class CartModel {
  listOfItems: ProductModel[]; 
  totalPrice: number;

  constructor(listOfItems: ProductModel[], totalPrice: number) {
    this.listOfItems = listOfItems;
    this.totalPrice = totalPrice;
  }
}

export default CartModel;
