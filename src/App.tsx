import { useState, useEffect } from 'react';
import { Navbar, Products, Cart } from './components';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { commerce } from './lib/commerce';
import ProductModel from './models/product-model';
const App = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [cart, setCart] = useState<any>();
  const navigate = useNavigate();

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
    const response = await commerce.cart.retrieve();
    setCart(response);
  };

  const addToCartHandler = async (productID: string, quantity: number) => {
    const response = await commerce.cart.add(productID, quantity);
    setCart(response.cart);
  };

  const updateCartQtyHandler = async (productID: string, quantity: number) => {
    const response = await commerce.cart.update(productID, { quantity });
    if(response.cart.line_items.length===0){
      navigate('/')
      setCart(undefined)
    }else{
      setCart(response.cart);
    }
  };

  const removeFromCartHandler = async (productID: string) => {
    const response = await commerce.cart.remove(productID);
    if(response.success){
      navigate('/')
      setCart(undefined)
    }
  };

  const emptyCartHandler = async () => {
    const response = await commerce.cart.empty();
    if (response.success) {
      navigate('/');
      setCart(undefined);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  return (
    <div className='App'>
      <Navbar
        cartAmount={!cart?.line_items ? undefined : cart!.line_items.length}
      />
      <Routes>
        <Route
          path='/'
          element={
            <Products products={products} onAddToCart={addToCartHandler} />
          }
        />
        <Route
          path='/cart'
          element={
            <Cart
              cartData={cart}
              updateCart={updateCartQtyHandler}
              removeFromCart={removeFromCartHandler}
              emptyCart={emptyCartHandler}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
