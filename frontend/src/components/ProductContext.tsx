import { createContext, useContext, useState, ReactNode } from 'react';

export interface MonthlySales {
  month: string; // Format: "2024-01"
  units: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  costPrice: number;
  sellingPrice: number;
  profitMargin: number;
  sizes: string[];
  colors: string[];
  image: string;
  soldCount: number;
  addedDate: string;
  monthlySales: MonthlySales[];
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'soldCount' | 'addedDate'>) => void;
  updateProductSales: (productId: string, quantity: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Elite Performance Tee',
      description: 'Premium moisture-wicking fabric with advanced breathability for peak performance during intense workouts.',
      category: 'tops',
      costPrice: 45,
      sellingPrice: 89,
      profitMargin: 97.78,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['black', 'white', 'navy'],
      image: 'https://images.unsplash.com/photo-1641808887823-b3201916a57d?w=400',
      media:[
        {src:'https://images.unsplash.com/photo-1641808887823-b3201916a57d?w=400',}
      ],
      soldCount: 156,
      addedDate: '2024-01-15',
      monthlySales: [
        { month: '2024-01', units: 12 },
        { month: '2024-02', units: 18 },
        { month: '2024-03', units: 22 },
        { month: '2024-04', units: 25 },
        { month: '2024-05', units: 31 },
        { month: '2024-06', units: 28 },
        { month: '2024-07', units: 20 },
      ],
    },
    {
      id: '2',
      name: 'Motion Flex Leggings',
      description: 'High-waisted leggings with four-way stretch and compression support for maximum flexibility.',
      category: 'bottoms',
      costPrice: 65,
      sellingPrice: 129,
      profitMargin: 98.46,
      sizes: ['S', 'M', 'L'],
      colors: ['black', 'gray', 'navy'],
      image: 'https://images.unsplash.com/photo-1645652367526-a0ecb717650a?w=400',
      soldCount: 234,
      addedDate: '2024-02-20',
      monthlySales: [
        { month: '2024-02', units: 15 },
        { month: '2024-03', units: 28 },
        { month: '2024-04', units: 35 },
        { month: '2024-05', units: 42 },
        { month: '2024-06', units: 48 },
        { month: '2024-07', units: 38 },
        { month: '2024-08', units: 28 },
      ],
    },
    {
      id: '3',
      name: 'Ultra-Lite Jacket',
      description: 'Water-resistant windbreaker with reflective details and packable design for on-the-go athletes.',
      category: 'outerwear',
      costPrice: 95,
      sellingPrice: 199,
      profitMargin: 109.47,
      sizes: ['M', 'L', 'XL'],
      colors: ['gray', 'navy', 'green'],
      image: 'https://images.unsplash.com/photo-1637844528612-064026615fcd?w=400',
      soldCount: 89,
      addedDate: '2024-03-10',
      monthlySales: [
        { month: '2024-03', units: 8 },
        { month: '2024-04', units: 12 },
        { month: '2024-05', units: 15 },
        { month: '2024-06', units: 18 },
        { month: '2024-07', units: 16 },
        { month: '2024-08', units: 12 },
        { month: '2024-09', units: 8 },
      ],
    },
    {
      id: '4',
      name: 'Performance Shorts',
      description: 'Lightweight training shorts with built-in liner and secure zipper pockets for essentials.',
      category: 'bottoms',
      costPrice: 35,
      sellingPrice: 79,
      profitMargin: 125.71,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['black', 'navy', 'gray'],
      image: 'https://images.unsplash.com/photo-1646178175472-1afddc71ea8a?w=400',
      soldCount: 198,
      addedDate: '2024-04-05',
      monthlySales: [
        { month: '2024-04', units: 18 },
        { month: '2024-05', units: 32 },
        { month: '2024-06', units: 38 },
        { month: '2024-07', units: 42 },
        { month: '2024-08', units: 35 },
        { month: '2024-09', units: 28 },
        { month: '2024-10', units: 5 },
      ],
    },
    {
      id: '5',
      name: 'Training Tank Top',
      description: 'Relaxed fit tank with mesh panels for enhanced ventilation during high-intensity training.',
      category: 'tops',
      costPrice: 28,
      sellingPrice: 59,
      profitMargin: 110.71,
      sizes: ['S', 'M', 'L'],
      colors: ['white', 'black', 'gray'],
      image: 'https://images.unsplash.com/photo-1641808887823-b3201916a57d?w=400',
      soldCount: 142,
      addedDate: '2024-05-12',
      monthlySales: [
        { month: '2024-05', units: 12 },
        { month: '2024-06', units: 24 },
        { month: '2024-07', units: 28 },
        { month: '2024-08', units: 32 },
        { month: '2024-09', units: 26 },
        { month: '2024-10', units: 20 },
      ],
    },
    {
      id: '6',
      name: 'Compression Tights',
      description: 'Full-length compression wear with graduated compression zones for improved circulation.',
      category: 'bottoms',
      costPrice: 48,
      sellingPrice: 99,
      profitMargin: 106.25,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['black', 'navy'],
      image: 'https://images.unsplash.com/photo-1645652367526-a0ecb717650a?w=400',
      soldCount: 167,
      addedDate: '2024-06-08',
      monthlySales: [
        { month: '2024-06', units: 15 },
        { month: '2024-07', units: 28 },
        { month: '2024-08', units: 32 },
        { month: '2024-09', units: 38 },
        { month: '2024-10', units: 42 },
        { month: '2024-11', units: 12 },
      ],
    },
  ]);

  const addProduct = (product: Omit<Product, 'id' | 'soldCount' | 'addedDate' | 'monthlySales'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      soldCount: 0,
      addedDate: new Date().toISOString().split('T')[0],
      monthlySales: [],
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProductSales = (productId: string, quantity: number) => {
    const currentMonth = new Date().toISOString().slice(0, 7); // Format: "2024-10"
    
    setProducts(prev =>
      prev.map(product => {
        if (product.id !== productId) return product;
        
        // Update total sold count
        const updatedSoldCount = product.soldCount + quantity;
        
        // Update monthly sales
        const monthIndex = product.monthlySales.findIndex(ms => ms.month === currentMonth);
        let updatedMonthlySales = [...product.monthlySales];
        
        if (monthIndex >= 0) {
          // Month exists, update it
          updatedMonthlySales[monthIndex] = {
            ...updatedMonthlySales[monthIndex],
            units: updatedMonthlySales[monthIndex].units + quantity,
          };
        } else {
          // Month doesn't exist, add it
          updatedMonthlySales.push({
            month: currentMonth,
            units: quantity,
          });
        }
        
        return {
          ...product,
          soldCount: updatedSoldCount,
          monthlySales: updatedMonthlySales,
        };
      })
    );
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProductSales }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
