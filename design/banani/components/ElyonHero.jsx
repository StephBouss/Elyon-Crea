export const displayName = 'Elyon Hero Slideshow';
export const shortDescription = 'Hero section with slideshow slides';

import Icon from '@global/Icon';
import Image from '@global/Image';

const slides = [
  {
    tag: t('Stratégie & Campagnes'),
    title: t('De la stratégie au déploiement —'),
    titleAccent: t('votre communication 360°'),
    sub: t('Elyon Créa conçoit et exécute des stratégies de communication globales pour faire rayonner votre marque.'),
    prompt: 'dramatic dark background with a hummingbird in motion, magenta and gold gradient light trails, professional agency atmosphere, cinematic',
  },
  {
    tag: t('Création & Design'),
    title: t('Des visuels qui captivent,'),
    titleAccent: t('une identité qui marque les esprits'),
    sub: t('Branding, print, motion design — nous créons des univers visuels cohérents et mémorables.'),
    prompt: 'dark creative studio background with abstract colorful design elements, magenta gold gradient, luxury premium feel',
  },
  {
    tag: t('Digital & Web'),
    title: t('Votre présence digitale,'),
    titleAccent: t('amplifiée et optimisée'),
    sub: t('Sites web, SEO, social media et publicité en ligne — une empreinte digitale forte et mesurable.'),
    prompt: 'dark digital landscape with glowing network nodes, magenta and gold accents, technology premium background',
  },
  {
    tag: t('Intelligence Artificielle'),
    title: t('L\'IA au service'),
    titleAccent: t('de votre communication'),
    sub: t('Contenus générés par IA, chatbots, automatisation — intégrez le futur dans votre stratégie dès aujourd\'hui.'),
    prompt: 'dark futuristic AI background with neural network patterns, magenta and gold glowing circuits, premium technology',
  },
];

export default function ElyonHero({ activeSlide = 0 }) {
  const slide = slides[activeSlide];
  return (
    <div className="relative w-full" style={{ height: '760px' }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <Image prompt={slide.prompt} ar="16:9" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(14,14,14,0.92) 55%, rgba(14,14,14,0.5) 100%)' }} />
      </div>

      {/* Hummingbird SVG watermark */}
      <div className="absolute right-32 top-1/2 -translate-y-1/2 opacity-10">
        <svg width="380" height="380" viewBox="0 0 200 200" fill="none">
          <ellipse cx="130" cy="80" rx="60" ry="30" fill="url(#hg)" transform="rotate(-30 130 80)" />
          <circle cx="100" cy="60" r="18" fill="url(#hg)" />
          <ellipse cx="70" cy="90" rx="40" ry="18" fill="url(#hg)" transform="rotate(10 70 90)" />
          <defs>
            <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#C2147A" />
              <stop offset="1" stopColor="#F9B000" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-24 max-w-3xl">
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-secondary mb-6 font-body">
          <span className="w-8 h-px bg-secondary inline-block" />
          {slide.tag}
        </span>
        <h1 className="text-5xl font-headings font-bold text-light leading-tight mb-2">
          {slide.title}
        </h1>
        <h1 className="text-5xl font-headings font-bold mb-6 leading-tight" style={{ background: 'linear-gradient(90deg, #C2147A, #F9B000)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {slide.titleAccent}
        </h1>
        <p className="text-lg text-muted-foreground font-body mb-10 leading-relaxed max-w-xl">
          {slide.sub}
        </p>
        <div className="flex items-center gap-4">
          <button className="bg-secondary text-secondary-foreground px-8 py-4 rounded-md font-semibold text-base font-body">
            {t('Démarrer mon projet')}
          </button>
          <button className="border border-light text-light px-8 py-4 rounded-md font-semibold text-base font-body">
            {t('Voir nos réalisations')}
          </button>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-10 left-24 flex items-center gap-3">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`rounded-full ${i === activeSlide ? 'w-8 h-2 bg-secondary' : 'w-2 h-2 bg-muted-foreground'}`}
          />
        ))}
      </div>

      {/* Arrows */}
      <div className="absolute bottom-8 right-24 flex items-center gap-3">
        <button className="w-10 h-10 rounded-full border border-muted-foreground flex items-center justify-center text-muted-foreground">
          <Icon i="chevron-left" size={18} />
        </button>
        <button className="w-10 h-10 rounded-full border border-secondary flex items-center justify-center text-secondary">
          <Icon i="chevron-right" size={18} />
        </button>
      </div>
    </div>
  );
}
