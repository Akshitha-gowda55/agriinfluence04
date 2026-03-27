import Link from 'next/link';
import { Leaf, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const footerLinks = {
  shop: [
    { name: 'Fertilizers', href: '/products?category=fertilizer' },
    { name: 'Pesticides', href: '/products?category=pesticide' },
    { name: 'Seeds', href: '/products?category=seeds' },
    { name: 'New Arrivals', href: '/products' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Influencer Program', href: '/influencers' },
    { name: 'Testimonials', href: '/about#testimonials' },
    { name: 'Contact', href: '/about#contact' },
  ],
  support: [
    { name: 'FAQs', href: '/about' },
    { name: 'Shipping Info', href: '/about' },
    { name: 'Returns Policy', href: '/about' },
    { name: 'Track Order', href: '/about' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold">
                Agri<span className="text-primary">Influence</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-primary-foreground/70">
              Your trusted partner in agriculture. Premium fertilizers, pesticides, and seeds delivered to farmers across the nation.
            </p>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                />
                <Button variant="secondary" className="shrink-0">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Shop</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Phone className="h-4 w-4" />
                <span>1-800-AGRI-INF</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Mail className="h-4 w-4" />
                <span>support@agriinfluence.com</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>123 Farm Road, Agriculture Valley, CA 90210</span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              <Link href="#" className="text-primary-foreground/70 hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-primary-foreground/70 hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-primary-foreground/70 hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/50">
            {new Date().getFullYear()} AgriInfluence. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-primary-foreground/50 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-primary-foreground/50 hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
