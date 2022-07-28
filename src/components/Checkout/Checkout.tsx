import { useState, useEffect } from 'react';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from '@mui/material';
import { commerce } from '../../lib/commerce';
import styles from './Checkout.module.css';

const steps = ['Shipping address', 'Payment details'];

const Confirmation = () => <div>Confirmation</div>;

type Props = {
  children?: React.ReactNode;
  cart: any;
};

type ShippingData = {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  city: string;
  postalCode: string;
  shippingCountry: string;
  shippingSubdivision: string;
  shippingOption: string;
};

const Checkout: React.FC<Props> = ({ cart }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState('');
  const [shippingData, setShippingData] = useState<ShippingData>();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: 'cart',
        });
        setCheckoutToken(token);
      } catch (error) {}
    };
    generateToken();
  }, [cart]);

  const nextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };
  const previousStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const next = (data: ShippingData) => {
    setShippingData(data);
    nextStep()
  };
  const Form = () =>
    activeStep === 0 ? (
      <AddressForm next={next} checkoutToken={checkoutToken} />
    ) : (
      <PaymentForm />
    );
  return (
    <>
      <div className={styles.toolbar} />
      <main className={styles.layout}>
        <Paper className={styles.paper}>
          <Typography variant='h4' align='center'>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={styles.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
