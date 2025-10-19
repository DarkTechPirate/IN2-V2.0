import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="text-2xl mb-4 tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
              IN<span style={{ color: '#2FF924' }}>2</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Luxury in Motion. Where performance meets purpose.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary_green transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary_green transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary_green transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-primary_green transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary_green transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary_green transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-primary_green transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-primary_green transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Stay Updated</h4>
            <p className="text-sm text-gray-600 mb-4">
              Get the latest updates on new products and exclusive offers.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 border-gray-300 focus:border-primary_green focus:ring-primary_green"
              />
              <Button 
                className="bg-primary_green hover:bg-[#26d41f] text-white transition-all duration-300"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Join
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2025 IN2. All rights reserved.
          </p>
          
          <div className="flex gap-4">
            <a href="#" className="p-2 rounded-full hover:bg-primary_green/10 transition-colors" aria-label="Facebook">
              <Facebook className="w-5 h-5 text-gray-600 hover:text-primary_green transition-colors" />
            </a>
            <a href="#" className="p-2 rounded-full hover:bg-primary_green/10 transition-colors" aria-label="Instagram">
              <Instagram className="w-5 h-5 text-gray-600 hover:text-primary_green transition-colors" />
            </a>
            <a href="#" className="p-2 rounded-full hover:bg-primary_green/10 transition-colors" aria-label="Twitter">
              <Twitter className="w-5 h-5 text-gray-600 hover:text-primary_green transition-colors" />
            </a>
            <a href="#" className="p-2 rounded-full hover:bg-primary_green/10 transition-colors" aria-label="YouTube">
              <Youtube className="w-5 h-5 text-gray-600 hover:text-primary_green transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
