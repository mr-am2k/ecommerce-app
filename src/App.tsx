import { useState, useEffect } from 'react';
import { Navbar, Products, Cart, Checkout } from './components';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { commerce } from './lib/commerce';
import ProductModel from './models/product-model';
const App = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [cart, setCart] = useState<any>();
  const [order, setOrder] = useState<any>({});
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
    setCart(response);
  };

  const updateCartQtyHandler = async (productID: string, quantity: number) => {
    const response = await commerce.cart.update(productID, { quantity });
    if (response.line_items.length === 0) {
      navigate('/');
    setCart(undefined);
    } else {
      setCart(response);
    }
  };

  const removeFromCartHandler = async (productID: string) => {
    const response = await commerce.cart.remove(productID);
    if (response.line_items.length === 0) {
      navigate('/');
      setCart(undefined);
    } else {
      setCart(response);
    }
  };

  const emptyCartHandler = async () => {
    navigate('/');
    const response = await commerce.cart.empty();
    setCart(response.cart);
  };

  const paymentHandler = async (checkoutTokenID: string, newOrder: any) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenID,
        newOrder
      );
      setOrder(incomingOrder);
    } catch (error) {
      const response = await commerce.cart.empty();
      setCart(response.cart); //setting cart to empty cart because order is completed and this is in catch block since there is no connected card to commerce.js so it won't work without it 
    }
  };
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  return (
    <>
      <Navbar
        cartAmount={cart?.line_items ? cart!.line_items.length : undefined}
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

        <Route
          path='/checkout'
          element={<Checkout cart={cart} onPayment={paymentHandler} />}
        />
      </Routes>
    </>
  );
};

export default App;
