import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroSection } from "./HeroSection";
import { BestsellersSection } from "./BestsellersSection";
import { SocialCauseSection } from "./SocialCauseSection";
import { GallerySection } from "./GallerySection";
import { WhyChooseUs } from "./whyChooseUs";
import { FeaturesSection } from "./FeaturesSection";
import SocksPromo  from "./SocksPromo";

gsap.registerPlugin(ScrollTrigger);

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    sectionsRef.current.forEach((section) => {
      if (!section) return;

      gsap.fromTo(
        section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%", // when section enters viewport
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="scroll-smooth overflow-x-hidden">
      <section ref={(el) => el && (sectionsRef.current[0] = el)}>
        <HeroSection onNavigate={onNavigate} />
      </section>

      <section ref={(el) => el && (sectionsRef.current[1] = el)}>
        <BestsellersSection onNavigate={onNavigate} />
      </section>



      <section ref={(el) => el && (sectionsRef.current[2] = el)}>
        <SocksPromo  />
      </section>

      <section ref={(el) => el && (sectionsRef.current[3] = el)}>
        <FeaturesSection />
      </section>

      <section ref={(el) => el && (sectionsRef.current[4] = el)}>
        <WhyChooseUs />
      </section>

       <section ref={(el) => el && (sectionsRef.current[5] = el)}>
        <SocialCauseSection onNavigate={onNavigate} />
      </section>

      <section ref={(el) => el && (sectionsRef.current[6] = el)}>
        <GallerySection onNavigate={onNavigate} />
      </section>
    </div>
  );
}
