import { IconButton, Typography, styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CartItem } from '../types/product';
import React from 'react';

interface CartItemProps {
  item: CartItem;
  onRemove: () => void;
}

const CartItemContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.shape.borderRadius,
}));

const ProductImage = styled('img')({
  width: 80,
  height: 80,
  objectFit: 'contain',
  backgroundColor: 'white',
  padding: '8px',
  borderRadius: '8px',
});

const CartItemComponent: React.FC<CartItemProps> = ({ item, onRemove }) => {
  return (
    <CartItemContainer>
      <ProductImage
        src={item.image}
        alt={item.title}
      />
      
      <div style={{ flexGrow: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.category}
        </Typography>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Typography variant="body1">
          ${item.price.toFixed(2)} × {item.quantity}
        </Typography>
        <IconButton 
          onClick={onRemove}
          color="error"
          aria-label="Remove item"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
    </CartItemContainer>
  );
};

export default React.memo(CartItemComponent);