import { useState, useEffect } from 'react';
import { Navbar, Products, Cart } from './components';
import { commerce } from './lib/commerce';
import ProductModel from './models/product-model';
const App = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [cart, setCart] = useState<any>();

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
    const data = await commerce.cart.retrieve();
    setCart(data);
  };

  const addToCartHandler = async (productID: string, quantity: number) => {
    const item = await commerce.cart.add(productID, quantity);
    setCart(item);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  return (
    <div className='App'>
      <Navbar
        cartAmount={
          cart?.line_items.length === undefined ? 0 : cart!.line_items.length
        }
      />
      {/* <Products products={products} onAddToCart={addToCartHandler} /> */}
      <Cart cartData={cart} />
    </div>
  );
};

export default App;
