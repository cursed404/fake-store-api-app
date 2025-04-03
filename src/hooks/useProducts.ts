import { useEffect, useState } from 'react'
import axios from 'axios'
import { Product } from '../types/product';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('https://fakestoreapi.com/products')
        setProducts(data)
      } catch (err) {
        setError('Ошибка фетча')
      } finally {
        setLoading(false)
      }
    }
    
    fetchProducts()
  }, [])

  return { products, loading, error }
}