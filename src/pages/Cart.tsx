import { Button, Typography, Divider } from '@mui/material';
import { useCart } from '../context/CartContext';
import CartItemComponent from '../components/CartItem';

const Cart = () => {
  const { cartItems, totalPrice, removeFromCart } = useCart();

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty</Typography>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItemComponent
              key={item.id}
              item={item}
              onRemove={() => removeFromCart(item.id)}
            />
          ))}
          
          <Divider className="my-4" />
          
          <div className="flex justify-between items-center">
            <Typography variant="h6">
              Total: ${totalPrice.toFixed(2)}
            </Typography>
            {/* оформление заказа */}
            <Button variant="contained" color="primary"> 
              Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;