export const displayName = 'Elyon Footer';
export const shortDescription = 'Footer redesign — logo, social, quick links, legal';

import Icon from '@global/Icon';

export default function ElyonFooter() {
  return (
    <div className="w-full bg-dark px-24 pt-20 pb-8" style={{ borderTop: '1px solid #1e1e1e' }}>

      {/* Top row */}
      <div className="flex items-start justify-between gap-16 mb-16">

        {/* Brand block */}
        <div className="max-w-xs">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/banani-prod.appspot.com/o/reference-images%2Fe1b20d7b-1888-489e-8690-4cf5f67247d8?alt=media&token=d175f110-6643-4e8c-b323-42ba1f471660"
            alt="Elyon Créa"
            className="h-10 w-auto mb-4"
          />
          <p className="text-sm font-body leading-relaxed mb-8" style={{ color: '#6E6E6E' }}>
            {t('Communication visuelle & digitale')}
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#1877F2' }}>
              <Icon i="facebook" size={16} style={{ color: '#fff' }} />
            </a>
            <a className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#0A66C2' }}>
              <Icon i="linkedin" size={16} style={{ color: '#fff' }} />
            </a>
            <a className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#1e1e1e', border: '1px solid #2e2e2e' }}>
              <Icon i="music-2" size={16} style={{ color: '#f0f0f0' }} />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-xs font-semibold tracking-widest uppercase font-body mb-6" style={{ color: '#C2147A' }}>{t('Navigation')}</h4>
          <ul className="flex flex-col gap-4">
            {[t('Services'), t('Offre'), t('Réalisations'), t('Contact')].map(link => (
              <li key={link}>
                <a className="text-sm font-body" style={{ color: '#9a9a9a' }}>{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-semibold tracking-widest uppercase font-body mb-6" style={{ color: '#C2147A' }}>{t('Contact')}</h4>
          <ul className="flex flex-col gap-4">
            <li>
              <a className="flex items-center gap-3 text-sm font-body" style={{ color: '#9a9a9a' }}>
                <Icon i="map-pin" size={14} style={{ color: '#F9B000' }} />
                {t('Libreville · Gabon')}
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 text-sm font-body" style={{ color: '#9a9a9a' }}>
                <Icon i="phone" size={14} style={{ color: '#F9B000' }} />
                {t('+241 077 000 000')}
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 text-sm font-body" style={{ color: '#9a9a9a' }}>
                <Icon i="mail" size={14} style={{ color: '#F9B000' }} />
                {t('hello@elyoncrea.com')}
              </a>
            </li>
          </ul>
        </div>

        {/* WhatsApp CTA */}
        <div className="flex flex-col items-start">
          <h4 className="text-xs font-semibold tracking-widest uppercase font-body mb-6" style={{ color: '#C2147A' }}>{t('WhatsApp')}</h4>
          <a className="flex items-center gap-3 px-6 py-4 rounded-xl font-semibold text-sm font-body" style={{ background: '#25D366', color: '#fff' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.2)' }}>
              <Icon i="message-circle" size={18} style={{ color: '#fff' }} />
            </div>
            {t('Écrire sur WhatsApp')}
          </a>
          <p className="text-xs font-body mt-3" style={{ color: '#6E6E6E' }}>
            {t('Réponse rapide garantie')}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: '#1e1e1e' }} className="mb-6" />

      {/* Bottom bar */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-body" style={{ color: '#4a4a4a' }}>
          {t('© 2025 Elyon Créa · Libreville · Gabon. Tous droits réservés.')}
        </p>
        <a className="text-xs font-body" style={{ color: '#4a4a4a' }}>
          {t('Mentions légales')}
        </a>
      </div>
    </div>
  );
}
