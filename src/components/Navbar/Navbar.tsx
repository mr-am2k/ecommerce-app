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

const Navbar = () => {
  return (
    <>
      <AppBar position='fixed' className={styles.appBar}>
        <Toolbar>
          <Typography variant='h6' className={styles.title} color='inherit'>
            <img
              src={logo}
              alt='Commerce '
              height='25px'
              className={styles.image}
            />
            Commerce
          </Typography>
          <div className={styles.grow} />
          <div className={styles.button}>
            <IconButton
              aria-label='Show cart items'
              color='inherit'
            >
                <Badge badgeContent={2} color='secondary'>
                    <ShoppingCartIcon/>
                </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
