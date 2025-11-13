import { useState, useEffect } from "react";
// Import motion and AnimatePresence from framer-motion for swipe gestures
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useTranslation } from "react-i18next";

const heroSlides = [
  {
    image: "/hero/hero2.jpg",
    titleKey: "hero_slide_1_title",
    subtitleKey: "hero_slide_1_subtitle",
  },
  {
    image: "/hero/hero2(1).jpg",
    titleKey: "hero_slide_2_title",
    subtitleKey: "hero_slide_2_subtitle",
  },
  {
    image: "/hero/hero2(2).jpg",
    titleKey: "hero_slide_3_title",
    subtitleKey: "hero_slide_3_subtitle",
  },
  {
    image: "/hero/dark.jpg",
    titleKey: "hero_slide_4_title",
    subtitleKey: "hero_slide_4_subtitle",
  },
];

const slideVariants = {
  enter: (direction: "next" | "prev") => ({
    x: direction === "next" ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: "next" | "prev") => ({
    x: direction === "next" ? "-100%" : "100%",
    opacity: 0,
  }),
};

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

interface HeroSectionProps {
  // onNavigate: (page: string) => void; // Removed
}

export function HeroSection() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [currentSlide, setCurrentSlide] = useState(0);
  // 'direction' helps the animation know which way to slide
  const [direction, setDirection] = useState<"next" | "prev">("next");
  // 'autoPlay' stops the timer on user interaction
  const [autoPlay, setAutoPlay] = useState(true);
  const { t } = useTranslation();

  // Auto-play timer
  useEffect(() => {
    if (!autoPlay) return; // Stop timer if user interacted

    const timer = setInterval(() => {
      setDirection("next"); // Always go "next" for auto-play
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [autoPlay]); // Re-run effect if autoPlay changes

  const nextSlide = () => {
    setAutoPlay(false); // Stop auto-play
    setDirection("next");
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setAutoPlay(false); // Stop auto-play
    setDirection("prev");
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  const goToSlide = (index: number) => {
    setAutoPlay(false); // Stop auto-play
    // Set direction based on which dot was clicked
    setDirection(index > currentSlide ? "next" : "prev");
    setCurrentSlide(index);
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section className="relative h-[80vh] overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          // Key is crucial for AnimatePresence to detect changes
          key={currentSlide}
          className="absolute inset-0"
          // Pass direction to variants
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          // --- Swipe Functionality ---
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, { offset, velocity }) => {
            const swipeConfidenceThreshold = 10000;
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              nextSlide(); // Swiped left (negative)
            } else if (swipe > swipeConfidenceThreshold) {
              prevSlide(); // Swiped right (positive)
            }
          }}
        >
          {/* Slide Content (Image + Text Overlay) */}
          <div className="absolute inset-0 bg-black/30 z-10" />
          <ImageWithFallback
            src={currentSlideData.image}
            alt={t(currentSlideData.titleKey)}
            className="w-full h-full object-cover"
          />

          {/* --- Mobile-Responsive Text Alignment ---
            - items-end pb-24: Aligns to bottom on mobile
            - md:items-center md:pb-0: Re-centers on desktop
          */}
          <div className="absolute inset-0 z-20 flex items-end justify-center text-center px-6 pb-24 md:items-center md:pb-0">
            {/* This inner div fades in. 
              We don't animate 'y' on the *slide* itself, 
              so we reset the key here for the text animation.
            */}
            <motion.div
              key={currentSlide} // Reset animation on slide change
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1
                className="text-white mb-6"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                }}
              >
                {t(currentSlideData.titleKey)}
              </h1>
              <p
                className="text-white/90 mb-8 max-w-2xl mx-auto"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {t(currentSlideData.subtitleKey)}
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button
                  onClick={() => navigate("/shop")}
                  className="h-12 px-8 bg-primary_green hover:bg-[#26d41f] text-white transition-all"
                >
                  {t("shop_now")}
                </Button>
                <Button
                  onClick={() => navigate("/social-cause")}
                  variant="outline"
                  // --- UI Fix: Changed text-black to text-white ---
                  className="h-12 px-8 border-2 border-white text-black hover:bg-white hover:text-gray-500"
                >
                  {t("explore_story")}
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* --- Mobile-Responsive Controls ---
        - hidden: Hides on mobile
        - md:flex: Shows on medium screens and up
      */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 items-center justify-center hover:bg-white/30 hidden md:flex"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 items-center justify-center hover:bg-white/30 hidden md:flex"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots (visible on all screens) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full ${
              index === currentSlide
                ? "w-8 bg-primary_green"
                : "w-2 bg-white/50"
            } transition-all`}
          />
        ))}
      </div>
    </section>
  );
}
