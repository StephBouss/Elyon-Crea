export const displayName = 'Elyon Problem Solution V2';
export const shortDescription = 'Section Problème → Solution L\'Envol 360°';

import Icon from '@global/Icon';

const benefits = [
  { icon: 'user', label: t('Un seul interlocuteur'), desc: t('Une équipe, un chef de projet, une vision d\'ensemble.') },
  { icon: 'layers', label: t('Cohérent partout'), desc: t('Du logo au goodie, la même identité forte.') },
];

export default function ElyonProblemSolutionV2() {
  return (
    <div className="w-full bg-light py-24 px-24 flex items-start gap-20">
      {/* Problem */}
      <div className="flex-1">
        <span className="text-xs font-semibold tracking-widest uppercase text-accent-magenta font-body mb-4 block">{t('Le problème')}</span>
        <h2 className="text-4xl font-headings font-bold text-foreground leading-tight mb-6">
          {t('Une image qui fait « amateur » fait fuir vos clients avant même de vous parler.')}
        </h2>
        <p className="text-base font-body text-muted leading-relaxed">
          {t('On vous juge en 3 secondes. Un logo bricolé, un site absent, des visuels réseaux incohérents… et le client sérieux passe à côté, même si votre travail est excellent. Et jongler avec cinq prestataires différents ne donne qu\'une image décousue et des délais qui s\'éternisent.')}
        </p>
      </div>

      {/* Divider arrow */}
      <div className="flex flex-col items-center self-stretch justify-center gap-0">
        <div className="flex-1 w-px bg-accent-magenta" />
        <div className="w-10 h-10 rounded-full bg-accent-magenta flex items-center justify-center flex-shrink-0 my-3">
          <span className="text-white text-xl font-bold">→</span>
        </div>
        <div className="flex-1 w-px bg-accent-magenta" />
      </div>

      {/* Solution */}
      <div className="flex-1">
        <span className="text-xs font-semibold tracking-widest uppercase text-secondary font-body mb-4 block">{t('SOLUTION — L\'ENVOL 360°')}</span>
        <h2 className="text-4xl font-headings font-bold text-foreground leading-tight mb-6">
          {t('L\'Envol 360° — votre marque complète, clé en main.')}
        </h2>
        <p className="text-base font-body text-muted leading-relaxed mb-8">
          {t('Tout ce qu\'il faut pour être vu, reconnu et choisi, réuni par une seule équipe créative. Vous validez, on exécute.')}
        </p>
        <ul className="flex flex-col gap-4">
          {benefits.map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(194,20,122,0.10)' }}>
                <Icon i={b.icon} size={15} style={{ color: '#C2147A' }} />
              </div>
              <div>
                <span className="text-sm font-semibold font-body text-foreground block">{b.label}</span>
                <span className="text-sm font-body text-muted">{b.desc}</span>
              </div>
            </li>
          ))}
        </ul>
        <button className="mt-8 bg-secondary text-secondary-foreground px-6 py-3 rounded-md font-semibold text-base font-body">
          {t('Réserve ton offre')}
        </button>
      </div>
    </div>
  );
}
