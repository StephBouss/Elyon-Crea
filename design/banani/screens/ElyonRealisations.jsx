export const displayName = 'Elyon Créa — Réalisations';
export const screenSize = 'desktop';

import ElyonHeader from '@components/ElyonHeader';
import ElyonFooter from '@components/ElyonFooter';
import ElyonRealisationsPage from '@components/ElyonRealisationsPage';
import Icon from '@global/Icon';

export default function RealisationsScreen() {
  return (
    <div className="font-body" style={{ background: '#0E0E0E' }}>
      <ElyonHeader />

      {/* Hero header */}
      <div className="relative w-full overflow-hidden py-20 px-24" style={{ background: 'linear-gradient(135deg, #0E0E0E 60%, #1a0a12 100%)' }}>
        <div className="absolute inset-0 flex items-center justify-end pr-24 pointer-events-none select-none">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/banani-prod.appspot.com/o/reference-images%2Fe1b20d7b-1888-489e-8690-4cf5f67247d8?alt=media&token=d175f110-6643-4e8c-b323-42ba1f471660"
            alt=""
            style={{ width: '480px', opacity: 0.07, filter: 'brightness(1.4)' }}
          />
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(14,14,14,0.98) 50%, rgba(14,14,14,0.3) 100%)' }} />
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <a className="font-body text-sm" style={{ color: '#9a9a9a' }}>{t('Accueil')}</a>
            <Icon i="chevron-right" size={14} style={{ color: '#6E6E6E' }} />
            <span className="font-body text-sm" style={{ color: '#F9B000' }}>{t('Réalisations')}</span>
          </div>
          <span className="text-xs font-semibold tracking-widest uppercase font-body mb-4 block" style={{ color: '#C2147A' }}>{t('Notre portfolio')}</span>
          <h1 className="text-5xl font-headings font-bold text-white leading-tight mb-4">{t('Des projets qui font la différence')}</h1>
          <p className="font-body text-lg max-w-xl" style={{ color: '#9a9a9a' }}>{t('Découvrez une sélection de réalisations livrées pour des marques gabonaises et panafricaines — du branding à la vidéo, en passant par le digital.')}</p>
        </div>
      </div>

      {/* Main content */}
      <ElyonRealisationsPage />

      <ElyonFooter />
    </div>
  );
}
