import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: '/hero/dark.jpg',
      title: 'IN MOTION. IN STYLE. IN2.',
      subtitle: 'Where luxury performance meets conscious movement.',
    },
    {
      image: 'https://images.unsplash.com/photo-1637844528612-064026615fcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhdGhsZXRpYyUyMHdlYXJ8ZW58MXx8fHwxNzYwMjA3NjE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'REDEFINE YOUR LIMITS',
      subtitle: 'Premium sportswear crafted for the modern athlete.',
    },
    {
      image: 'https://images.unsplash.com/photo-1646178175472-1afddc71ea8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwZml0bmVzcyUyMG1pbmltYWx8ZW58MXx8fHwxNzYwMjA3NjE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'MOVEMENT WITH PURPOSE',
      subtitle: 'Every piece designed to elevate your performance.',
    },
  ];

  const bestsellers = [
     {
      id: '1',
      name: 'Elite Performance Tee',
      description: 'Premium moisture-wicking fabric with advanced breathability for peak performance during intense workouts.',
      category: 'football socks',
      costPrice: 45,
      sellingPrice: 89,
      profitMargin: 97.78,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['black', 'white', 'navy'],
      image: '/product/1.jpg',
      media:[
       '/product/1.jpg',
       '/product/second_scoks_image.jpg',
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
      category: ' tennis socks',
      costPrice: 65,
      sellingPrice: 129,
      profitMargin: 98.46,
      sizes: ['S', 'M', 'L'],
      colors: ['black', 'gray', 'navy'],
      image: '/product/2.jpg',
      media:[
       '/product/2.jpg',
       '/product/second_scoks_image.jpg',
      ],
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
      category: 'football socks',
      costPrice: 95,
      sellingPrice: 199,
      profitMargin: 109.47,
      sizes: ['M', 'L', 'XL'],
      colors: ['gray', 'navy', 'green'],
      image: '/product/3.jpg',
      media:[
       '/product/3.jpg',
      ],
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
      category: ' tennis socks',
      costPrice: 35,
      sellingPrice: 79,
      profitMargin: 125.71,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['black', 'navy', 'gray'],
      image: '/product/4.jpg',
      media:[
       '/product/4.jpg',
      ],
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
  ];

  const galleryImages = [
    '/momentOfGood.jpg',
    'https://images.unsplash.com/photo-1758599668547-2b1192c10abb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBjaGFyaXR5JTIwdm9sdW50ZWVyc3xlbnwxfHx8fDE3NjAyMDc2MTh8MA&ixlib=rb-4.1.0&q=80&w=600',
    'https://images.unsplash.com/photo-1641808887823-b3201916a57d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcG9ydHN3ZWFyJTIwYXRobGV0ZXxlbnwxfHx8fDE3NjAyMDc2MTZ8MA&ixlib=rb-4.1.0&q=80&w=600',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <section className="relative h-[80vh] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-black/30 z-10" />
            <ImageWithFallback
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: index === currentSlide ? 0 : 20, opacity: index === currentSlide ? 1 : 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <h1 
                  className="text-white mb-6 tracking-tight"
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2rem, 5vw, 4rem)' }}
                >
                  {slide.title}
                </h1>
                <p 
                  className="text-white/90 mb-8 max-w-2xl mx-auto"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
                >
                  {slide.subtitle} 
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button
                    onClick={() => onNavigate('shop')}
                    className="h-12 px-8 bg-primary_green hover:bg-[#26d41f] text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary_green/50"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Shop Now
                  </Button>
                  <Button
                    onClick={() => onNavigate('social-cause')}
                    variant="outline"
                    className="h-12 px-8 border-2 border-white text-black hover:bg-white hover:text-black transition-all duration-300 hover:shadow-lg hover:shadow-white/50"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Explore Story
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-8 bg-primary_green' : 'w-2 bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 
            className="text-center mb-4"
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
          >
            Bestsellers
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Discover our most loved pieces, designed for peak performance and style
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
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary_green transition-all duration-300 rounded-2xl" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button
                      className="bg-white text-black hover:bg-primary_green hover:text-white transition-all duration-300 shadow-lg"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
                <h3 className="mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {product.name}
                </h3>
                <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                  ₣{product.sellingPrice}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => onNavigate('shop')}
              variant="outline"
              className="h-12 px-8 border-2 border-primary_green text-primary_green hover:bg-primary_green hover:text-white transition-all duration-300"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              View All Products
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Social Cause Preview */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 md:order-1">
              <h2 
                className="mb-4"
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
              >
                Movement for Good
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                At IN2, we believe that luxury and purpose can coexist. For every purchase, we contribute to community wellness programs, empowering underprivileged youth through sports and fitness initiatives.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                Together, we're creating a movement that transcends fashion—one that builds healthier, stronger communities.
              </p>
              <Button
                onClick={() => onNavigate('social-cause')}
                variant="outline"
                className="h-12 px-8 border-2 border-primary_green text-primary_green font-bold hover:bg-primary_green hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary_green/30"
                style={{ fontFamily: 'Inter, sans-serif',fontWeight: 600 ,letterSpacing: '1px'}}
              >
                Explore More
              </Button>
            </div>
            <div className="order-1 md:order-2 rounded-2xl overflow-hidden">
              <ImageWithFallback
                src="/momentOfGood.jpg"
                alt="Social Cause"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-center mb-4"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
            >
              Gallery
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              Capturing moments of movement, community, and style
            </p>

            <div className="overflow-hidden">
              <motion.div
                className="flex gap-6"
                animate={{ x: [0, -1200] }}
                transition={{ 
                  x: { 
                    repeat: Infinity, 
                    repeatType: "loop", 
                    duration: 20, 
                    ease: "linear" 
                  } 
                }}
              >
                {[...galleryImages, ...galleryImages, ...galleryImages].map((image, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 w-[400px] h-[300px] rounded-2xl overflow-hidden group cursor-pointer"
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="text-center mt-12">
              <Button
                onClick={() => onNavigate('gallery')}
                variant="outline"
                className="h-12 px-8 border-2px bg-gray-50 text-primary_green  hover:bg-primary_green hover:text-white transition-all duration-300"
                style={{ fontFamily: 'Inter, sans-serif',fontWeight: 600 ,letterSpacing: '1px'}}
              >
                View Full Gallery
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
