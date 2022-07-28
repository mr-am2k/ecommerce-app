class ShippingData {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  city: string;
  postalCode: string;
  shippingCountry: string;
  shippingSubdivision: string;
  shippingOption: string;

  constructor(
    firstName: string,
    lastName: string,
    address: string,
    email: string,
    city: string,
    postalCode: string,
    shippingCountry: string,
    shippingSubdivision: string,
    shippingOption: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.email = email;
    this.city = city;
    this.postalCode = postalCode;
    this.shippingCountry = shippingCountry;
    this.shippingSubdivision = shippingSubdivision;
    this.shippingOption = shippingOption;
  }
}

export default ShippingData;
