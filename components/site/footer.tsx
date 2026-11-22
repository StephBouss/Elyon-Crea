import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FooterName } from "@/components/site/footer-name";
import { FacebookIcon, LinkedinIcon, WhatsAppIcon } from "@/components/site/icons/brand-icons";
import { Logo } from "@/components/site/logo";
import { NAV_LINKS } from "@/lib/navigation";
import { A_CONFIRMER, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const columnsTitle = "text-label mb-3 text-accent";
const footerLink = "inline-flex min-h-11 items-center rounded-sm text-ash hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";
const socialLinks = [
  { name: "Facebook", href: siteConfig.reseaux.facebook, Icon: FacebookIcon },
  { name: "LinkedIn", href: siteConfig.reseaux.linkedin, Icon: LinkedinIcon },
];

export function Footer({ whatsAppHref }: { whatsAppHref: string | null }) {
  const phone = siteConfig.telephoneAffiche;
  const telHref = phone.replace(/[^+\d]/g, "");

  return (
    <footer id="contact" className="text-body-lg bg-canvas text-ash">
      <div className={cn(
        "mx-auto w-full max-w-[1280px] ps-5 pt-24 md:ps-10 lg:pt-32",
        whatsAppHref
          ? "pe-[calc(5.5rem+env(safe-area-inset-right))] pb-[calc(7rem+env(safe-area-inset-bottom))] md:pe-[calc(6rem+env(safe-area-inset-right))] md:pb-[calc(6rem+env(safe-area-inset-bottom))]"
          : "pe-5 pb-12 md:pe-10",
      )}>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div className="min-w-0">
            <Logo className="h-auto w-36 md:h-auto md:w-40" />
            <p className="mt-4 text-pretty">Communication visuelle &amp; digitale</p>
            {socialLinks.some(({ href }) => href) && (
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Réseaux sociaux">
                {socialLinks.map(({ name, href, Icon }) => href && (
                  <li key={name}>
                    <a href={href} aria-label={name} target="_blank" rel="noopener noreferrer" className={cn(footerLink, "min-w-11 justify-center")}>
                      <Icon className="size-5" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-labelledby="footer-navigation" className="min-w-0">
            <h2 id="footer-navigation" className={columnsTitle}>Navigation</h2>
            <ul>
              {[...NAV_LINKS, { href: "/audit-gratuit", label: "Audit gratuit" }].map(({ href, label }) => (
                <li key={href}><Link prefetch={false} className={footerLink} href={href}>{label}</Link></li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
            <h2 className={columnsTitle}>Contact</h2>
            <ul>
              <li className="flex min-h-11 items-center gap-2">
                <MapPin aria-hidden="true" className="size-4 shrink-0 text-accent" />
                {siteConfig.ville}
              </li>
              <li className="flex min-h-11 items-center gap-2">
                <Phone aria-hidden="true" className="size-4 shrink-0 text-accent" />
                {phone === A_CONFIRMER || !/\d/.test(telHref)
                  ? <span>{phone}</span>
                  : <a className={footerLink} href={`tel:${telHref}`}>{phone}</a>}
              </li>
              <li className="flex min-h-11 min-w-0 items-center gap-2">
                <Mail aria-hidden="true" className="size-4 shrink-0 text-accent" />
                <a className={cn(footerLink, "min-w-0")} href={`mailto:${siteConfig.email}`}>
                  <span className="wrap-anywhere">{siteConfig.email}</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="min-w-0">
            <h2 className={columnsTitle}>WhatsApp</h2>
            {whatsAppHref ? (
              <a href={whatsAppHref} target="_blank" rel="noopener noreferrer" className="btn-ghost text-accent">
                <WhatsAppIcon className="size-4 shrink-0" />
                Écrire sur WhatsApp
              </a>
            ) : <p className="flex min-h-11 items-center">{A_CONFIRMER}</p>}
            <p>Réponse {siteConfig.delaiReponse}</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start gap-x-6 gap-y-1 md:mt-24 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.nom} · {siteConfig.ville}</p>
          <Link prefetch={false} href="/mentions-legales" className={footerLink}>Mentions légales</Link>
        </div>
        <FooterName name={siteConfig.nom} />
      </div>
    </footer>
  );
}
