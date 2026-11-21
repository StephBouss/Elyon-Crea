export const displayName = 'Elyon Campaign Path';
export const shortDescription = 'Horizontal campaign journey steps';

import Icon from '@global/Icon';

const steps = [
  { icon: 'target', label: t('Stratégie') },
  { icon: 'pen-tool', label: t('Création') },
  { icon: 'radio', label: t('Média') },
  { icon: 'map-pin', label: t('Outdoor') },
  { icon: 'users', label: t('Terrain') },
];

export default function ElyonCampaignPath() {
  return (
    <div className="w-full bg-dark py-20 px-24">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold tracking-widest uppercase text-secondary font-body mb-3 block">{t('Notre parcours campagne')}</span>
        <h2 className="text-3xl font-headings font-bold text-light">{t('De la stratégie au terrain — en un seul flux')}</h2>
      </div>
      <div className="flex items-center justify-center gap-0">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full border-2 border-accent-magenta flex items-center justify-center bg-dark-card text-secondary">
                <Icon i={step.icon} size={24} />
              </div>
              <span className="text-sm font-body font-semibold text-light tracking-wide">{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex items-center mx-4 mb-6">
                <div className="w-16 h-px bg-accent-magenta" />
                <div className="text-accent-magenta ml-1"><Icon i="chevron-right" size={16} /></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
