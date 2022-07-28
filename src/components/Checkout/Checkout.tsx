import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Divider,
  Button,
} from '@mui/material';

import { commerce } from '../../lib/commerce';
import ShippingData from '../../models/shipping-data';
import styles from './Checkout.module.css';

const steps = ['Adresa primaoca', 'Detalji uplate'];

type Props = {
  children?: React.ReactNode;
  cart: any;
  onPayment: (checkoutTokenID: string, newOrder: any) => Promise<void>;
};

const Checkout: React.FC<Props> = ({ cart, onPayment }) => {
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
      } catch (error) {
        console.log(error);
      }
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
    nextStep();
  };

  const Confirmation = () => (
    <div>
      <Typography variant='h5'>Hvala na narudzbi</Typography>
      <Divider className={styles.divider} />
      <br />
      <Button type='button' variant='outlined' component={Link} to='/'>
        Nazad na pocetnu stranicu
      </Button>
    </div>
  );

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm next={next} checkoutToken={checkoutToken} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        previousStep={previousStep}
        onPayment={onPayment}
        nextStep={nextStep}
      />
    );
  return (
    <>
      <div className={styles.toolbar} />
      <main className={styles.layout}>
        <Paper className={styles.paper}>
          <Typography variant='h4' align='center'>
            Placanje
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
