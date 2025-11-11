import { motion } from 'motion/react';
import { Button } from '../../components/ui/button';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

interface SocialCauseSectionProps {
  onNavigate: (page: string) => void;
}

export function SocialCauseSection({ onNavigate }: SocialCauseSectionProps) {
  return (
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
            <h2 className="mb-4 font-poppins text-3xl lg:text-4xl font-bold">Movement for Good</h2>
            <p className="text-gray-600 mb-6 leading-relaxed font-inter">
              At IN2, we believe luxury and purpose can coexist. For every purchase, we contribute to community wellness programs.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed font-inter">
              Together, we’re building stronger, healthier communities through movement.
            </p>
            <Button
              onClick={() => onNavigate('social-cause')}
              variant="outline"
              className="h-12 px-8 border-2 border-primary_green text-primary_green hover:bg-primary_green hover:text-white"
            >
              Explore More
            </Button>
          </div>
          <div className="order-1 md:order-2 rounded-2xl overflow-hidden">
            <ImageWithFallback src="/momentOfGood.jpg" alt="Social Cause" className="w-full h-[400px] object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
