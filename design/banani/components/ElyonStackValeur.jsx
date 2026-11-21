export const displayName = 'Elyon Stack de Valeur';
export const shortDescription = 'Section stack de valeur — tout ce que contient L\'Envol 360°';

import Icon from '@global/Icon';

const items = [
  { label: t('Logo relooké + charte graphique complète'), value: t('200 000 FCFA') },
  { label: t('Site vitrine / landing page mobile-first'), value: t('350 000 FCFA') },
  { label: t('5 templates réseaux + calendrier 1 mois'), value: t('150 000 FCFA') },
  { label: t('Kit papeterie (carte, flyer, en-tête, signature mail)'), value: t('120 000 FCFA') },
  { label: t('Pack goodies personnalisés'), value: t('80 000 FCFA') },
  { label: t('1 support grand format prêt à imprimer'), value: t('90 000 FCFA') },
];

export default function ElyonStackValeur() {
  return (
    <div className="w-full bg-dark py-24 px-24">
      {/* Header */}
      <div className="mb-14">
        <span className="text-xs font-semibold tracking-widest uppercase font-body mb-3 block" style={{ color: '#F9B000' }}>
          {t('Stack de valeur')}
        </span>
        <h2 className="text-4xl font-headings font-bold leading-tight mb-4" style={{ color: '#f0f0f0' }}>
          {t('Voici tout ce que contient L\'Envol 360°.')}
        </h2>
        <p className="text-base font-body max-w-2xl" style={{ color: '#7a7a7a' }}>
          {t('Chaque élément résout un problème concret. Pris séparément, cet ensemble vaut près de 990 000 FCFA.')}
        </p>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-16 items-start">
        {/* Items list */}
        <div className="flex-1 flex flex-col gap-0">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-4"
              style={{ borderBottom: '1px solid #1e1e1e' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(249,176,0,0.15)' }}>
                  <Icon i="check" size={11} style={{ color: '#F9B000' }} />
                </div>
                <span className="text-sm font-body" style={{ color: '#c0c0c0' }}>{item.label}</span>
              </div>
              <span className="text-sm font-semibold font-body ml-8 flex-shrink-0" style={{ color: '#F9B000' }}>{item.value}</span>
            </div>
          ))}
        </div>

        {/* Price card */}
        <div
          className="flex-shrink-0 w-80 rounded-2xl p-8 flex flex-col items-center text-center"
          style={{ background: 'linear-gradient(145deg, #1a1200 0%, #1f1800 100%)', border: '1px solid #F9B00060' }}
        >
          <span className="text-xs font-semibold tracking-widest uppercase font-body mb-6 block" style={{ color: '#F9B000' }}>
            {t('L\'Envol 360°')}
          </span>
          <p className="text-sm font-body mb-2" style={{ color: '#aaaaaa' }}>{t('Valeur totale')}</p>
          <p className="text-2xl font-headings font-bold mb-4 line-through" style={{ color: '#555555' }}>
            {t('~990 000 FCFA')}
          </p>
          <div className="w-full h-px mb-4" style={{ background: '#2a2000' }} />
          <p className="text-sm font-body mb-2" style={{ color: '#aaaaaa' }}>{t('Votre prix')}</p>
          <p className="text-4xl font-headings font-bold mb-1" style={{ color: '#f0f0f0' }}>
            {t('500 000')}
          </p>
          <p className="text-base font-body mb-8" style={{ color: '#F9B000' }}>{t('FCFA')}</p>
          <button
            className="w-full py-3 rounded-xl text-sm font-semibold font-body"
            style={{ background: '#F9B000', color: '#0d0d0d' }}
          >
            {t('Je veux L\'Envol 360°')}
          </button>
          {/* Places restantes */}
          <div className="mt-5 flex flex-col items-center gap-2">
            <p className="text-xs font-semibold font-body tracking-widest uppercase" style={{ color: '#F9B000' }}>
              {t('⚠ Places limitées ce mois-ci')}
            </p>
            <div className="flex gap-2 mt-1">
              {/* 1 place prise, 4 restantes */}
              <div className="w-4 h-4 rounded-full" style={{ background: 'transparent', border: '1.5px solid #F9B000' }} />
              <div className="w-4 h-4 rounded-full" style={{ background: '#F9B000' }} />
              <div className="w-4 h-4 rounded-full" style={{ background: '#F9B000' }} />
              <div className="w-4 h-4 rounded-full" style={{ background: '#F9B000' }} />
              <div className="w-4 h-4 rounded-full" style={{ background: '#F9B000' }} />
            </div>
            <p className="text-xs font-body" style={{ color: '#F9B000' }}>{t('4 places disponibles sur 5')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
