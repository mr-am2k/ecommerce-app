import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import logo from '../../assets/ecommerce-logo.png';

import styles from './Navbar.module.css';

type Props = {
  children?: React.ReactNode;
  cartAmount: number;
};
const Navbar: React.FC<Props> = ({ cartAmount }) => {
  return (
    <>
      <AppBar position='fixed' className={styles.appBar}>
        <Toolbar>
          <Typography variant='h6' className={styles.title}>
            <img
              src={logo}
              alt='Commerce'
              height='25px'
              className={styles.image}
            />
            Sat na ruci
          </Typography>
          <div className={styles.grow} />
          <div>
            <IconButton
              aria-label='Show cart items'
              className={styles.cartButton}
            >
              <Badge badgeContent={cartAmount} color='secondary'>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
