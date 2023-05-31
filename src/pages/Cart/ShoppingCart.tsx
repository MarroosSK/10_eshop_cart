import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { removeItemFromCart, clearCart, decrementItemQuantity, incrementItemQuantity } from '../../features/shoppingCartSlice';
import { Avatar, Box, Button, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const { cart, totalPrice, totalQuantity } = useSelector((state: RootState) => state.shoppingCart);

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeItemFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleDecrementQuantity = (id: number, size: string) => {
    dispatch(decrementItemQuantity({ id: id, size: size }));
  };

  const handleIncrementQuantity = (id: number, size: string) => {
    dispatch(incrementItemQuantity({ id: id, size: size }));
  };


  // convert cart object to an array
  const cartItems = Object.values(cart);
  console.log(cartItems)

  
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>Shopping Cart</Typography>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {cartItems && cartItems.map((item) => (
          <ListItem key={item.item.id + item.size}>
            <ListItemAvatar>
              <Avatar alt={item.item.title} src={item.item.image} />
            </ListItemAvatar>
            <ListItemText
              primary={item.item.title}
              secondary={
                <>
                  {`${item.quantity} x ${item.item.price.toFixed(2)} ${item.item.currencyFormat}`}
                  {item.size && <div>Size: {item.size}</div>}
                </>
              }
            />
            <ListItemSecondaryAction>
              <IconButton 
                edge="end" 
                aria-label="decrement" 
                onClick={() => handleDecrementQuantity(item.item.id, item.size)} 
                disabled={item.quantity === 1}
              >
                <RemoveIcon />
              </IconButton>
              <IconButton 
                edge="end" 
                aria-label="increment" 
                onClick={() => handleIncrementQuantity(item.item.id, item.size)} 
                disabled={
                    item.item.availableSizes.find(
                      s => s.sizeSize === item.size && s.sizeQuantity <= item.quantity
                    ) !== undefined
                  }

              >
                <AddIcon />
              </IconButton>
              <IconButton 
                edge="end" 
                aria-label="delete" 
                onClick={() => handleRemoveFromCart(String(item.item.id + item.size))}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Typography variant="subtitle1" sx={{ mt: 4 }}>Total quantity: {totalQuantity}</Typography>
      <Typography variant="subtitle1">Total price: {totalPrice.toFixed(2)} {cartItems[0]?.item.currencyFormat}</Typography>
      <Button onClick={handleClearCart} sx={{ mt: 4 }}>Clear cart</Button>
    </Box>
  );
};

export default ShoppingCart;