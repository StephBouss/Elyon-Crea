export const displayName = 'Elyon FAQ';
export const shortDescription = 'FAQ accordion section';

import Icon from '@global/Icon';

const faqs = [
  {
    q: t('C\'est trop cher pour moi.'),
    a: t('Commencez par l\'Envol Découverte à 150 000 FCFA, puis montez en puissance quand votre marque génère des clients.'),
  },
  {
    q: t('J\'ai déjà un logo.'),
    a: t('Parfait. On le relooke et on construit tout le reste autour pour une image cohérente.'),
  },
  {
    q: t('Combien de temps ?'),
    a: t('30 jours pour L\'Envol 360°, avec un calendrier partagé dès le départ.'),
  },
  {
    q: t('Et si je ne suis pas satisfait ?'),
    a: t('On retravaille jusqu\'à votre validation. Vous ne payez pas pour une image que vous n\'assumez pas.'),
  },
  {
    q: t('Vous faites aussi l\'impression et les goodies ?'),
    a: t('Oui. Print tous formats et objets publicitaires personnalisés font partie de l\'offre.'),
  },
];

export default function ElyonFAQ() {
  return (
    <div className="w-full bg-light py-24 px-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent-magenta font-body mb-3 block">{t('FAQ')}</span>
          <h2 className="text-4xl font-headings font-bold text-foreground">{t('Questions fréquentes')}</h2>
        </div>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div key={i} className={`rounded-lg border p-6 ${i === 0 ? 'border-accent-magenta bg-background' : 'border-light-card bg-background'}`}>
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-base font-headings font-semibold text-foreground">{faq.q}</h3>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${i === 0 ? 'bg-accent-magenta text-white' : 'border border-light-card text-muted-foreground'}`}>
                  <Icon i={i === 0 ? 'minus' : 'plus'} size={14} />
                </div>
              </div>
              {i === 0 && (
                <p className="text-sm font-body text-muted leading-relaxed mt-4">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
