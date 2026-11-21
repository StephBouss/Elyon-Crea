export const displayName = 'Elyon Réalisations Page';
export const shortDescription = 'Full portfolio page with filters and project cards';

import Image from '@global/Image';
import Icon from '@global/Icon';

const categories = [
  t('Tous'),
  t('Branding & Print'),
  t('Marketing Digital'),
  t('Web & Développement'),
  t('BTL & Activation'),
  t('Production Vidéo'),
  t('Stratégie & Conseil'),
];

const projects = [
  {
    category: t('Branding & Print'),
    title: t('Rebranding Gabon Oil Corp'),
    result: t('+180% de notoriété'),
    description: t('Refonte complète de l\'identité visuelle : logo, charte graphique, supports de communication print et digitaux.'),
    prompt: 'professional corporate rebranding mockup, dark elegant design, oil company branding materials',
  },
  {
    category: t('Marketing Digital'),
    title: t('Campagne sociale Moov Africa'),
    result: t('+120% d\'engagement'),
    description: t('Stratégie de contenu, création de visuels et gestion des réseaux sociaux sur 6 mois.'),
    prompt: 'vibrant social media campaign mockup, telecom brand, colorful digital marketing visuals',
  },
  {
    category: t('Web & Développement'),
    title: t('Site e-commerce Savane Mode'),
    result: t('+95% de trafic organique'),
    description: t('Conception UX/UI et développement d\'une plateforme e-commerce pour une marque de mode africaine.'),
    prompt: 'modern fashion e-commerce website design mockup, dark premium interface, African fashion brand',
  },
  {
    category: t('BTL & Activation'),
    title: t('Activation terrain Total Energies'),
    result: t('12 000 contacts directs'),
    description: t('Organisation et animation d\'événements de proximité à Libreville, Port-Gentil et Franceville.'),
    prompt: 'brand activation event photo, energetic crowd, branded booth and promotional materials, Gabon Africa',
  },
  {
    category: t('Production Vidéo'),
    title: t('Spot TV BGFI Bank'),
    result: t('3,2M de vues'),
    description: t('Production d\'un spot publicitaire 30 secondes : écriture, tournage, montage et diffusion nationale.'),
    prompt: 'professional TV commercial production still, banking brand, cinematic luxury look',
  },
  {
    category: t('Stratégie & Conseil'),
    title: t('Plan com 360° SEEG'),
    result: t('ROI x4 en 6 mois'),
    description: t('Audit de communication, plan stratégique annuel et accompagnement à la mise en œuvre.'),
    prompt: 'strategic communication planning presentation, corporate boardroom, professional setting Africa',
  },
  {
    category: t('Branding & Print'),
    title: t('Identité visuelle Olam Gabon'),
    result: t('Déploiement national'),
    description: t('Création de la charte graphique et déclinaison sur l\'ensemble des supports terrain et digitaux.'),
    prompt: 'corporate identity design materials, agribusiness brand Gabon, professional branding presentation',
  },
  {
    category: t('Marketing Digital'),
    title: t('SEO & Ads Sobraga'),
    result: t('+210% de leads qualifiés'),
    description: t('Optimisation SEO, gestion Google Ads et Meta Ads avec reporting mensuel détaillé.'),
    prompt: 'digital marketing analytics dashboard, beverages brand campaign, colorful advertising materials',
  },
  {
    category: t('Production Vidéo'),
    title: t('Documentaire Libreville Smart City'),
    result: t('Diffusé sur Gabon 1ère'),
    description: t('Production d\'un documentaire institutionnel de 12 minutes pour la mairie de Libreville.'),
    prompt: 'documentary film production, modern African city aerial view, cinematic urban photography Libreville',
  },
];

export default function ElyonRealisationsPage() {
  return (
    <div>
      {/* Filters bar */}
      <div className="px-24 py-10 border-b" style={{ borderColor: '#1e1e1e' }}>
        <div className="flex items-center gap-3 flex-wrap">
          {categories.map((cat, i) => (
            <button
              key={i}
              className={`px-5 py-2 rounded-full font-body text-sm font-semibold border ${i === 0 ? 'border-transparent text-dark' : 'border-border text-muted-foreground'}`}
              style={i === 0 ? { background: '#F9B000' } : { background: 'transparent', borderColor: '#2a2a2a' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="px-24 py-10 flex items-center gap-16 border-b" style={{ borderColor: '#1e1e1e' }}>
        {[
          { num: t('47+'), label: t('Projets livrés') },
          { num: t('30+'), label: t('Marques accompagnées') },
          { num: t('6'), label: t('Secteurs d\'activité') },
          { num: t('100%'), label: t('Clients satisfaits') },
        ].map((s, i) => (
          <div key={i} className="flex flex-col gap-1">
            <span className="text-3xl font-headings font-bold" style={{ color: '#F9B000' }}>{s.num}</span>
            <span className="font-body text-sm" style={{ color: '#9a9a9a' }}>{s.label}</span>
          </div>
        ))}
        <div className="ml-auto">
          <a className="font-body text-sm font-semibold flex items-center gap-2" style={{ color: '#C2147A' }}>
            {t('Discuter de votre projet')} <Icon i="arrow-right" size={16} />
          </a>
        </div>
      </div>

      {/* Grid */}
      <div className="px-24 py-16">
        <div className="grid grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <div key={i} className="rounded-xl overflow-hidden border" style={{ background: '#141414', borderColor: '#222' }}>
              <div className="relative">
                <Image prompt={p.prompt} ar="4:3" className="w-full" />
                <div className="absolute inset-0 flex items-end p-4" style={{ background: 'linear-gradient(to top, rgba(14,14,14,0.88) 0%, transparent 55%)' }}>
                  <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full font-body" style={{ background: '#F9B000', color: '#0E0E0E' }}>{p.result}</span>
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold tracking-wide font-body block mb-2" style={{ color: '#C2147A' }}>{p.category}</span>
                <h3 className="text-base font-headings font-bold mb-2" style={{ color: '#f0f0f0' }}>{p.title}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: '#9a9a9a' }}>{p.description}</p>
                <a className="mt-4 flex items-center gap-1 font-body text-sm font-semibold" style={{ color: '#F9B000' }}>
                  {t('Voir le projet')} <Icon i="arrow-right" size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
