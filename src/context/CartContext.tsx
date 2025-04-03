import { 
  createContext, 
  ReactNode, 
  useContext, 
  useMemo, 
  useState 
} from 'react';
import { CartItem, Product } from '../types/product';

// Типизация контекста
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  totalItems: number;
  totalPrice: number;
}

// Пропсы для провайдера
interface CartProviderProps {
  children: ReactNode;
  initialItems?: CartItem[]; // Для тестирования и инициализации
}

// Создание контекста с дефолтным значением
const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider = ({ 
  children, 
  initialItems = [] 
}: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialItems);

  // Добавление товара в корзину
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      return existingItem
        ? prev.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev, { ...product, quantity: 1 }];
    });
  };

  // Удаление товара из корзины
  const removeFromCart = (productId: number) => {
    setCartItems(prev => 
      prev.filter(item => item.id !== productId)
    );
  };

  // Мемо значение контекста
  const value = useMemo(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: Number(cartItems
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2))
  }), [cartItems]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Хук контекста
export const useCart = () => {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCart должен использоваться в CartProvider');
  }
  
  return context;
};