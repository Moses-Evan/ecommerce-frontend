import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl mb-4 text-secondary">Draupadi Vastralya</h3>
            <p className="text-background/80 mb-4">
              Celebrating the timeless elegance of Indian sarees with exquisite craftsmanship and tradition.
            </p>
            <div className="flex gap-3">
              <a href="#" className="bg-background/10 p-2 rounded-full hover:bg-secondary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-background/10 p-2 rounded-full hover:bg-secondary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-background/10 p-2 rounded-full hover:bg-secondary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/80 hover:text-secondary transition-colors">About Us</a></li>
              <li><a href="#" className="text-background/80 hover:text-secondary transition-colors">Our Story</a></li>
              <li><a href="#" className="text-background/80 hover:text-secondary transition-colors">Collections</a></li>
              <li><a href="#" className="text-background/80 hover:text-secondary transition-colors">Blog</a></li>
              <li><a href="#" className="text-background/80 hover:text-secondary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/80 hover:text-secondary transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="text-background/80 hover:text-secondary transition-colors">Return & Exchange</a></li>
              <li><a href="#" className="text-background/80 hover:text-secondary transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-background/80 hover:text-secondary transition-colors">Care Instructions</a></li>
              <li><a href="#" className="text-background/80 hover:text-secondary transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-background/80">
                <MapPin className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                <span>123 Silk Street, Mumbai, Maharashtra 400001</span>
              </li>
              <li className="flex items-center gap-3 text-background/80">
                <Phone className="h-5 w-5 text-secondary flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-background/80">
                <Mail className="h-5 w-5 text-secondary flex-shrink-0" />
                <span>hello@draupadivastralya.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm">
            © 2025 Draupadi Vastralya. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-background/60 hover:text-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="text-background/60 hover:text-secondary transition-colors">Terms & Conditions</a>
            <a href="#" className="text-background/60 hover:text-secondary transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
