export const displayName = 'Elyon Formules Tarifs';
export const shortDescription = '3 cartes de prix côte à côte';

import Icon from '@global/Icon';

const formules = [
  {
    name: t('Envol Découverte'),
    price: t('150 000 FCFA'),
    priceNote: null,
    badge: null,
    tagline: t('La porte d\'entrée.'),
    desc: t('Logo relooké + charte simplifiée + carte de visite.'),
    color: '#F9B000',
    featured: false,
    items: [
      t('Logo relooké'),
      t('Charte graphique simplifiée'),
      t('Carte de visite'),
    ],
    cta: t('Démarrer'),
  },
  {
    name: t('Envol 360°'),
    price: t('500 000 FCFA'),
    priceNote: null,
    badge: t('Le plus choisi'),
    tagline: t('La marque complète, clé en main.'),
    desc: t('Logo + charte, site vitrine, 5 templates réseaux + calendrier, kit papeterie, pack goodies, 1 support grand format.'),
    color: '#F9B000',
    featured: true,
    items: [
      t('Logo + charte graphique complète'),
      t('Site vitrine mobile-first'),
      t('5 templates réseaux + calendrier 1 mois'),
      t('Kit papeterie complet'),
      t('Pack goodies personnalisés'),
      t('1 support grand format prêt à imprimer'),
    ],
    cta: t('Je veux L\'Envol 360°'),
  },
  {
    name: t('Envol Signature'),
    price: t('Sur devis'),
    priceNote: t('dès 1 000 000 FCFA'),
    badge: null,
    tagline: t('Pour les marques qui visent l\'excellence.'),
    desc: t('Tout L\'Envol 360° + community management 3 mois + shooting + gestion de votre campagne publicitaire.'),
    color: '#F9B000',
    featured: false,
    items: [
      t('Tout L\'Envol 360°'),
      t('Community management 3 mois'),
      t('Shooting photo / vidéo'),
      t('Gestion campagne publicitaire'),
    ],
    cta: t('Demander un devis'),
  },
];

export default function ElyonFormules() {
  return (
    <div className="w-full py-24 px-24 relative overflow-hidden" style={{
      background: 'linear-gradient(160deg, #0d0010 0%, #0a0a0a 35%, #100800 65%, #0d0010 100%)',
    }}>
      {/* Large center glow gold */}
      <div className="absolute pointer-events-none" style={{ top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '500px', background: 'radial-gradient(ellipse, rgba(249,176,0,0.18) 0%, transparent 65%)' }} />
      {/* Left violet glow */}
      <div className="absolute pointer-events-none" style={{ top: '20%', left: '-5%', width: '500px', height: '500px', background: 'radial-gradient(ellipse, rgba(120,40,200,0.22) 0%, transparent 65%)' }} />
      {/* Right violet glow */}
      <div className="absolute pointer-events-none" style={{ bottom: '0%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(ellipse, rgba(160,30,220,0.18) 0%, transparent 65%)' }} />
      {/* Bottom gold glow */}
      <div className="absolute pointer-events-none" style={{ bottom: '-10%', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '300px', background: 'radial-gradient(ellipse, rgba(249,176,0,0.10) 0%, transparent 65%)' }} />
      {/* Top shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(120,40,200,0.4) 20%, rgba(249,176,0,0.8) 50%, rgba(120,40,200,0.4) 80%, transparent 100%)' }} />
      {/* Bottom shimmer line */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(120,40,200,0.3) 30%, rgba(249,176,0,0.5) 50%, rgba(120,40,200,0.3) 70%, transparent 100%)' }} />
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-xs font-semibold tracking-widest uppercase font-body mb-3 block" style={{ color: '#C2147A' }}>
          {t('Formules & Tarifs')}
        </span>
        <h2 className="text-4xl font-headings font-bold leading-tight mb-4" style={{ color: '#f0f0f0' }}>
          {t('Choisissez la formule qui vous fait décoller.')}
        </h2>
        <p className="text-base font-body max-w-lg mx-auto" style={{ color: '#7a7a7a' }}>
          {t('Des offres pensées pour chaque étape de votre croissance, sans surprise ni mauvaise surprise.')}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-6 items-start">
        {formules.map((f, i) => (
          <div
            key={i}
            className="relative rounded-2xl flex flex-col"
            style={{
              background: f.featured ? 'linear-gradient(145deg, #1a1200 0%, #1f1800 100%)' : '#111111',
              border: f.featured ? '1px solid #F9B00060' : '1px solid #222222',
              padding: f.featured ? '40px 32px 36px' : '32px 28px 28px',
              boxShadow: f.featured ? '0 0 60px rgba(249,176,0,0.1)' : 'none',
            }}
          >
            {/* Badge */}
            {f.badge && (
              <div className="absolute -top-4 left-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold font-body"
                style={{
                  background: '#F9B000',
                  color: '#ffffff',
                  transform: 'translateX(-50%)',
                  whiteSpace: 'nowrap',
                }}>
                <Icon i="star" size={12} />
                {f.badge}
              </div>
            )}

            {/* Plan name */}
            <span className="text-xs font-semibold tracking-widest uppercase font-body mb-3 block" style={{ color: f.color }}>
              {f.name}
            </span>

            {/* Price */}
            <div className="mb-1">
              <span className="text-3xl font-headings font-bold" style={{ color: '#f0f0f0' }}>{f.price}</span>
            </div>
            {f.priceNote && (
              <p className="text-xs font-body mb-1" style={{ color: '#7a7a7a' }}>{f.priceNote}</p>
            )}

            {/* Tagline */}
            <p className="text-sm font-body mb-2" style={{ color: '#7a7a7a' }}>{f.tagline}</p>
            <p className="text-sm font-body mb-6" style={{ color: '#aaaaaa' }}>{f.desc}</p>

            {/* Divider */}
            <div className="w-full h-px mb-6" style={{ background: '#222222' }} />

            {/* Features */}
            <ul className="flex flex-col gap-3 mb-8">
              {f.items.map((item, j) => (
                <li key={j} className="flex items-center gap-3 text-sm font-body" style={{ color: '#c0c0c0' }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: `${f.color}20` }}>
                    <Icon i="check" size={11} style={{ color: f.color }} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              className="w-full py-3 rounded-xl text-sm font-semibold font-body mt-auto"
              style={f.featured
                ? { background: '#F9B000', color: '#0d0d0d' }
                : { background: 'transparent', color: f.color, border: `1px solid ${f.color}60` }
              }
            >
              {f.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
