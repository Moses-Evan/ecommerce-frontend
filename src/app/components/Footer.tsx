import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-gradient-to-r from-primary to-[#610000] text-background pt-16 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="text-2xl mb-4 text-secondary flex items-center gap-2">
              <img src="src\images\logo-icon.png" width={80} alt="" />
              <h3 className="text-niorra-red" style={{ color: "#ffe211" }}>
                NIORRA
              </h3>
            </div>
            <p className="text-lg font-normal mb-1">
              {t("We started Niorra in 2012,")}
            </p>
            <p className="text-background/80 mb-4 pr-6">
              {t(
                "Since our first day we've brought the best selection of Indian Bollywood Textiles and Jewellery to our customers. Our name has become synonymous with quality throughout the entire Frankfurt, Germany. We do our best to ensure a permanent variety of fantastic items along with unique limited edition and seasonal items to fit any budget.",
              )}
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="bg-background/10 p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-background/10 p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-background/10 p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">{t("Collections")}</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-background/80 hover:text-secondary transition-colors"
                >
                  {t("Sarees")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-background/80 hover:text-secondary transition-colors"
                >
                  {t("Blouses")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-background/80 hover:text-secondary transition-colors"
                >
                  {t("Kutis")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-background/80 hover:text-secondary transition-colors"
                >
                  {t("Skirts")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-background/80 hover:text-secondary transition-colors"
                >
                  {t("Kids")}
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="mb-4">{t("Quick Links")}</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-background/80 hover:text-secondary transition-colors"
                >
                  {t("About Us")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-background/80 hover:text-secondary transition-colors"
                >
                  {t("Our Story")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-background/80 hover:text-secondary transition-colors"
                >
                  {t("Collections")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-background/80 hover:text-secondary transition-colors"
                >
                  {t("Blog")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-background/80 hover:text-secondary transition-colors"
                >
                  {t("Contact Us")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4">{t("Visit Our Store")}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-background/80">
                <MapPin className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                <span>Ludwigstr.19 60327 Frankfurt Germany</span>
              </li>
              <li className="flex items-center gap-3 text-background/80">
                <Phone className="h-5 w-5 text-secondary flex-shrink-0" />
                <span>0049 069 2713 3944</span>
              </li>
              <li className="flex items-center gap-3 text-background/80">
                <Mail className="h-5 w-5 text-secondary flex-shrink-0" />
                <span>hello@niorra.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 pb-3 border-t border-background/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm">
            © 2026 Niorra. {t("All rights reserved.")}
          </p>
          <div className="flex gap-6  text-sm">
            <a
              href="#"
              className="text-background/60 hover:text-secondary transition-colors"
            >
              {t("Privacy Policy")}
            </a>
            <a
              href="#"
              className="text-background/60 hover:text-secondary transition-colors"
            >
              {t("Terms & Conditions")}
            </a>
            {/* <a
              href="#"
              className="text-background/60 hover:text-secondary transition-colors"
            >
              Sitemap
            </a> */}
          </div>
        </div>
      </div>
      <div>
        <img src="src\images\footer.png" alt="Niorra" className="w-full" />
      </div>
    </footer>
  );
}
