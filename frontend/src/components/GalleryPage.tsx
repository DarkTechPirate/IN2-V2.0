import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  date: string;
  category: 'past' | 'upcoming';
}

export function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const images: GalleryImage[] = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1515100235140-6cb3498e8031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBldmVudCUyMGF1ZGllbmNlfGVufDF8fHx8MTc2MDIwNzYxOHww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'IN2 Launch Event 2024',
      date: 'March 15, 2024',
      category: 'past',
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1758599668547-2b1192c10abb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBjaGFyaXR5JTIwdm9sdW50ZWVyc3xlbnwxfHx8fDE3NjAyMDc2MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Community Wellness Program',
      date: 'June 8, 2024',
      category: 'past',
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1641808887823-b3201916a57d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcG9ydHN3ZWFyJTIwYXRobGV0ZXxlbnwxfHx8fDE3NjAyMDc2MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Summer Collection Shoot',
      date: 'July 20, 2024',
      category: 'past',
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1646178175472-1afddc71ea8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwZml0bmVzcyUyMG1pbmltYWx8ZW58MXx8fHwxNzYwMjA3NjE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Marathon Sponsorship',
      date: 'September 12, 2024',
      category: 'past',
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1637844528612-064026615fcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhdGhsZXRpYyUyMHdlYXJ8ZW58MXx8fHwxNzYwMjA3NjE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Fall Fashion Week',
      date: 'October 5, 2024',
      category: 'past',
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1645652367526-a0ecb717650a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWVkaXRhdGlvbiUyMHdlbGxuZXNzfGVufDF8fHx8MTc2MDE5NjI2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Wellness Retreat',
      date: 'November 18, 2024',
      category: 'past',
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1515100235140-6cb3498e8031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBldmVudCUyMGF1ZGllbmNlfGVufDF8fHx8MTc2MDIwNzYxOHww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Spring Collection Launch',
      date: 'February 14, 2025',
      category: 'upcoming',
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1641808887823-b3201916a57d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcG9ydHN3ZWFyJTIwYXRobGV0ZXxlbnwxfHx8fDE3NjAyMDc2MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Athlete Partnership Event',
      date: 'March 22, 2025',
      category: 'upcoming',
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1758599668547-2b1192c10abb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBjaGFyaXR5JTIwdm9sdW50ZWVyc3xlbnwxfHx8fDE3NjAyMDc2MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Youth Fitness Gala',
      date: 'April 30, 2025',
      category: 'upcoming',
    },
  ];

  const pastEvents = images.filter(img => img.category === 'past');
  const upcomingEvents = images.filter(img => img.category === 'upcoming');

  const ImageGrid = ({ images }: { images: GalleryImage[] }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image, index) => (
        <motion.div
          key={image.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className="group cursor-pointer relative overflow-hidden rounded-2xl aspect-[4/3] bg-gray-100"
          onClick={() => setSelectedImage(image)}
        >
          <ImageWithFallback
            src={image.src}
            alt={image.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {image.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-white/90">
                <Calendar className="w-4 h-4" />
                <span style={{ fontFamily: 'Inter, sans-serif' }}>{image.date}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 
            className="mb-4"
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
          >
            Gallery
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Capturing moments of movement, community, and style through our events and initiatives
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="past" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 h-12">
            <TabsTrigger 
              value="past" 
              className="data-[state=active]:bg-primary_green data-[state=active]:text-white"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Past Events ({pastEvents.length})
            </TabsTrigger>
            <TabsTrigger 
              value="upcoming"
              className="data-[state=active]:bg-primary_green data-[state=active]:text-white"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Upcoming Events ({upcomingEvents.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="past">
            <ImageGrid images={pastEvents} />
          </TabsContent>

          <TabsContent value="upcoming">
            <ImageGrid images={upcomingEvents} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={() => setSelectedImage(null)}
              aria-label="Close"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full max-h-[80vh] object-contain"
                />
              </div>
              <div className="mt-6 text-center text-white">
                <h3 className="mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}>
                  {selectedImage.title}
                </h3>
                <div className="flex items-center justify-center gap-2 text-white/80">
                  <Calendar className="w-4 h-4" />
                  <span style={{ fontFamily: 'Inter, sans-serif' }}>{selectedImage.date}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
