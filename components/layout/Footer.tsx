import Link from "next/link";
import {
  Building2,
  Globe,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8" />
              <span className="text-xl font-bold font-playfair">
                Smart Estate
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Your trusted AI-powered real estate platform for finding the
              perfect property in Bangladesh. Discover apartments, houses,
              villas, and commercial spaces with smart recommendations.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-secondary transition-colors">
                <Globe className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-secondary transition-colors">
                <MessageCircle className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-secondary transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-playfair">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-secondary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-secondary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-secondary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-secondary transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Properties Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-playfair">Properties</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/properties?category=apartment"
                  className="hover:text-secondary transition-colors"
                >
                  Apartments
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?category=house"
                  className="hover:text-secondary transition-colors"
                >
                  Houses
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?category=villa"
                  className="hover:text-secondary transition-colors"
                >
                  Villas
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?category=commercial"
                  className="hover:text-secondary transition-colors"
                >
                  Commercial
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-playfair">
              Contact Info
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p>123 Real Estate Avenue</p>
                  <p>Gulshan, Dhaka 1212</p>
                  <p>Bangladesh</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <p>+880 1234-567890</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <p>info@smartestate.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-primary-foreground/80">
            © {currentYear} Smart Estate. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="#" className="hover:text-secondary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-secondary transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-secondary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
