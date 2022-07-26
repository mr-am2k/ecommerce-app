import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from '@mui/material';
import styles from './CartItem.module.css';

type Props = {
  children?: React.ReactNode;
  cartItem: any | undefined;
};

const CartItem: React.FC<Props> = ({ cartItem }) => {
  return (
    <Card>
      <CardMedia className={styles.media} image={cartItem.image.url} />
      <CardContent className={styles.cardContent}>
        <Typography variant='h5'>{cartItem.name}</Typography>
        <Typography variant='h5'>
          {cartItem.price.formatted_with_code}
        </Typography>
      </CardContent>
      <CardActions className={styles.cardActions}>
        <div className={styles.buttons}>
          <Button type='button' size='small'>
            -
          </Button>
          <Typography>{cartItem.quantity}</Typography>
          <Button type='button' size='small'>
            +
          </Button>
        </div>
        <Button variant='contained' type='button' color='secondary'>
          Ukloni
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
