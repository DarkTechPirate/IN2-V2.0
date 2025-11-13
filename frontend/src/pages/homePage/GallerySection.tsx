import { motion } from 'motion/react';
import { Button } from '../../components/ui/button';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { useTranslation } from "react-i18next";

interface GallerySectionProps {
  onNavigate: (page: string) => void;
}

export function GallerySection({ onNavigate }: GallerySectionProps) {
  const { t } = useTranslation();
  const galleryImages = [
    '/momentOfGood.jpg',
    'https://images.unsplash.com/photo-1758599668547-2b1192c10abb?auto=format&fit=crop&w=600&q=80',
    'OIP.webp',
  ];

  return (
    <section className="py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 className="text-center mb-4 font-poppins text-3xl lg:text-4xl font-bold">{t("gallery_title")}</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto font-inter">
            {t("gallery_subtitle")}
          </p>

          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: [0, -1200] }}
              transition={{ repeat: Infinity, repeatType: 'loop', duration: 20, ease: 'linear' }}
            >
              {[...galleryImages, ...galleryImages].map((image, index) => (
                <div key={index} className="flex-shrink-0 w-[400px] h-[300px] rounded-2xl overflow-hidden group cursor-pointer">
                  <ImageWithFallback src={image} alt={t("gallery_title") + ` ${index + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => onNavigate('gallery')}
              variant="outline"
              className="h-12 px-8 border-2 border-primary_green text-primary_green hover:bg-primary_green hover:text-white"
            >
              {t("view_full_gallery")}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
