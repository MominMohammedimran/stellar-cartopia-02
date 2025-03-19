
import { Product } from '@/types';

// Sample product data
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Minimalist Cotton T-Shirt",
    description: "A comfortable, everyday t-shirt made from 100% organic cotton. Features a relaxed fit and a clean, minimal design that pairs well with anything in your wardrobe.",
    price: 29.99,
    discountPercentage: 0,
    category: "men",
    brand: "Essentials",
    rating: 4.5,
    stock: 50,
    tags: ["organic", "sustainable", "casual", "basic"],
    colors: ["black", "white", "gray", "navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dCUyMHNoaXJ0fGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHQlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHQlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D"
    ]
  },
  {
    id: "2",
    name: "Classic Denim Jacket",
    description: "A timeless denim jacket crafted from premium quality denim. Features a button-up front, chest pockets, and a slightly tailored fit for a modern silhouette.",
    price: 89.99,
    discountPercentage: 15,
    category: "men",
    brand: "Denim Co.",
    rating: 4.8,
    stock: 25,
    tags: ["denim", "jacket", "casual", "layering"],
    colors: ["blue", "black", "light blue"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGVuaW0lMjBqYWNrZXR8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVuaW0lMjBqYWNrZXR8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVuaW0lMjBqYWNrZXR8ZW58MHx8MHx8fDA%3D"
    ]
  },
  {
    id: "3",
    name: "Silk Blouse",
    description: "An elegant silk blouse with a relaxed fit and clean lines. Made from 100% premium silk for a luxurious feel and sophisticated look.",
    price: 125.00,
    discountPercentage: 0,
    category: "women",
    brand: "Luxe Collection",
    rating: 4.6,
    stock: 15,
    tags: ["silk", "blouse", "elegant", "formal"],
    colors: ["ivory", "black", "navy", "emerald"],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1554141220-83411835a60b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2lsayUyMGJsb3VzZXxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1499939667766-4afceb292d05?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2lsayUyMGJsb3VzZXxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNpbGslMjBibG91c2V8ZW58MHx8MHx8fDA%3D"
    ]
  },
  {
    id: "4",
    name: "High-Waisted Jeans",
    description: "Modern high-waisted jeans with a slim fit through the hip and thigh. Made from premium stretch denim for comfort and durability.",
    price: 79.99,
    discountPercentage: 10,
    category: "women",
    brand: "Denim Co.",
    rating: 4.7,
    stock: 30,
    tags: ["denim", "jeans", "high-waisted", "casual"],
    colors: ["blue", "black", "light blue"],
    sizes: ["24", "25", "26", "27", "28", "29", "30"],
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amVhbnN8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGplYW5zfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1604176424472-9d7545fb5c27?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGplYW5zfGVufDB8fDB8fHww"
    ]
  },
  {
    id: "5",
    name: "Leather Weekender Bag",
    description: "Handcrafted leather weekender bag with ample storage space, durable canvas lining, and antique brass hardware. Perfect for short trips and weekend getaways.",
    price: 249.99,
    discountPercentage: 0,
    category: "accessories",
    brand: "Heritage Leather",
    rating: 4.9,
    stock: 10,
    tags: ["leather", "bag", "travel", "premium"],
    colors: ["brown", "black", "tan"],
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVhdGhlciUyMGJhZ3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1524498250077-390f9e378fc0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGVhdGhlciUyMGJhZ3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1473188588951-666fce8e7c68?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGVhdGhlciUyMGJhZ3xlbnwwfHwwfHx8MA%3D%3D"
    ]
  },
  {
    id: "6",
    name: "Minimal Wristwatch",
    description: "A sleek, minimalist wristwatch with a clean dial, premium leather strap, and Japanese quartz movement. Water-resistant up to 30 meters.",
    price: 149.99,
    discountPercentage: 0,
    category: "accessories",
    brand: "Timepiece",
    rating: 4.7,
    stock: 20,
    tags: ["watch", "minimal", "accessory", "premium"],
    colors: ["black", "brown", "navy"],
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d3Jpc3R3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d3Jpc3R3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdyaXN0d2F0Y2h8ZW58MHx8MHx8fDA%3D"
    ]
  },
  {
    id: "7",
    name: "Wool Blend Coat",
    description: "A sophisticated wool blend coat with a tailored silhouette, notched lapels, and a back vent for ease of movement. Perfect for cooler weather and dressed-up occasions.",
    price: 189.99,
    discountPercentage: 20,
    category: "women",
    brand: "Modern Classic",
    rating: 4.6,
    stock: 15,
    tags: ["coat", "wool", "winter", "formal"],
    colors: ["camel", "black", "gray"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1548624313-0396c75ad2b4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29vbCUyMGNvYXR8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29vbCUyMGNvYXR8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1578102718171-ec1f91680562?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29vbCUyMGNvYXR8ZW58MHx8MHx8fDA%3D"
    ]
  },
  {
    id: "8",
    name: "Knit Sweater",
    description: "A cozy knit sweater made from a soft wool blend. Features a relaxed fit and ribbed details at the neck, cuffs, and hem for a classic look.",
    price: 69.99,
    discountPercentage: 0,
    category: "men",
    brand: "Essentials",
    rating: 4.5,
    stock: 25,
    tags: ["sweater", "knit", "winter", "casual"],
    colors: ["navy", "gray", "burgundy", "forest green"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1577380269534-76d7c8cfc1ce?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8a25pdCUyMHN3ZWF0ZXJ8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8a25pdCUyMHN3ZWF0ZXJ8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1584652514158-55ab0b564d15?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8a25pdCUyMHN3ZWF0ZXJ8ZW58MHx8MHx8fDA%3D"
    ]
  },
  {
    id: "9",
    name: "Leather Wallet",
    description: "A slim leather wallet crafted from full-grain leather. Features multiple card slots, a bill compartment, and RFID blocking technology.",
    price: 45.99,
    discountPercentage: 0,
    category: "accessories",
    brand: "Heritage Leather",
    rating: 4.7,
    stock: 35,
    tags: ["wallet", "leather", "accessory", "gift"],
    colors: ["brown", "black", "tan"],
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVhdGhlciUyMHdhbGxldHxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1556774687-0e2fdd0116c0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGVhdGhlciUyMHdhbGxldHxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1606323518427-ebf485e02dcb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGVhdGhlciUyMHdhbGxldHxlbnwwfHwwfHx8MA%3D%3D"
    ]
  },
  {
    id: "10",
    name: "Linen Summer Dress",
    description: "A breezy linen dress perfect for warm days. Features a relaxed fit, adjustable straps, and side pockets. Made from 100% premium linen.",
    price: 85.99,
    discountPercentage: 10,
    category: "women",
    brand: "Summer Essentials",
    rating: 4.8,
    stock: 20,
    tags: ["dress", "linen", "summer", "casual"],
    colors: ["white", "beige", "light blue", "terracotta"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGluZW4lMjBkcmVzc3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGluZW4lMjBkcmVzc3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGluZW4lMjBkcmVzc3xlbnwwfHwwfHx8MA%3D%3D"
    ]
  },
  {
    id: "11",
    name: "Canvas Backpack",
    description: "A durable canvas backpack with leather accents and antique brass hardware. Features a spacious main compartment, multiple pockets, and padded laptop sleeve.",
    price: 65.99,
    discountPercentage: 0,
    category: "accessories",
    brand: "Urban Explorer",
    rating: 4.6,
    stock: 30,
    tags: ["backpack", "canvas", "school", "travel"],
    colors: ["olive", "navy", "black", "gray"],
    images: [
      "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FudmFzJTIwYmFja3BhY2t8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FudmFzJTIwYmFja3BhY2t8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhbnZhcyUyMGJhY2twYWNrfGVufDB8fDB8fHww"
    ]
  },
  {
    id: "12",
    name: "Athletic Sneakers",
    description: "Versatile athletic sneakers with lightweight cushioning, breathable mesh upper, and durable rubber outsole. Perfect for workouts or casual wear.",
    price: 99.99,
    discountPercentage: 15,
    category: "men",
    brand: "Active Step",
    rating: 4.7,
    stock: 40,
    tags: ["shoes", "athletic", "running", "workout"],
    colors: ["black/white", "gray/blue", "all black"],
    sizes: ["8", "9", "10", "11", "12"],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c25lYWtlcnN8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnN8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c25lYWtlcnN8ZW58MHx8MHx8fDA%3D"
    ]
  }
];

// API function to get all products
export const getProducts = async (): Promise<Product[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return sampleProducts;
};

// API function to get product by ID
export const getProductById = async (id: string): Promise<Product> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const product = sampleProducts.find(p => p.id === id);
  
  if (!product) {
    throw new Error(`Product with ID ${id} not found`);
  }
  
  return product;
};

// API function to get products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return sampleProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
};

// API function to search products
export const searchProducts = async (query: string): Promise<Product[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const lowerCaseQuery = query.toLowerCase();
  
  return sampleProducts.filter(p => 
    p.name.toLowerCase().includes(lowerCaseQuery) || 
    p.description.toLowerCase().includes(lowerCaseQuery) ||
    p.brand.toLowerCase().includes(lowerCaseQuery) ||
    p.category.toLowerCase().includes(lowerCaseQuery) ||
    p.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
  );
};
