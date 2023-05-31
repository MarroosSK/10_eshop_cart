import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../features/shoppingCartSlice';
import { ProductType } from '../../types/types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {Button, Typography, Stack} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';



const ProductItems  = ({ singleProduct }: {singleProduct: ProductType}) => {
  const [selectedSize, setSelectedSize] = useState('');

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItemToCart({ item: singleProduct, size: selectedSize }));
  };

  const handleSizeChange = (event: SelectChangeEvent<string>) => {
    setSelectedSize(event.target.value);
  };
  console.log(singleProduct)
  return (
    <Card sx={{ width: "200px", margin: "10px" }}>
      <CardMedia component="img" height="220" image={singleProduct.image} alt={singleProduct.title} />
      <CardContent sx={{height: "100px"}}>
        <Typography variant="h6" gutterBottom>{singleProduct.title}</Typography>
        <Stack direction={"column"}>
          <Typography variant="caption">{`Price: ${singleProduct.price.toFixed(2)} ${singleProduct.currencyFormat}`}</Typography>
          <Select value={selectedSize} onChange={handleSizeChange} label="Size" size='small'>
            {singleProduct.availableSizes.map((size) => (
              <MenuItem value={size.sizeSize} key={size.sizeId}>
                {size.sizeSize}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </CardContent>
      <CardActions sx={{height: "70px"}}>
        <Button size="small" color="primary" onClick={handleAddToCart} disabled={!selectedSize} sx={{alignSelf: "end"}}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductItems;


