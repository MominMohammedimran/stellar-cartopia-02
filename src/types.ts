
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPercentage: number;
  category: string;
  brand: string;
  rating: number;
  stock: number;
  tags: string[];
  colors?: string[];
  sizes?: string[];
  images: string[];
};

export type CartItemType = {
  id: string;
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

export type Order = {
  id: string;
  userId: string;
  items: CartItemType[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  shippingAddress: {
    fullName: string;
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
};
