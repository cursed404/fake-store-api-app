import { 
  createContext, 
  ReactNode, 
  useContext, 
  useState, 
  useEffect, 
  useMemo 
} from 'react';
import axios from 'axios';

interface FilterContextType {
  searchQuery: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
  setMinPrice: (price: number) => void;
  setMaxPrice: (price: number) => void;
  categories: string[];
  priceRange: { min: number; max: number };
}

const FilterContext = createContext<FilterContextType>({} as FilterContextType);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  // Загрузка категорий и определение диапазона цен
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Загрузка категорий
        const categoriesResponse = await axios.get<string[]>(
          'https://fakestoreapi.com/products/categories'
        );
        setCategories(['all', ...categoriesResponse.data]);

        // Загрузка товаров для определения ценового диапазона
        const productsResponse = await axios.get<Array<{ price: number }>>(
          'https://fakestoreapi.com/products'
        );
        
        const prices = productsResponse.data.map(p => p.price);
        const calculatedMin = Math.floor(Math.min(...prices));
        const calculatedMax = Math.ceil(Math.max(...prices));
        
        setPriceRange({ min: calculatedMin, max: calculatedMax });
        setMinPrice(calculatedMin);
        setMaxPrice(calculatedMax);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, []);

  const value = useMemo(() => ({
    searchQuery,
    category,
    minPrice,
    maxPrice,
    setSearchQuery,
    setCategory,
    setMinPrice,
    setMaxPrice,
    categories,
    priceRange
  }), [searchQuery, category, minPrice, maxPrice, categories, priceRange]);

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};