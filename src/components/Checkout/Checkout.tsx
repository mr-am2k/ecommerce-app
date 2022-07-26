import { useState } from 'react';
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
import styles from './Checkout.module.css';

const steps =['Shipping address', 'Payment details']

const Confirmation = () => (
    <div>Confirmation</div>
)

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0)
    const Form = () => activeStep === 0 ? <AddressForm/> : <PaymentForm/>
  return (
    <>
      <div className={styles.toolbar} />
      <main className={styles.layout}>
        <Paper className={styles.paper}>
            <Typography variant='h4' align='center'>Checkout</Typography>
            <Stepper activeStep={activeStep} className={styles.stepper}>
                {steps.map((step) =>(
                    <Step key={step}>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length ? <Confirmation/> : <Form/>}
        </Paper>

      </main>
    </>
  );
};

export default Checkout;
