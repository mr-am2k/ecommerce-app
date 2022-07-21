import Grid from '@mui/material/Grid';
import Product from './Product';
import styles from './Products.module.css'
import ProductModel from '../../models/product-model';

const products: ProductModel[] = [
  new ProductModel(1, 'Phone', 'Best phone in the market', '$520'),
  new ProductModel(2, 'Laptop', 'Best laptop in the market', '$1500'),
];

const Products = () => {
  return (
    <div>
      <Grid container spacing={4} justifyContent='center'>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Products;
