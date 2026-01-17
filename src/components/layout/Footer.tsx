import { Link } from 'react-router-dom';
import { Baby, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cream border-t border-border">
      {/* Newsletter Section */}
      <div className="bg-mint-light">
        <div className="container py-8 sm:py-12 md:py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-foreground mb-2 sm:mb-3">
              Join the BabyBloom Family
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 px-4">
              Get exclusive offers, parenting tips, and 15% off your first order!
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto px-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12 px-4 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm sm:text-base"
              />
              <Button variant="default" size="lg" className="shrink-0 w-full sm:w-auto">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary flex items-center justify-center">
                <Baby className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
              </div>
              <span className="text-lg sm:text-xl font-heading font-bold text-foreground">
                BabyBloom
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              Premium baby products for happy, healthy little ones. Trusted by parents worldwide.
            </p>
            <div className="flex gap-2 sm:gap-3">
              <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors touch-manipulation">
                <Facebook className="h-3 w-3 sm:h-4 sm:w-4" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors touch-manipulation">
                <Instagram className="h-3 w-3 sm:h-4 sm:w-4" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors touch-manipulation">
                <Twitter className="h-3 w-3 sm:h-4 sm:w-4" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors touch-manipulation">
                <Youtube className="h-3 w-3 sm:h-4 sm:w-4" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-heading font-bold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Shop</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">All Products</Link></li>
              <li><Link to="/products?category=clothing" className="text-muted-foreground hover:text-primary transition-colors">Baby Clothing</Link></li>
              <li><Link to="/products?category=diapers" className="text-muted-foreground hover:text-primary transition-colors">Diapers & Wipes</Link></li>
              <li><Link to="/products?category=toys" className="text-muted-foreground hover:text-primary transition-colors">Toys</Link></li>
              <li><Link to="/products?category=care" className="text-muted-foreground hover:text-primary transition-colors">Baby Care</Link></li>
              <li><Link to="/products?sale=true" className="text-destructive hover:text-destructive/80 transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="font-heading font-bold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Help</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link to="/shipping" className="text-muted-foreground hover:text-primary transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="text-muted-foreground hover:text-primary transition-colors">Returns</Link></li>
              <li><Link to="/size-guide" className="text-muted-foreground hover:text-primary transition-colors">Size Guide</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/profile/support" className="text-muted-foreground hover:text-primary transition-colors">Support Center</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-heading font-bold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/sustainability" className="text-muted-foreground hover:text-primary transition-colors">Sustainability</Link></li>
              <li><Link to="/press" className="text-muted-foreground hover:text-primary transition-colors">Press</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Contact</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 shrink-0" />
                <span className="break-words">hello@babybloom.in</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <Phone className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 shrink-0" />
                <span className="break-words">+91 8080-BABY</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 shrink-0" />
                <span className="break-words">123 Baby Lane<br/>Mumbai, Maharashtra 400001</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container py-4 sm:py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-muted-foreground">
            <p> {currentYear} BabyBloom. All rights reserved.</p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <Link to="/privacy-terms" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/privacy-terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
              <Link to="/accessibility" className="text-muted-foreground hover:text-primary transition-colors">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
