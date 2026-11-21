export const displayName = 'Elyon Garantie';
export const shortDescription = 'Section Garantie — satisfaction et délai garantis';

import Icon from '@global/Icon';

const badges = [
  { icon: 'shield-check', label: t('Satisfaction garantie') },
  { icon: 'clock', label: t('Délai garanti') },
];

export default function ElyonGarantie() {
  return (
    <div className="w-full py-24 px-24 flex items-start gap-20" style={{ background: '#0a0a0a' }}>
      {/* Left — label + headline */}
      <div className="flex-1">
        <span className="text-xs font-semibold tracking-widest uppercase font-body mb-4 block" style={{ color: '#C2147A' }}>{t('Garantie')}</span>
        <h2 className="text-4xl font-headings font-bold leading-tight mb-6" style={{ color: '#f0f0f0' }}>
          {t('Vous ne validez que si vous êtes fier de votre image.')}
        </h2>
        <div className="flex flex-wrap gap-3 mt-6">
          {badges.map((b, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold font-body" style={{ background: 'rgba(194,20,122,0.08)', border: '1px solid rgba(194,20,122,0.25)', color: '#C2147A' }}>
              <Icon i={b.icon} size={14} />
              {b.label}
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="flex flex-col items-center self-stretch justify-center gap-0">
        <div className="flex-1 w-px" style={{ background: '#C2147A' }} />
        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 my-3" style={{ background: '#C2147A' }}>
          <span className="text-white text-xl font-bold">✓</span>
        </div>
        <div className="flex-1 w-px" style={{ background: '#C2147A' }} />
      </div>

      {/* Right — body text */}
      <div className="flex-1">
        <span className="text-xs font-semibold tracking-widest uppercase font-body mb-4 block" style={{ color: '#aaaaaa' }}>{t('Notre engagement')}</span>
        <p className="text-base font-body leading-relaxed mb-6" style={{ color: '#aaaaaa' }}>
          {t('On retravaille chaque livrable jusqu\'à votre « oui » franc. Pas de demi-mesure, pas de livraison bâclée — votre satisfaction est non-négociable.')}
        </p>
        <div className="rounded-xl p-5 flex items-start gap-4" style={{ background: 'rgba(249,176,0,0.06)', border: '1px solid rgba(249,176,0,0.20)' }}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(249,176,0,0.15)' }}>
            <Icon i="gift" size={16} style={{ color: '#F9B000' }} />
          </div>
          <p className="text-sm font-body leading-relaxed" style={{ color: '#c0c0c0' }}>
            {t('Le premier mois de gestion de vos réseaux vous est offert à partir de 5 mois d\'accompagnement.')}
          </p>
        </div>
      </div>
    </div>
  );
}
