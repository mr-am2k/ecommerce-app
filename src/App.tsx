import { useState, useEffect } from 'react';
import { Navbar, Products } from './components';
import { commerce } from './lib/commerce';
import ProductModel from './models/product-model';
const App = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);

  const fetchProducts = async () => {
    const response = await commerce.products.list();
    const { data } = response;
    data.forEach((watch: any, index: number) => {
      const newWatch: ProductModel = new ProductModel(
        index,
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

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className='App'>
      <Navbar />
      <Products products={products} />
    </div>
  );
};

export default App;
