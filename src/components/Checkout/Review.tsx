import { Typography, List, ListItem, ListItemText } from '@mui/material';
type Props = {
  children?: React.ReactNode;
  checkoutToken: any;
  shipPrice: number;
  shippingOption: string | undefined;
};
const Review: React.FC<Props> = ({
  checkoutToken,
  shipPrice,
  shippingOption,
}) => {
  return (
    <>
      <Typography variant='h6' gutterBottom>
        Naruceni proizvodi
      </Typography>
      <List disablePadding>
        {checkoutToken.line_items.map((product: any) => (
          <ListItem style={{ padding: '10px 0' }} key={product.name}>
            <ListItemText
              primary={product.name}
              secondary={`Quantity: ${product.quantity}`}
            />
            <Typography variant='body2'>
              {product.line_total.formatted_with_code}
            </Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: '10px 0' }}>
          <ListItemText primary={'Postarina'} secondary={shippingOption} />
          <Typography variant='body2'>{shipPrice + '.00 BAM'}</Typography>
        </ListItem>
        <ListItem style={{ padding: '10px 0' }}>
          <ListItemText primary='Ukupno' />
          <Typography variant='h6'>
            {checkoutToken.subtotal.raw + shipPrice + '.00 BAM'}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default Review;
