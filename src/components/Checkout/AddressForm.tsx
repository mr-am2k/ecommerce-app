import { useState, useRef, useEffect } from 'react';
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  TextField,
} from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { commerce } from '../../lib/commerce';
import styles from './AddressForm.module.css';

type Props = {
  children?: React.ReactNode;
  checkoutToken: any;
};

const AddressForm: React.FC<Props> = ({ checkoutToken }) => {
  const methods = useForm();
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const postalCodeRef = useRef<HTMLInputElement>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivsions] = useState([]);
  const [shippingSubdivision, setShippingSubdivsion] = useState();
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState();

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  console.log(countries);

  const fetchShippingCountries = async (checkoutTokenID: string) => {
    const response = await commerce.services.localeListShippingCountries(
      checkoutTokenID
    );
    setShippingCountries(response.countries);
    setShippingCountry(Object.keys(response.countries)[0]);
  };

  const submitHandler = () => {
    setFirstName(firstNameRef.current!.value);
    setLastName(lastNameRef.current!.value);
    setAddress(addressRef.current!.value);
    setEmail(emailRef.current!.value);
    setCity(cityRef.current!.value);
    setPostalCode(postalCodeRef.current!.value);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, [checkoutToken]);

  return (
    <>
      <Typography gutterBottom variant='h6'>
        Podaci za dostavu
      </Typography>
      <FormProvider {...methods}>
        <form className={styles.form}>
          <Grid className={styles.formContent} container spacing={3}>
            <TextField
              ref={firstNameRef}
              className={styles.textField}
              fullWidth
              name='firstName'
              label='Ime'
              required
            />
            <TextField
              ref={lastNameRef}
              className={styles.textField}
              fullWidth
              name='lastName'
              label='Prezime'
              required
            />
            <TextField
              ref={addressRef}
              className={styles.textField}
              fullWidth
              name='address1'
              label='Adresa'
              required
            />
            <TextField
              ref={emailRef}
              className={styles.textField}
              fullWidth
              name='email'
              label='E-mail'
              required
            />
            <TextField
              ref={cityRef}
              className={styles.textField}
              fullWidth
              name='city'
              label='Grad'
              required
            />
            <TextField
              ref={postalCodeRef}
              className={styles.textField}
              fullWidth
              name='postalCode'
              label='Postanski broj'
              required
            />
            <Grid className={styles.address} item xs={12} sm={6}>
              <InputLabel>Drzava</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(event) => setShippingCountry(event.target.value)}
              >
                {countries.map((country: any) => (
                  <MenuItem key={country.id} value={country.label}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <InputLabel>Regija</InputLabel>
              <Select value={} fullWidth onChange={}>
                <MenuItem key={} value={}>
                  Select Me
                </MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Opcije</InputLabel>
              <Select value={} fullWidth onChange={}>
                <MenuItem key={} value={}>
                  Select Me
                </MenuItem>
              </Select>
            </Grid> */}
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
