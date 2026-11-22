import { SmoothScroll } from "@/components/site/motion/smooth-scroll";
import { Header } from "@/components/site/header";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <div className="flex min-h-dvh flex-col bg-canvas">
        <Header />
        <div className="flex-1">{children}</div>
      </div>
    </SmoothScroll>
  );
}
