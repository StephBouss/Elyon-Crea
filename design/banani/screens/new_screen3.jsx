export const displayName = 'Elyon Créa — Connexion';
export const screenSize = 'desktop';

import Icon from '@global/Icon';
import Image from '@global/Image';

const DARK    = '#0E0E0E';
const DARK2   = '#141414';
const CARD    = '#1c1c1c';
const BORDER  = '#2e2e2e';
const MAGENTA = '#C2147A';
const GOLD    = '#F9B000';
const MUTED   = '#707070';
const LIGHT   = '#f2f2f2';
const ROSE    = '#e87ec0';

export default function LoginPage() {
  return (
    <div className="flex font-body" style={{ background: DARK, minHeight: '900px' }}>

      {/* ── Panneau gauche — visuel de marque ── */}
      <div className="flex flex-col justify-between relative overflow-hidden" style={{ width: '520px', minWidth: '520px', background: '#0a0a0a', borderRight: `1px solid ${BORDER}` }}>

        {/* Fond dégradé magenta bas */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'radial-gradient(ellipse at 30% 120%, rgba(194,20,122,0.22) 0%, transparent 65%)', pointerEvents: 'none' }} />

        {/* Colibri filigrane */}
        <div style={{ position: 'absolute', bottom: '-30px', right: '-40px', opacity: 0.06, fontSize: '320px', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>🐦</div>

        {/* Logo en haut */}
        <div className="px-12 pt-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0" style={{ background: MAGENTA, color: '#fff' }}>EC</div>
            <div>
              <p className="font-bold font-headings" style={{ color: LIGHT, fontSize: '16px', letterSpacing: '-0.01em' }}>Elyon Créa</p>
              <p style={{ color: MUTED, fontSize: '11px' }}>{t('Back-office')}</p>
            </div>
          </div>
        </div>

        {/* Contenu central */}
        <div className="px-12 py-12 flex flex-col gap-8">
          <div>
            <p className="font-headings font-bold leading-tight mb-4" style={{ color: LIGHT, fontSize: '32px', lineHeight: 1.2 }}>
              {t('Pilotez votre activité.')} <br />
              <span style={{ color: MAGENTA }}>{t('Sereinement.')}</span>
            </p>
            <p style={{ color: MUTED, fontSize: '14px', lineHeight: 1.7 }}>
              {t('Devis, factures, clients, comptabilité — tout votre back-office en un seul espace, conçu pour les créatifs gabonais.')}
            </p>
          </div>

          {/* 3 features */}
          <div className="flex flex-col gap-3">
            {[
              { icon: 'zap',        label: t('Génération de devis en 30 secondes') },
              { icon: 'shield',     label: t('Conformité fiscale ISL automatique') },
              { icon: 'bell',       label: t('Alertes de renouvellement de documents') },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(194,20,122,0.12)', border: `1px solid rgba(194,20,122,0.2)` }}>
                  <Icon i={f.icon} size={13} style={{ color: ROSE }} />
                </div>
                <p style={{ color: '#c0c0c0', fontSize: '13px' }}>{f.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Citation bas */}
        <div className="px-12 pb-12">
          <div className="px-5 py-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}` }}>
            <p style={{ color: '#909090', fontSize: '12px', lineHeight: 1.6, fontStyle: 'italic' }}>
              {t('"Elyon Créa a transformé la façon dont je gère mon studio. Je passe moins de temps sur la paperasse et plus sur ce qui compte."')}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: MAGENTA, color: '#fff' }}>NK</div>
              <div>
                <p style={{ color: LIGHT, fontSize: '11px', fontWeight: '600' }}>Ndong K.</p>
                <p style={{ color: MUTED, fontSize: '10px' }}>{t('Designer, Libreville')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Panneau droit — formulaire ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-16 py-12">

        <div style={{ width: '100%', maxWidth: '400px' }}>

          {/* Titre */}
          <div className="mb-10">
            <p className="font-headings font-bold mb-2" style={{ color: LIGHT, fontSize: '24px' }}>{t('Connexion')}</p>
            <p style={{ color: MUTED, fontSize: '14px' }}>{t('Entrez vos identifiants pour accéder à votre espace.')}</p>
          </div>

          {/* Champs */}
          <div className="flex flex-col gap-5 mb-6">
            {/* Email */}
            <div>
              <p style={{ color: '#909090', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '7px' }}>{t('Adresse e-mail')}</p>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: '#181818', border: `1px solid #3a3a3a`, color: '#505050', fontSize: '14px' }}>
                <Icon i="mail" size={15} style={{ color: '#484848', flexShrink: 0 }} />
                contact@elyoncrea.com
              </div>
            </div>
            {/* Mot de passe */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <p style={{ color: '#909090', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{t('Mot de passe')}</p>
                <a style={{ color: ROSE, fontSize: '12px' }}>{t('Mot de passe oublié ?')}</a>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: '#181818', border: `1px solid ${MAGENTA}66`, color: '#505050', fontSize: '14px' }}>
                <Icon i="lock" size={15} style={{ color: '#484848', flexShrink: 0 }} />
                <span className="flex-1">••••••••••••</span>
                <Icon i="eye-off" size={14} style={{ color: '#484848' }} />
              </div>
            </div>
          </div>

          {/* Se souvenir */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(194,20,122,0.18)', border: `1.5px solid ${MAGENTA}` }}>
              <Icon i="check" size={10} style={{ color: MAGENTA }} />
            </div>
            <p style={{ color: MUTED, fontSize: '13px' }}>{t('Rester connecté')}</p>
          </div>

          {/* Bouton connexion */}
          <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm mb-5" style={{ background: GOLD, color: '#0E0E0E' }}>
            <Icon i="log-in" size={15} />
            {t('Se connecter')}
          </button>

          {/* Séparateur */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1" style={{ height: '1px', background: BORDER }} />
            <p style={{ color: '#484848', fontSize: '11px' }}>{t('ou')}</p>
            <div className="flex-1" style={{ height: '1px', background: BORDER }} />
          </div>

          {/* Social login */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm" style={{ background: 'transparent', border: `1px solid ${BORDER}`, color: MUTED }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {t('Google')}
            </button>
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm" style={{ background: 'transparent', border: `1px solid ${BORDER}`, color: MUTED }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.4 24v-11h-3.1v-3.9h3.1v-2.3c0-3.1 1.9-4.8 4.6-4.8 1.3 0 2.4.1 2.7.1v3.1h-1.9c-1.4 0-1.7.7-1.7 1.7v2.2h3.4l-.4 3.9h-3v11h-3.7z" fill="#0A66C2"/>
              </svg>
              {t('Microsoft')}
            </button>
          </div>

          {/* Accès démo */}
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm" style={{ background: 'transparent', border: `1px solid ${BORDER}`, color: MUTED }}>
            <Icon i="play-circle" size={15} style={{ color: ROSE }} />
            {t('Accéder à la démo')}
          </button>

          {/* Lien inscription */}
          <p className="text-center mt-8" style={{ color: MUTED, fontSize: '13px' }}>
            {t('Pas encore client ?')}{' '}
            <a style={{ color: ROSE, fontWeight: '600' }}>{t('Découvrir Elyon Créa')}</a>
          </p>

        </div>

        {/* Footer minimaliste */}
        <div className="flex items-center gap-4 mt-12" style={{ color: '#484848', fontSize: '11px' }}>
          <span>© 2026 Elyon Créa</span>
          <span>·</span>
          <a style={{ color: '#484848' }}>{t('Confidentialité')}</a>
          <span>·</span>
          <a style={{ color: '#484848' }}>{t('Conditions')}</a>
        </div>
      </div>

    </div>
  );
}
