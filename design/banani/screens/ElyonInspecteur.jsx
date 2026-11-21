export const displayName = 'Elyon Créa — Mode Inspecteur';
export const shortDescription = 'Back-office SaaS — audit IA de la santé financière et des anomalies du CRM';

import Icon from '@global/Icon';

const DARK    = '#0E0E0E';
const DARK2   = '#141414';
const CARD    = '#1c1c1c';
const BORDER  = '#2e2e2e';
const MAGENTA = '#C2147A';
const GOLD    = '#F9B000';
const MUTED   = '#b0b0b0';
const LIGHT   = '#f2f2f2';

const navSections = [
  {
    label: t('VUE D\'ENSEMBLE'),
    items: [{ icon: 'layout-dashboard', label: t('Tableau de bord') }],
  },
  {
    label: t('INTELLIGENT'),
    items: [
      { icon: 'sparkles', label: t('Assistant IA'),    badge: t('NOUVEAU') },
      { icon: 'shield',   label: t('Mode Inspecteur'), badge: t('NOUVEAU'), active: true },
    ],
  },
  {
    label: t('COMMERCIAL'),
    items: [
      { icon: 'file-text',   label: t('Devis') },
      { icon: 'receipt',     label: t('Factures') },
      { icon: 'truck',       label: t('Bons de livraison') },
      { icon: 'file-minus',  label: t('Avoirs') },
      { icon: 'credit-card', label: t('Paiements') },
    ],
  },
  {
    label: t('GESTION'),
    items: [
      { icon: 'users',         label: t('Clients') },
      { icon: 'package',       label: t('Produits & Services') },
      { icon: 'folder-kanban', label: t('Projets') },
    ],
  },
  {
    label: t('FINANCE'),
    items: [
      { icon: 'bar-chart-2', label: t('Comptabilité') },
      { icon: 'trending-up', label: t('Rapports') },
    ],
  },
  {
    label: t('CONFIGURATION'),
    items: [{ icon: 'settings', label: t('Paramètres') }],
  },
];

// ── Couleurs et constantes ──
const ROSE   = '#e87ec0';
const GREEN  = '#22c55e';
const RED    = '#ef4444';
const ORANGE = '#f59e0b';

// ── Sections Paramètres ──
const settingsSections = [
  { id: 'entreprise',   icon: 'building-2',    label: t('Entreprise'),                active: true },
  { id: 'facturation',  icon: 'receipt',       label: t('Facturation') },
  { id: 'documents',    icon: 'file-shield',   label: t('Documents administratifs'), badge: '2' },
  { id: 'langue',       icon: 'globe',         label: t('Langue & région') },
  { id: 'utilisateurs', icon: 'users',         label: t('Utilisateurs & rôles') },
  { id: 'notifs',       icon: 'bell',          label: t('Notifications') },
  { id: 'securite',     icon: 'lock',          label: t('Sécurité') },
  { id: 'donnees',      icon: 'database',      label: t('Données & sauvegarde') },
];

// ── Helpers ──
function Field({ label, value, info, half }) {
  return (
    <div style={{ flex: half ? '1 1 calc(50% - 8px)' : '1 1 100%' }}>
      <p style={{ color: MUTED, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '5px' }}>{label}</p>
      <div className="flex items-center gap-2">
        <div className="flex-1 px-3 py-2.5 rounded-lg" style={{ background: '#181818', border: `1px solid ${BORDER}`, color: LIGHT, fontSize: '13px' }}>{value}</div>
        {info && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-md" style={{ background: '#1a1a10', border: `1px solid #f59e0b33`, color: ORANGE, fontSize: '10px', whiteSpace: 'nowrap' }}>
            <Icon i="info" size={10} />
            {info}
          </div>
        )}
      </div>
    </div>
  );
}

function SectionTitle({ label, sub }) {
  return (
    <div className="mb-6">
      <p className="font-bold font-headings" style={{ color: LIGHT, fontSize: '18px' }}>{label}</p>
      {sub && <p style={{ color: MUTED, fontSize: '13px', marginTop: '2px' }}>{sub}</p>}
    </div>
  );
}

function Toggle({ on }) {
  return (
    <div className="flex items-center flex-shrink-0" style={{ width: '38px', height: '22px', background: on ? MAGENTA : '#2e2e2e', borderRadius: '11px', padding: '2px', justifyContent: on ? 'flex-end' : 'flex-start' }}>
      <div style={{ width: '18px', height: '18px', borderRadius: '9px', background: '#fff' }} />
    </div>
  );
}

function SaveBtn() {
  return (
    <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold mt-4" style={{ background: MAGENTA, color: '#fff' }}>
      <Icon i="save" size={14} />
      {t('Enregistrer')}
    </button>
  );
}

// ── Données Documents Administratifs ──
const docs = [
  { type: t('Registre du commerce (RCCM)'),               file: 'rccm-elyon.pdf',       added: '12/01/2026', validite: t('Permanent'),   status: 'ok',      rappel: '—' },
  { type: t('Attestation NIF'),                            file: 'nif-elyon.pdf',        added: '12/01/2026', validite: t('Permanent'),   status: 'ok',      rappel: '—' },
  { type: t('Statuts de la société'),                      file: 'statuts.pdf',          added: '12/01/2026', validite: t('Permanent'),   status: 'ok',      rappel: '—' },
  { type: t('Attestation de régime ISL'),                  file: 'attestation-isl.pdf',  added: '15/01/2026', validite: '31/12/2026',    status: 'ok',      rappel: t('30 j avant') },
  { type: t('Patente / Autorisation d\'exercer'),          file: 'patente-2026.pdf',     added: '15/01/2026', validite: '31/12/2026',    status: 'ok',      rappel: t('30 j avant') },
  { type: t('Attestation CNSS'),                           file: 'cnss.pdf',             added: '20/02/2026', validite: '30/06/2026',    status: 'soon',    rappel: t('30 j avant') },
  { type: t('Attestation de non-redevance fiscale'),       file: 'non-redevance.pdf',    added: '05/03/2026', validite: '05/06/2026',    status: 'expired', rappel: t('15 j avant') },
];

const statusMap = {
  ok:      { label: t('À jour'),          color: GREEN,  bg: '#22c55e18' },
  soon:    { label: t('Expire bientôt'),  color: ORANGE, bg: '#f59e0b18' },
  expired: { label: t('Expiré'),          color: RED,    bg: '#ef444418' },
};

export default function ElyonInspecteur() {
  return (
    <div className="flex font-body" style={{ background: DARK, minHeight: '1200px' }}>

      {/* ── Sidebar ── */}
      <div className="flex flex-col" style={{ width: '220px', minWidth: '220px', background: DARK2, borderRight: `1px solid ${BORDER}`, minHeight: '1200px' }}>
        <div className="flex items-center gap-3 px-5 py-7" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm" style={{ background: MAGENTA, color: '#fff' }}>EC</div>
          <div>
            <p className="text-sm font-bold" style={{ color: LIGHT }}>Elyon Créa</p>
            <p style={{ color: '#555', fontSize: '11px' }}>{t('Back-office')}</p>
          </div>
        </div>
        <div className="flex flex-col gap-5 px-3 py-5 flex-1">
          {navSections.map((section, si) => (
            <div key={si}>
              <p className="text-xs font-semibold tracking-widest mb-2 px-2" style={{ color: '#3a3a3a' }}>{section.label}</p>
              {section.items.map((item, ii) => (
                <a key={ii} className="flex items-center justify-between px-3 py-2 rounded-md mb-1 text-sm"
                  style={{
                    background: item.active ? 'rgba(194,20,122,0.18)' : 'transparent',
                    color:      item.active ? ROSE : MUTED,
                    fontWeight: item.active ? '600' : '400',
                  }}>
                  <span className="flex items-center gap-3">
                    <Icon i={item.icon} size={15} />
                    {item.label}
                  </span>
                  {item.badge && (
                    <span style={{ background: 'rgba(194,20,122,0.25)', color: ROSE, fontSize: '9px', fontWeight: '700', padding: '2px 5px', borderRadius: '4px' }}>{item.badge}</span>
                  )}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="px-3 pb-2">
          <a className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm w-full mb-2" style={{ background: '#1a1a1a', border: `1px solid ${BORDER}`, color: MUTED }}>
            <Icon i="globe" size={13} style={{ color: GOLD }} />
            {t('Retour au site web')}
          </a>
        </div>
        <div className="px-4 py-4 flex items-center gap-3" style={{ borderTop: `1px solid ${BORDER}` }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: MAGENTA, color: '#fff' }}>DG</div>
          <div>
            <p className="text-xs font-semibold" style={{ color: LIGHT }}>{t('Directeur Général')}</p>
            <p style={{ color: '#555', fontSize: '11px' }}>Elyon Créa</p>
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <div className="flex items-center justify-between px-10 py-5" style={{ background: DARK2, borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(194,20,122,0.15)', border: `1px solid rgba(194,20,122,0.3)` }}>
              <Icon i="settings" size={17} style={{ color: ROSE }} />
            </div>
            <div>
              <h1 className="text-xl font-bold font-headings" style={{ color: LIGHT }}>{t('Paramètres')}</h1>
              <p style={{ color: MUTED, fontSize: '12px', marginTop: '2px' }}>{t('Configuration de votre espace Elyon Créa')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#1a1a1a', border: `1px solid ${BORDER}` }}>
              <Icon i="bell" size={15} style={{ color: MUTED }} />
            </a>
          </div>
        </div>

        {/* ── Contenu Paramètres ── */}
        <div className="flex flex-col flex-1">

          {/* Barre d'onglets horizontale */}
          <div className="flex items-center px-10 gap-0" style={{ background: DARK2, borderBottom: `1px solid ${BORDER}` }}>
            {settingsSections.map((s, i) => (
              <button key={i} className="flex items-center gap-2 px-4 py-4 text-sm font-medium relative" style={{
                color: s.active ? ROSE : MUTED,
                fontWeight: s.active ? '600' : '400',
                borderBottom: s.active ? `2px solid ${MAGENTA}` : '2px solid transparent',
                marginBottom: '-1px',
                whiteSpace: 'nowrap',
              }}>
                {s.label}
                {s.badge && (
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded-full" style={{ background: '#f59e0b22', color: ORANGE }}>{s.badge}</span>
                )}
              </button>
            ))}
          </div>

          {/* Zone de contenu — Section Entreprise uniquement */}
          <div className="flex-1 px-10 py-8 flex flex-col gap-8 overflow-y-auto" style={{ background: DARK }}>

            {/* ══ SECTION 1 : ENTREPRISE ══ */}
            <SectionTitle label={t('Entreprise')} sub={t('Identité légale et coordonnées de votre structure')} />

            {/* Logo */}
            <div className="flex items-center gap-5 p-5 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(194,20,122,0.1)', border: `1px solid rgba(194,20,122,0.25)` }}>
                <span style={{ fontSize: '40px' }}>🐦</span>
              </div>
              <div>
                <p className="font-semibold" style={{ color: LIGHT, fontSize: '13px' }}>{t('Logo de l\'entreprise')}</p>
                <p style={{ color: MUTED, fontSize: '12px', marginTop: '2px' }}>{t('Format PNG ou SVG recommandé — min. 200×200 px')}</p>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold mt-3" style={{ background: '#2a2a2a', border: `1px solid ${BORDER}`, color: LIGHT }}>
                  <Icon i="upload" size={12} />
                  {t('Changer le logo')}
                </button>
              </div>
            </div>

            {/* Identité légale */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: MUTED }}>{t('Identité légale')}</p>
              <div className="flex flex-wrap gap-4">
                <Field label={t('Nom commercial')}   value={t('Elyon Crea')}                  half />
                <Field label={t('Forme juridique')}  value={t('Entreprise individuelle')} half />
                <Field label={t('NIF')}              value="GA-2023-04871"                half />
                <Field label={t('RCCM')}             value="LBV-2023-B-1042"              half />
              </div>
            </div>

            {/* Régime fiscal & Secteur */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: MUTED }}>{t('Régime fiscal & secteur')}</p>
              <div className="flex flex-wrap gap-4">
                <div style={{ flex: '1 1 calc(50% - 8px)' }}>
                  <p style={{ color: MUTED, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '5px' }}>{t('Régime fiscal')}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 flex items-center justify-between px-3 py-2.5 rounded-lg" style={{ background: '#181818', border: `1px solid ${BORDER}`, color: LIGHT, fontSize: '13px' }}>
                      {t('Impôt Synthétique Libératoire (ISL)')}
                      <Icon i="chevron-down" size={14} style={{ color: MUTED }} />
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-md flex-shrink-0" style={{ background: '#1a1a10', border: `1px solid #f59e0b33`, color: ORANGE, fontSize: '10px', whiteSpace: 'nowrap' }}>
                      <Icon i="info" size={10} />
                      {t('Non assujetti à la TVA')}
                    </div>
                  </div>
                </div>
                <Field label={t('Secteur d\'activité')} value={t('Communication & publicité')} half />
              </div>
            </div>

            {/* Coordonnées */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: MUTED }}>{t('Coordonnées')}</p>
              <div className="flex flex-wrap gap-4">
                <Field label={t('Adresse')}   value={t('Libreville, Estuaire, Gabon')}    half />
                <Field label={t('Téléphone')} value="+241 77 000 000"                      half />
                <Field label={t('Email')}     value="contact@elyoncrea.com"               half />
                <Field label={t('Site web')}  value="www.elyoncrea.com"                   half />
              </div>
            </div>

            <SaveBtn />

          </div>

        </div>

      </div>
    </div>
  );
}
