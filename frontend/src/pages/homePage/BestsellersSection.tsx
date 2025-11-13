import { motion } from 'motion/react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useTranslation } from "react-i18next";

interface BestsellersSectionProps {
  // onNavigate: (page: string) => void; // Removed
}

export function BestsellersSection() {
  const navigate = useNavigate(); // Initialize useNavigate
  const { t } = useTranslation();
  const bestsellers = [
    { id: '1', name: 'Elite Performance Tee', image: '/product/1.jpg', sellingPrice: 89 },
    { id: '2', name: 'Motion Flex Leggings', image: '/product/2.jpg', sellingPrice: 129 },
    { id: '3', name: 'Ultra-Lite Jacket', image: '/product/3.jpg', sellingPrice: 199 },
    { id: '4', name: 'Performance Shorts', image: '/product/4.jpg', sellingPrice: 79 },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 "> 
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
        <h2 className="text-center mb-4 font-poppins text-3xl lg:text-4xl font-bold">{t("bestsellers_title")}</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto font-inter">
          {t("bestsellers_subtitle")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[3/4] bg-gray-100">
                <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button className="bg-white text-black hover:bg-primary_green hover:text-white transition-all">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {t("add_to_cart")}
                  </Button>
                </div>
              </div>
              <h3 className="mb-1 font-poppins">{product.name}</h3>
              <p className="text-gray-600 font-inter">₣{product.sellingPrice}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            onClick={() => navigate('/shop')}
            variant="outline"
            className="h-12 px-8 border-2 border-primary_green text-primary_green hover:bg-primary_green hover:text-white"
          >
            {t("view_all_products")}
          </Button>
        </div>
      </motion.div>
      </div>
    </section>
  );
}
