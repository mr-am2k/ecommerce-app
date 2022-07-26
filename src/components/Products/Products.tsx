import Grid from '@mui/material/Grid';
import Product from './Product';
import styles from './Products.module.css';
import ProductModel from '../../models/product-model';

type Props = {
  children?: React.ReactNode;
  products: ProductModel[];
  onAddToCart: (productID: string, quantity: number) => Promise<void>;
};

const Products: React.FC<Props> = ({ products, onAddToCart }) => {
  return (
    <main className={styles.content}>
      <Grid container spacing={4} justifyContent='center'>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
