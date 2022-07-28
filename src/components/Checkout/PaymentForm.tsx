import { Typography, Button, Divider } from '@mui/material';
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';
import ShippingData from '../../models/shipping-data';
import styles from './PaymentForm.module.css';

type Props = {
  children?: React.ReactNode;
  shippingData: ShippingData | undefined;
  checkoutToken: any;
};
const PaymentForm: React.FC<Props> = ({ shippingData, checkoutToken }) => {
  console.log(checkoutToken)
  return (
    <>
      <Review checkoutToken={checkoutToken} />
    </>
  );
};

export default PaymentForm;
