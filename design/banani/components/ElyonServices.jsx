export const displayName = 'Elyon Services Grid';
export const shortDescription = 'Grid of 8 service cards';

import Icon from '@global/Icon';

const services = [
  { icon: 'lightbulb', title: t('Stratégie & Conseil'), desc: t('Audit, positionnement, plan de communication et recommandations stratégiques sur mesure.') },
  { icon: 'printer', title: t('Création & Print'), desc: t('Identité visuelle, flyers, affiches, brochures — des supports imprimés qui impactent.') },
  { icon: 'monitor', title: t('Web & Développement'), desc: t('Sites vitrines, e-commerce, applications web modernes et performantes.') },
  { icon: 'trending-up', title: t('Marketing Digital'), desc: t('SEO, SEM, email marketing — maximisez votre visibilité et vos conversions en ligne.') },
  { icon: 'instagram', title: t('Réseaux Sociaux'), desc: t('Création de contenu, community management et stratégie social media.') },
  { icon: 'video', title: t('Production Audiovisuelle'), desc: t('Spots TV, films d\'entreprise, motion design et podcasts professionnels.') },
  { icon: 'megaphone', title: t('BTL & Activation'), desc: t('Événementiel, animations terrain, street marketing et expériences immersives.') },
  { icon: 'bar-chart-2', title: t('Gestion Campagnes & Média'), desc: t('Planification médias, achat d\'espaces et pilotage de campagnes multicanaux.') },
];

export default function ElyonServices() {
  return (
    <div className="w-full bg-light py-24 px-24">
      <div className="text-center mb-16">
        <span className="text-xs font-semibold tracking-widest uppercase text-accent-magenta font-body mb-3 block">{t('Nos expertises')}</span>
        <h2 className="text-4xl font-headings font-bold text-foreground mb-4">{t('Un spectre complet de services')}</h2>
        <p className="text-base font-body text-muted max-w-xl mx-auto">{t('De la conception à l\'exécution, nous couvrons tous les leviers de votre communication.')}</p>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {services.map((s, i) => (
          <div key={i} className="bg-background rounded-lg p-6 border border-light-card group">
            <div className="w-12 h-12 rounded-md bg-light-card flex items-center justify-center mb-4 text-accent-magenta">
              <Icon i={s.icon} size={22} />
            </div>
            <h3 className="text-base font-headings font-bold text-foreground mb-2">{s.title}</h3>
            <p className="text-sm font-body text-muted leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
