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
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );

  const options = shippingOptions.map((shippingOption: any) => ({
    id: shippingOption.id,
    value: shippingOption.description,
    label: `${shippingOption.description} - ${shippingOption.price.formatted_with_code}`
  }));

  const fetchShippingCountries = async (checkoutTokenID: string) => {
    const response = await commerce.services.localeListShippingCountries(
      checkoutTokenID
    );
    setShippingCountries(response.countries);
    setShippingCountry(Object.values(response.countries)[0] as string);
  };

  const fetchSubdivisions = async (countryCode: string) => {
    const response = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisions(response.subdivisions);
    setShippingSubdivision(Object.values(response.subdivisions)[0] as string);
  };

  const fetchShippingOptions = async (
    checkoutTokenID: string,
    country: string,
    region: string | null = null
  ) => {
    const response = await commerce.checkout.getShippingOptions(
      checkoutTokenID,
      { country, region }
    );
    console.log(response)
    setShippingOptions(response);
    setShippingOption(response[0].description);
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
  }, []);

  useEffect(() => {
    if (shippingCountry) {
      countries.forEach((country: any) => {
        if (shippingCountry === country.label) {
          fetchSubdivisions(country.id);
        }
      });
    }
    console.log(shippingCountry)
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision) {
      countries.forEach((country:any) =>{
        if(country.label === shippingCountry){
          subdivisions.forEach((subdivision:any)=>{
            if(subdivision.label === shippingSubdivision ){
              fetchShippingOptions(
               checkoutToken.id,
               country.id,
               subdivision.id
              )
            }
          })
        }
      }) 
    }
  }, [shippingSubdivision]);
  return (
    <>
      <Typography className={styles.formTitle} gutterBottom variant='h6'>
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
            <Grid className={styles.address} item xs={12} sm={6}>
              <InputLabel>Regija</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(event) => setShippingSubdivision(event.target.value)}
              >
                {subdivisions.map((subdivision: any) => (
                  <MenuItem key={subdivision.id} value={subdivision.label}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid className={styles.address} item xs={12} sm={6}>
              <InputLabel>Opcije</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(event) => setShippingOption(event.target.value)}
              >
                {options.map((option: any) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
