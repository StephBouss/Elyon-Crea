import { SmoothScroll } from "@/components/site/motion/smooth-scroll";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { siteConfig } from "@/lib/site-config";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const whatsAppHref = buildWhatsAppLink(siteConfig.whatsappNumero, siteConfig.messageWhatsAppDefaut);

  return (
    <SmoothScroll>
      <div className="flex min-h-dvh flex-col bg-canvas">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer whatsAppHref={whatsAppHref} />
        {whatsAppHref && <WhatsAppButton href={whatsAppHref} />}
      </div>
    </SmoothScroll>
  );
}
