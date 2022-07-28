import { useState, useRef, useEffect } from 'react';
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { commerce } from '../../lib/commerce';
import ShippingData from '../../models/shipping-data';
import styles from './AddressForm.module.css';

type Props = {
  children?: React.ReactNode;
  next: (data: ShippingData) => void;
  checkoutToken: any;
};

const AddressForm: React.FC<Props> = ({ checkoutToken, next }) => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const postalCodeRef = useRef<HTMLInputElement>(null);

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
    label: `${shippingOption.description} - ${shippingOption.price.formatted_with_code}`,
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
    setShippingOptions(response);
    setShippingOption(response[0].description);
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const shippingData: ShippingData = new ShippingData(
      firstNameRef.current!.value,
      lastNameRef.current!.value,
      addressRef.current!.value,
      emailRef.current!.value,
      cityRef.current!.value,
      postalCodeRef.current!.value,
      shippingCountry,
      shippingSubdivision,
      shippingOption
    );
    next(shippingData);
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
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision) {
      countries.forEach((country: any) => {
        if (country.label === shippingCountry) {
          subdivisions.forEach((subdivision: any) => {
            if (subdivision.label === shippingSubdivision) {
              fetchShippingOptions(
                checkoutToken.id,
                country.id,
                subdivision.id
              );
            }
          });
        }
      });
    }
  }, [shippingSubdivision]);
  return (
    <>
      <Typography className={styles.formTitle} gutterBottom variant='h6'>
        Podaci za dostavu
      </Typography>
      {!shippingOption && (
        <div className={styles.spinner}>
          <CircularProgress />
        </div>
      )}
      {shippingOption && (
        <form onSubmit={submitHandler} className={styles.form}>
          <Grid className={styles.formContent} container spacing={3}>
            <input
              ref={firstNameRef}
              className={styles.textField}
              name='firstName'
              placeholder='Ime*'
              required
            />
            <input
              ref={lastNameRef}
              className={styles.textField}
              name='lastName'
              placeholder='Prezime*'
              required
            />
            <input
              ref={addressRef}
              className={styles.textField}
              name='address1'
              placeholder='Adresa*'
              required
            />
            <input
              ref={emailRef}
              className={styles.textField}
              name='email'
              placeholder='E-mail*'
              required
            />
            <input
              ref={cityRef}
              className={styles.textField}
              name='city'
              placeholder='Grad*'
              required
            />
            <input
              ref={postalCodeRef}
              className={styles.textField}
              name='postalCode'
              placeholder='Postanski broj*'
              required
            />

            <Grid className={styles.address} item xs={12} sm={6}>
              <InputLabel>Drzava</InputLabel>
              <Select
                className={styles.addressSelect}
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
              <InputLabel className={styles.singleAddressSelect}>
                Regija
              </InputLabel>
              <Select
                className={`${styles.addressSelect} ${styles.singleAddressSelect} `}
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
                className={styles.addressSelect}
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
          <br />
          <div className={styles.buttons}>
            <Button
              className={styles.buttonLeft}
              component={Link}
              to='/cart'
              variant='outlined'
            >
              Korpa
            </Button>
            <Button
              type='submit'
              className={styles.buttonRight}
              variant='contained'
              color='primary'
            >
              Naprijed
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default AddressForm;
