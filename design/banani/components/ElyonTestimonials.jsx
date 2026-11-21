export const displayName = 'Elyon Testimonials';
export const shortDescription = 'Client testimonials carousel';

import UserAvatar from '@global/UserAvatar';

const testimonials = [
  {
    text: t('"Elyon Créa a complètement transformé notre image de marque. En 3 mois, notre notoriété a explosé et nos ventes ont suivi. Une équipe vraiment professionnelle et créative."'),
    name: t('Madeleine Ondo'),
    company: t('Directrice Marketing, BGFI Bank'),
    gender: 'female',
    heritage: 'African',
    age: '35-50',
    idx: 0,
  },
  {
    text: t('"La campagne digitale qu\'ils ont conçue pour nous a généré des résultats que nous n\'aurions jamais imaginés. ROI exceptionnel, équipe à l\'écoute et réactive."'),
    name: t('Jean-Marc Essono'),
    company: t('CEO, Savane Immobilier'),
    gender: 'male',
    heritage: 'African',
    age: '35-50',
    idx: 1,
  },
  {
    text: t('"Un partenaire de confiance qui comprend les spécificités du marché gabonais. Leur approche 360° nous a permis de lancer notre produit avec un impact maximal."'),
    name: t('Christelle Mbong'),
    company: t('Brand Manager, Moov Africa Gabon'),
    gender: 'female',
    heritage: 'African',
    age: '25-35',
    idx: 2,
  },
];

export default function ElyonTestimonials() {
  return (
    <div className="w-full bg-light py-24 px-24">
      <div className="text-center mb-16">
        <span className="text-xs font-semibold tracking-widest uppercase text-accent-magenta font-body mb-3 block">{t('Témoignages')}</span>
        <h2 className="text-4xl font-headings font-bold text-foreground">{t('Ce que disent nos clients')}</h2>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {testimonials.map((t2, i) => (
          <div key={i} className="bg-background rounded-lg p-8 border border-light-card flex flex-col gap-5">
            <div className="flex gap-1 mb-1">
              {[1,2,3,4,5].map(s => <span key={s} className="text-secondary text-base">★</span>)}
            </div>
            <p className="text-sm font-body leading-relaxed text-muted italic">{t2.text}</p>
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-light-card">
              <UserAvatar gender={t2.gender} heritage={t2.heritage} ageGroup={t2.age} index={t2.idx} className="w-12 h-12 rounded-full" />
              <div>
                <p className="text-sm font-headings font-bold text-foreground">{t2.name}</p>
                <p className="text-xs font-body text-muted-foreground">{t2.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
