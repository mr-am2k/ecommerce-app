import Grid from '@mui/material/Grid';
import Product from './Product';
import styles from './Products.module.css'
import ProductModel from '../../models/product-model';

// const products: ProductModel[] = [
//   new ProductModel(1, 'iPhone 11', 'Best phone in the market', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWYH2_AV1?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1590868808000','$520'),
//   new ProductModel(2, 'MacBook Pro 16', 'Best laptop in the market','https://www.apple.com/v/macbook-pro-14-and-16/b/images/overview/hero/hero_intro_endframe__e6khcva4hkeq_large.jpg', '$1500'),
// ];

type Props = {
  children?: React.ReactNode;
  products: ProductModel[];
  onAddToCart: (productID: string, quantity: number) => Promise<void> 
};

const Products: React.FC<Props> = ({products, onAddToCart})=> {
  return (
    <main className={styles.content}>
      <Grid container spacing={4} justifyContent='center'>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart= {onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
