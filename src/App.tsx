import { useState, useEffect } from 'react';
import { Navbar, Products } from './components';
import { commerce } from './lib/commerce';
import ProductModel from './models/product-model';
import CartModel from './models/cart-model';
const App = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [cart, setCart] = useState<CartModel>()

  const fetchProducts = async () => {
    const response = await commerce.products.list();
    const { data } = response;
    data.forEach((watch: any, index: number) => {
      const newWatch: ProductModel = new ProductModel(
        watch.id,
        watch.name,
        watch.description,
        watch.image.url,
        watch.price.formatted_with_code
      );
      setProducts((prevProducts: ProductModel[]) => {
        return [...prevProducts, newWatch];
      });
    });
  };

  const fetchCart = async () => {
      const data =  await commerce.cart.retrieve();
      const newCart: CartModel = new CartModel(data.line_items, data.subtotal.formatted)
      setCart(newCart)
  }

  const addToCartHandler = async (productID: string, quantity: number) => {
    const item = await commerce.cart.add(productID, quantity)
    let cartItems: ProductModel[] = [];
    item.cart.line_items.forEach((item:any) => (
      cartItems.push({
        "id": item.id,
        "name": item.name,
        "description": 'Opis', //it's hardcoded because it's needed for ProductModel, but it's not provided by the commercejs in this case
        "image": item.image.url,
        "price": item.price.formatted_with_code 
      }
      )
    ))
    const newItem: CartModel = new CartModel(cartItems, item.cart.subtotal.formatted)
    setCart(newItem)
  }


  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  return (
    <div className='App'>
      <Navbar cartAmount = {cart?.listOfItems.length === undefined ? 0 : cart!.listOfItems.length }/>
      <Products products={products} onAddToCart={addToCartHandler} />
    </div>
  );
};

export default App;
