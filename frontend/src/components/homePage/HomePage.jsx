import { HeroSection } from "./HeroSection";
import { BestsellersSection } from "./BestsellersSection";
import { SocialCauseSection } from "./SocialCauseSection";
import { GallerySection } from "./GallerySection";
import { WhyChooseUs } from "./whyChooseUs";
import { FeaturesSection } from "./FeaturesSection";
import SocksPromo from "./SocksPromo";
import ScrollAnimation from "../ui/ScrollAnimation";

export function HomePage() {
  return (
    <div className="overflow-x-hidden pt-14">
      <ScrollAnimation>
        <HeroSection />
      </ScrollAnimation>

      <ScrollAnimation>
        <BestsellersSection />
      </ScrollAnimation>

      <ScrollAnimation>
        <SocksPromo />
      </ScrollAnimation>

      <ScrollAnimation>
        <FeaturesSection />
      </ScrollAnimation>

      <ScrollAnimation>
        <WhyChooseUs />
      </ScrollAnimation>

      <ScrollAnimation>
        <SocialCauseSection />
      </ScrollAnimation>

      <ScrollAnimation>
        <GallerySection />
      </ScrollAnimation>
    </div>
  );
}
