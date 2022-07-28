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
  nextStep: () => void;
  previousStep: () => void;
  onPayment: (checkoutTokenID: string, newOrder: any) => Promise<void>;
};

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY!);

const PaymentForm: React.FC<Props> = ({
  shippingData,
  checkoutToken,
  nextStep,
  previousStep,
  onPayment,
}) => {
  let shipPrice:number = 5
  if(shippingData?.shippingOption === 'Balkan') shipPrice = 50
  const submitHandler = async (
    event: React.FormEvent<HTMLFormElement>,
    elements: any,
    stripe: any
  ) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
    if (error) {
      console.log(error);
    } else {
      const orderData = {
        list_items: checkoutToken.line_items,
        customer: {
          firstname: shippingData?.firstName,
          lastname: shippingData?.lastName,
          email: shippingData?.email,
        },
        shipping: {
          name: 'Primary',
          street: shippingData?.address,
          town_city: shippingData?.city,
          county_state: shippingData?.shippingSubdivision,
          postal_zip_code: shippingData?.postalCode,
          country: shippingData?.shippingCountry,
        },
        fullfillment: {
          shipping_method: shippingData?.shippingOption,
        },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      onPayment(checkoutToken.id, orderData);
      nextStep()
    }
  };
  console.log(checkoutToken)
  return (
    <div className={styles.payment}>
      <Review checkoutToken={checkoutToken} shipPrice={shipPrice} shippingOption={shippingData?.shippingOption} />
      <Divider />
      <Typography variant='h6' gutterBottom className={styles.title}>
        Nacin placanja
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                submitHandler(e, elements, stripe)
              }
            >
              <CardElement />
              <br />
              <br />
              <div className={styles.buttons}>
                <Button onClick={previousStep} variant='outlined'>
                  Nazad
                </Button>
                <Button
                  type='submit'
                  variant='contained'
                  disabled={!stripe}
                  color='primary'
                >
                  Plati {checkoutToken.subtotal.raw + shipPrice + '.00 BAM' }
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  );
};

export default PaymentForm;
