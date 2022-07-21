import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import styles from './Product.module.css';
import ProductModel from '../../models/product-model';

type Props = {
  children?: React.ReactNode;
  product: ProductModel;
};
const Product: React.FC<Props> = ({ product }) => {
  return (
    <Card className={styles.root}>
      <CardMedia className={styles.media} image='' title={product.name} />
      <CardContent>
        <div className={styles.cardContent}>
          <Typography variant='h5' gutterBottom>
            {product.name}
          </Typography>
          <Typography variant='h5' gutterBottom>
            {product.price}
          </Typography>
        </div>
        <Typography variant='h2' color='textSecondary'>
          {product.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={styles.CardActions}>
        <IconButton aria-label='Add to Cart'>
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
