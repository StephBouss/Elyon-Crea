export const displayName = 'Elyon CTA Final';
export const shortDescription = 'Section CTA finale — audit gratuit et offre Envol 360°';

import Icon from '@global/Icon';

export default function ElyonCTAFinal() {
  return (
    <div className="w-full py-28 px-24 text-center" style={{ background: 'linear-gradient(135deg, #0E0E0E 60%, #1a0a12 100%)' }}>
      {/* Overline */}
      <span className="text-xs font-semibold tracking-widest uppercase font-body mb-5 block" style={{ color: '#C2147A' }}>
        {t('CTA Final')}
      </span>

      {/* Headline */}
      <h2 className="text-5xl font-headings font-bold leading-tight mb-6" style={{ color: '#f0f0f0' }}>
        {t('Prêt à faire décoller votre marque ?')}
      </h2>

      {/* Body */}
      <p className="text-lg font-body mb-12 max-w-2xl mx-auto" style={{ color: '#9a9a9a' }}>
        {t('Commencez par un audit gratuit de votre image. En 48h, on vous montre ce qui vous fait perdre des clients — et comment le corriger.')}
      </p>

      {/* Buttons */}
      <div className="flex items-center justify-center gap-4 flex-wrap mb-6">
        <button className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold font-body" style={{ background: '#F9B000', color: '#0d0d0d' }}>
          <Icon i="zap" size={18} style={{ color: '#0d0d0d' }} />
          {t('Recevoir mon audit gratuit')}
        </button>
        <button className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold font-body" style={{ border: '1.5px solid rgba(194,20,122,0.6)', color: '#C2147A', background: 'rgba(194,20,122,0.06)' }}>
          <Icon i="rocket" size={18} style={{ color: '#C2147A' }} />
          {t('Découvrir L\'Envol 360°')}
        </button>
      </div>

      {/* Reassurance */}
      <p className="text-sm font-body" style={{ color: '#6E6E6E' }}>
        {t('Sans engagement · Réponse sous 48h')}
      </p>
    </div>
  );
}
