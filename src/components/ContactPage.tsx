import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@in2luxury.com',
      link: 'mailto:hello@in2luxury.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      label: 'Address',
      value: '123 Fashion Ave, New York, NY 10001',
      link: 'https://maps.google.com',
    },
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', link: '#' },
    { icon: Instagram, label: 'Instagram', link: '#' },
    { icon: Twitter, label: 'Twitter', link: '#' },
    { icon: Youtube, label: 'YouTube', link: '#' },
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 
            className="mb-4"
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
          >
            Get in Touch
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Have a question or want to learn more about IN2? We'd love to hear from you.
          </p>
        </motion.div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h2 className="mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-2 h-12 border-gray-300 focus:border-[#2FF924] focus:ring-[#2FF924]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>

                <div>
                  <Label htmlFor="email" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="mt-2 h-12 border-gray-300 focus:border-[#2FF924] focus:ring-[#2FF924]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>

                <div>
                  <Label htmlFor="message" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us how we can help..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="mt-2 border-gray-300 focus:border-[#2FF924] focus:ring-[#2FF924] resize-none"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-[#2FF924] hover:bg-black hover:text-[#2FF924] transition-all duration-300"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div>
              <h2 className="mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Contact Information
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#2FF924]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#2FF924]/20 transition-colors">
                      <info.icon className="w-6 h-6 text-[#2FF924]" />
                    </div>
                    <div>
                      <h3 className="mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {info.label}
                      </h3>
                      <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h2 className="mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Follow Us
              </h2>
              
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#2FF924] hover:text-white transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Business Hours
              </h2>
              
              <div className="space-y-3 text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
