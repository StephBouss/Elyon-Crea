export const displayName = 'Elyon Portfolio';
export const shortDescription = 'Portfolio gallery with results';

import Image from '@global/Image';

const projects = [
  {
    category: t('Branding & Print'),
    title: t('Rebranding Gabon Oil Corp'),
    result: t('+180% de notoriété'),
    prompt: 'professional corporate rebranding mockup, dark elegant design, oil company branding materials'
  },
  {
    category: t('Marketing Digital'),
    title: t('Campagne sociale Moov Africa'),
    result: t('+120% d\'engagement'),
    prompt: 'vibrant social media campaign mockup, telecom brand, colorful digital marketing visuals'
  },
  {
    category: t('Web & Développement'),
    title: t('Site e-commerce Savane Mode'),
    result: t('+95% de trafic organique'),
    prompt: 'modern fashion e-commerce website design mockup, dark premium interface, African fashion brand'
  },
  {
    category: t('BTL & Activation'),
    title: t('Activation terrain Total Energies'),
    result: t('12 000 contacts directs'),
    prompt: 'brand activation event photo, energetic crowd, branded booth and promotional materials, Gabon Africa'
  },
  {
    category: t('Production Vidéo'),
    title: t('Spot TV BGFI Bank'),
    result: t('3,2M de vues'),
    prompt: 'professional TV commercial production still, banking brand, cinematic luxury look'
  },
  {
    category: t('Stratégie & Conseil'),
    title: t('Plan com 360° SEEG'),
    result: t('ROI x4 en 6 mois'),
    prompt: 'strategic communication planning presentation, corporate boardroom, professional setting Africa'
  },
];

export default function ElyonPortfolio() {
  return (
    <div className="w-full bg-light py-24 px-24">
      <div className="text-center mb-16">
        <span className="text-xs font-semibold tracking-widest uppercase text-accent-magenta font-body mb-3 block">{t('Réalisations')}</span>
        <h2 className="text-4xl font-headings font-bold text-foreground mb-4">{t('Des résultats qui parlent d\'eux-mêmes')}</h2>
        <p className="text-base font-body text-muted max-w-lg mx-auto">{t('Découvrez une sélection de projets livrés pour des marques gabonaises et panafricaines.')}</p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <div key={i} className="rounded-lg overflow-hidden bg-background border border-light-card">
            <div className="relative">
              <Image prompt={p.prompt} ar="4:3" className="w-full" />
              <div className="absolute inset-0 flex items-end p-4" style={{ background: 'linear-gradient(to top, rgba(14,14,14,0.85) 0%, transparent 60%)' }}>
                <span className="inline-block bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded font-body">{p.result}</span>
              </div>
            </div>
            <div className="p-5">
              <span className="text-xs text-accent-magenta font-semibold tracking-wide font-body block mb-1">{p.category}</span>
              <h3 className="text-base font-headings font-bold text-foreground">{p.title}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <button className="border border-accent-magenta text-accent-magenta px-8 py-4 rounded-md font-semibold text-base font-body">
          {t('Voir tous nos projets')}
        </button>
      </div>
    </div>
  );
}
