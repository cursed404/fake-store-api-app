import { useEffect, useState } from 'react';
import { useFilter } from '../context/FilterContext';
import ProductCard from '../components/ProductCard';
import SearchFilter from '../components/SearchFilter';
import { Product } from '../types/product';
import Loading from '../components/Loading';
import ErrorComponent from '../components/Error';

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { 
    searchQuery, 
    category, 
    minPrice, 
    maxPrice 
  } = useFilter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error('Ошибка фетча');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    
    const matchesCategory = category === 'all' || product.category === category;
    
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  if (loading) return <Loading />;
  if (error) return <ErrorComponent message={error} retry={() => window.location.reload()} />;

  return (
    <div className="container mx-auto px-4 py-6">
      <SearchFilter />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
        
        {filteredProducts.length === 0 && (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 text-lg">Нет товаров по выбранным критериям</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;