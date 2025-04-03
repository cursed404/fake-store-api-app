import { AppBar, Toolbar, Badge, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

const Header = () => {
  const { totalItems } = useCart()

  return (
    <AppBar position="sticky" className="bg-white shadow-sm">
      <Toolbar className="flex justify-between">
        <Link to="/" className="no-underline">
          <Button 
            color="inherit" 
            className="text-black text-xl font-bold"
          >
            FakeStore
          </Button>
        </Link>

        <Link to="/cart" className="no-underline">
          <Button 
            variant="text" 
            color="inherit" 
            startIcon={
              <Badge 
                badgeContent={totalItems} 
                color="error"
                className="text-black"
              >
                <ShoppingCartIcon />
              </Badge>
            }
            className="text-black"
          >
            Cart
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default Header