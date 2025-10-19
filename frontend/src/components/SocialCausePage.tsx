import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { Heart, Users, Target, TrendingUp } from 'lucide-react';

export function SocialCausePage() {
  const stats = [
    { icon: Heart, value: '10,000+', label: 'Lives Impacted' },
    { icon: Users, value: '50+', label: 'Communities Served' },
    { icon: Target, value: '100+', label: 'Programs Launched' },
    { icon: TrendingUp, value: '$2M+', label: 'Funds Raised' },
  ];

  const initiatives = [
    {
      title: 'Youth Fitness Programs',
      description: 'We partner with local communities to provide free fitness training and equipment to underprivileged youth, helping them build confidence, discipline, and healthy habits.',
      image: 'https://images.unsplash.com/photo-1758599668547-2b1192c10abb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBjaGFyaXR5JTIwdm9sdW50ZWVyc3xlbnwxfHx8fDE3NjAyMDc2MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Sustainable Manufacturing',
      description: 'Every IN2 product is crafted with sustainability in mind. We use eco-friendly materials and ensure fair labor practices throughout our supply chain.',
      image: 'https://images.unsplash.com/photo-1637844528612-064026615fcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhdGhsZXRpYyUyMHdlYXJ8ZW58MXx8fHwxNzYwMjA3NjE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Mental Wellness Support',
      description: 'Physical and mental health go hand in hand. We fund mental wellness workshops and therapy programs in underserved communities, promoting holistic well-being.',
      image: 'https://images.unsplash.com/photo-1645652367526-a0ecb717650a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWVkaXRhdGlvbiUyMHdlbGxuZXNzfGVufDF8fHx8MTc2MDE5NjI2NHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1758599668547-2b1192c10abb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBjaGFyaXR5JTIwdm9sdW50ZWVyc3xlbnwxfHx8fDE3NjAyMDc2MTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Social Cause"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 
              className="text-white mb-6"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Movement for Good
            </h1>
            <p 
              className="text-white/90 text-lg max-w-2xl mx-auto"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              At IN2, we believe luxury and purpose can coexist. Every purchase drives positive change in communities around the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary_green/10 mb-4">
                  <stat.icon className="w-8 h-8 text-primary_green" />
                </div>
                <h3 
                  className="mb-2"
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
                >
                  {stat.value}
                </h3>
                <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives */}
      {initiatives.map((initiative, index) => (
        <section
          key={index}
          className={index % 2 === 0 ? 'bg-gray-50 py-20' : 'bg-white py-20'}
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                <h2 
                  className="mb-4"
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
                >
                  {initiative.title}
                </h2>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {initiative.description}
                </p>
              </div>
              <div className={`rounded-2xl overflow-hidden ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <ImageWithFallback
                  src={initiative.image}
                  alt={initiative.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary_green/10 to-white py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 
              className="mb-6"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
            >
              Join the Movement
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Every purchase you make contributes to building healthier, stronger communities. Together, we're creating a movement that transcends fashion.
            </p>
            <Button
              variant="outline"
              className="h-12 px-8 border-2 border-primary_green text-primary_green hover:bg-primary_green hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary_green/30"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Join the Movement
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
