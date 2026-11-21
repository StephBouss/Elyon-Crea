export const displayName = 'Elyon Method';
export const shortDescription = 'Numbered method steps';

const steps = [
  { n: '01', title: t('Brief'), desc: t('Nous écoutons vos objectifs, vos contraintes et votre vision pour définir les enjeux.') },
  { n: '02', title: t('Stratégie'), desc: t('Notre équipe élabore un plan d\'action ciblé, adapté à votre marché et votre budget.') },
  { n: '03', title: t('Création'), desc: t('Nos créatifs produisent des contenus percutants alignés sur votre identité de marque.') },
  { n: '04', title: t('Déploiement'), desc: t('Nous activons simultanément tous les canaux retenus : digital, print, terrain, médias.') },
  { n: '05', title: t('Suivi & Optimisation'), desc: t('Reporting régulier, analyse des KPIs et ajustements pour maximiser le ROI.') },
];

export default function ElyonMethod() {
  return (
    <div className="w-full bg-dark py-24 px-24">
      <div className="text-center mb-16">
        <span className="text-xs font-semibold tracking-widest uppercase text-secondary font-body mb-3 block">{t('Notre méthode')}</span>
        <h2 className="text-4xl font-headings font-bold text-light">{t('5 étapes pour une communication qui performe')}</h2>
      </div>
      <div className="flex items-start gap-6">
        {steps.map((s, i) => (
          <div key={i} className="flex-1 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-secondary mb-5">
              <span className="text-secondary font-headings font-bold text-lg">{s.n}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="absolute" style={{ marginTop: '28px', marginLeft: '180px', width: '80px', height: '2px', background: 'rgba(249,176,0,0.3)' }} />
            )}
            <h3 className="text-base font-headings font-bold text-light mb-3">{s.title}</h3>
            <p className="text-sm font-body leading-relaxed" style={{ color: '#9a9a9a' }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
