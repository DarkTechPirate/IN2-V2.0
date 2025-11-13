import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div
              className="text-2xl mb-4 tracking-tight"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              IN<span style={{ color: "#2FF924" }}>2</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t("footer.slogan")}
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
              {t("footer.company")}
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a
                  href="#"
                  className="hover:text-primary_green transition-colors"
                >
                  {t("footer.aboutUs")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary_green transition-colors"
                >
                  {t("footer.careers")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary_green transition-colors"
                >
                  {t("footer.press")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary_green transition-colors"
                >
                  {t("footer.blog")}
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
              {t("footer.support")}
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a
                  href="#"
                  className="hover:text-primary_green transition-colors"
                >
                  {t("footer.contactUs")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary_green transition-colors"
                >
                  {t("footer.shipping")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary_green transition-colors"
                >
                  {t("footer.returns")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary_green transition-colors"
                >
                  {t("footer.privacyPolicy")}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
              {t("footer.stayUpdated")}
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              {t("footer.newsletter")}
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder={t("footer.yourEmail")}
                className="flex-1 border-gray-300 focus:border-primary_green focus:ring-primary_green"
              />
              <Button
                className="bg-primary_green hover:bg-[#26d41f] text-white transition-all duration-300"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {t("footer.join")}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">{t("footer.copyright")}</p>

          <div className="flex gap-4">
            <a
              href="#"
              className="p-2 rounded-full hover:bg-primary_green/10 transition-colors"
              aria-label={t("contact.facebook")}
            >
              <Facebook className="w-5 h-5 text-gray-600 hover:text-primary_green transition-colors" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full hover:bg-primary_green/10 transition-colors"
              aria-label={t("contact.instagram")}
            >
              <Instagram className="w-5 h-5 text-gray-600 hover:text-primary_green transition-colors" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full hover:bg-primary_green/10 transition-colors"
              aria-label={t("contact.twitter")}
            >
              <Twitter className="w-5 h-5 text-gray-600 hover:text-primary_green transition-colors" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full hover:bg-primary_green/10 transition-colors"
              aria-label={t("contact.youtube")}
            >
              <Youtube className="w-5 h-5 text-gray-600 hover:text-primary_green transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
