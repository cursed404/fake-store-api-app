export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export type CategoryOption = 
  | 'all' 
  | 'electronics' 
  | 'jewelery' 
  | "men's clothing" 
  | "women's clothing";