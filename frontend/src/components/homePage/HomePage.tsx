import { HeroSection } from './HeroSection';
import { BestsellersSection } from './BestsellersSection';
import { SocialCauseSection } from './SocialCauseSection';
import { GallerySection } from './GallerySection';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen">
      <HeroSection onNavigate={onNavigate} />
      <BestsellersSection onNavigate={onNavigate} />
      <SocialCauseSection onNavigate={onNavigate} />
      <GallerySection onNavigate={onNavigate} />
    </div>
  );
}
