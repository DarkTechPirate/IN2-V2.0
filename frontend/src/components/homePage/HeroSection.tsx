import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: '/hero/dark.jpg',
      title: 'IN MOTION. IN STYLE. IN2.',
      subtitle: 'Where luxury performance meets conscious movement.',
    },
    {
      image: '/hero/campany_logo3.jpg',
      title: 'REDEFINE YOUR LIMITS',
      subtitle: 'Premium sportswear crafted for the modern athlete.',
    },
    {
      image: '/hero/hero2(2).jpg',
      title: 'MOVEMENT WITH PURPOSE',
      subtitle: 'Every piece designed to elevate your performance.',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <section className="relative h-[80vh] overflow-hidden pt-0">
      {heroSlides.map((slide, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 pt-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentSlide ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-black/30 z-10 " />
          <ImageWithFallback src={slide.image} alt={slide.title} className="w-full h-full object-cover" />

          <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: index === currentSlide ? 0 : 20,
                opacity: index === currentSlide ? 1 : 0,
              }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                {slide.title}
              </h1>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
                {slide.subtitle}
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button
                  onClick={() => onNavigate('shop')}
                  className="h-12 px-8 bg-primary_green hover:bg-[#26d41f] text-white transition-all"
                >
                  Shop Now
                </Button>
                <Button
                  onClick={() => onNavigate('social-cause')}
                  variant="outline"
                  className="h-12 px-8 border-2 border-white text-black hover:bg-white hover:text-black"
                >
                  Explore Story
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ))}

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full ${index === currentSlide ? 'w-8 bg-primary_green' : 'w-2 bg-white/50'} transition-all`}
          />
        ))}
      </div>
    </section>
  );
}
