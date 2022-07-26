import {
  Container,
  Typography,
  Button,
  Grid,
  getCardActionAreaUtilityClass,
} from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './Cart.module.css';
import ProductModel from '../../models/product-model';
import CartItem from './CartItem';

type Props = {
  children?: React.ReactNode;
  cartData: any | undefined;
  updateCart: (productID: string, quantity: number) => Promise<void>;
  removeFromCart: (productID: string) => Promise<void>;
  emptyCart: () => Promise<void>;
};
const Cart: React.FC<Props> = ({ cartData, updateCart, removeFromCart, emptyCart }) => {
  const isEmpty = !cartData;
  const EmptyCart = () => (
    <Typography variant='subtitle1' className={styles.cart}>
      Nemate proizvoda u korpi, <Link to='/'>dodajte proizvode</Link>!
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid className={styles.cart} container spacing={3}>
        {cartData!.line_items.map((item: ProductModel) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem cartItem={item} updateCart={updateCart} removeFromCart={removeFromCart} />
          </Grid>
        ))}
      </Grid>
      <div className={styles.cardDetails}>
        <Typography variant='h4'>
          Ukupna cijena: {cartData!.subtotal.formatted_with_code}
        </Typography>
        <div className={styles.buttons}>
          <Button
            onClick={emptyCart}
            className={`${styles.emptyButton} ${styles.button}`}
            size='large'
            color='secondary'
            type='button'
            variant='contained'
          >
            Isprazni korpu
          </Button>
          <Button
            className={`${styles.checkoutButton} ${styles.button}`}
            size='large'
            color='primary'
            type='button'
            variant='contained'
          >
            Plati
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={styles.toolbar} />
      <Typography className={styles.title} variant='h3'>
        Vasa korpa
      </Typography>
      {isEmpty ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
