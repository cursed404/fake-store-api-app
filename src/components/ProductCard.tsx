import { Button, Card, CardContent, Typography } from '@mui/material'
import { Product } from '../types/product'
import { useCart } from '../context/CartContext'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart()

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <img
        src={product.image}
        alt={product.title}
        className="h-48 object-contain p-4 bg-white"
      />

      <CardContent className="flex-1 flex flex-col">
        <Typography 
          gutterBottom 
          variant="h6" 
          className="font-semibold line-clamp-2 mb-2"
        >
          {product.title}
        </Typography>

        <div className="mt-auto">
          <Typography 
            variant="body2" 
            className="text-gray-500 mb-2 line-clamp-3"
          >
            {product.description}
          </Typography>

          <div className="flex justify-between items-center mt-4">
            <Typography 
              variant="h6" 
              className="font-bold text-blue-600"
            >
              ${product.price.toFixed(2)}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={() => addToCart(product)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard