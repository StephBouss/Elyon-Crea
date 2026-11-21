export const displayName = 'Elyon Créa — Dashboard (Aéré)';
export const shortDescription = 'Back-office SaaS — version simplifiée et aérée';

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
    items: [{ icon: 'layout-dashboard', label: t('Tableau de bord'), active: true }],
  },
  {
    label: t('INTELLIGENT'),
    items: [
      { icon: 'sparkles', label: t('Assistant IA'),     badge: t('NOUVEAU') },
      { icon: 'shield',   label: t('Mode Inspecteur'),  badge: t('NOUVEAU') },
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
      { icon: 'users',          label: t('Clients') },
      { icon: 'package',        label: t('Produits & Services') },
      { icon: 'folder-kanban',  label: t('Projets') },
    ],
  },
  {
    label: t('FINANCE'),
    items: [
      { icon: 'bar-chart-2',  label: t('Comptabilité') },
      { icon: 'trending-up',  label: t('Rapports') },
    ],
  },
  {
    label: t('CONFIGURATION'),
    items: [
      { icon: 'settings', label: t('Paramètres') },
    ],
  },
];

const kpis = [
  { icon: 'trending-up', label: t('CA facturé'),           value: '4 850 000', unit: 'FCFA', accent: MAGENTA },
  { icon: 'wallet',      label: t('Trésorerie encaissée'), value: '3 200 000', unit: 'FCFA', accent: '#22c55e' },
  { icon: 'clock',       label: t('Créances en attente'),  value: '1 650 000', unit: 'FCFA', accent: GOLD },
  { icon: 'landmark',    label: t('Taxes reversées'),      value: '412 000',   unit: 'FCFA', accent: '#a78bfa' },
];

const invoices = [
  { ref: 'FAC-2025-042', client: 'Réseau SOGARA',     amount: '590 000 FCFA',   date: '12 mai 2025',  status: t('Payée'),      color: '#22c55e' },
  { ref: 'FAC-2025-041', client: 'Gabon Telecom',     amount: '1 200 000 FCFA', date: '08 mai 2025',  status: t('En attente'), color: GOLD },
  { ref: 'FAC-2025-040', client: 'SEEG Gabon',        amount: '380 000 FCFA',   date: '02 mai 2025',  status: t('Payée'),      color: '#22c55e' },
  { ref: 'FAC-2025-039', client: 'Ministère Culture', amount: '750 000 FCFA',   date: '28 avr. 2025', status: t('En retard'),  color: '#ef4444' },
];

const barH = [30, 48, 42, 68, 58, 78, 52, 95, 72, 62, 82, 76];
const barM = ['J','F','M','A','M','J','J','A','S','O','N','D'];

export default function ElyonDashboardAere() {
  return (
    <div className="flex font-body" style={{ background: DARK, minHeight: '960px' }}>

      {/* ── Sidebar ── */}
      <div className="flex flex-col" style={{ width: '220px', minWidth: '220px', background: DARK2, borderRight: `1px solid ${BORDER}`, minHeight: '960px' }}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-7" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm" style={{ background: MAGENTA, color: '#fff' }}>EC</div>
          <div>
            <p className="text-sm font-bold" style={{ color: LIGHT }}>Elyon Créa</p>
            <p style={{ color: '#555', fontSize: '11px' }}>{t('Back-office')}</p>
          </div>
        </div>

        {/* Nav */}
        <div className="flex flex-col gap-5 px-3 py-5 flex-1">
          {navSections.map((section, si) => (
            <div key={si}>
              <p className="text-xs font-semibold tracking-widest mb-2 px-2" style={{ color: '#3a3a3a' }}>{section.label}</p>
              {section.items.map((item, ii) => (
                <a key={ii} className="flex items-center justify-between px-3 py-2 rounded-md mb-1 text-sm"
                  style={{
                    background: item.active ? 'rgba(194,20,122,0.18)' : 'transparent',
                    color:      item.active ? '#e87ec0' : MUTED,
                    fontWeight: item.active ? '600' : '400',
                  }}>
                  <span className="flex items-center gap-3">
                    <Icon i={item.icon} size={15} />
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="font-bold" style={{ background: 'rgba(194,20,122,0.25)', color: '#e87ec0', fontSize: '9px', padding: '2px 5px', borderRadius: '4px' }}>{item.badge}</span>
                  )}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Return + user */}
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
          <div>
            <h1 className="text-xl font-bold font-headings" style={{ color: LIGHT }}>{t('Tableau de bord')}</h1>
            <p style={{ color: MUTED, fontSize: '12px', marginTop: '2px' }}>{t('Jeudi 15 mai 2025 · Vue d\'ensemble')}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm" style={{ background: '#1a1a1a', border: `1px solid ${BORDER}`, color: MUTED, width: '240px' }}>
              <Icon i="search" size={13} />
              {t('Rechercher…')}
            </div>
            <a className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#1a1a1a', border: `1px solid ${BORDER}` }}>
              <Icon i="bell" size={15} style={{ color: MUTED }} />
            </a>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold" style={{ background: MAGENTA, color: '#fff' }}>
              <Icon i="plus" size={14} />
              {t('Nouvelle facture')}
            </button>
          </div>
        </div>

        {/* Page content */}
        <div className="px-10 py-10 flex flex-col gap-10">

          {/* Hero banner */}
          <div className="rounded-2xl px-10 py-8 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #1a0a12 0%, #0e0e0e 100%)', border: `1px solid ${BORDER}` }}>
            <div>
              <p style={{ color: MUTED, fontSize: '13px', marginBottom: '8px' }}>{t('Jeudi 15 mai 2025 · 09:42')}</p>
              <h2 className="font-bold font-headings" style={{ color: LIGHT, fontSize: '28px', marginBottom: '8px' }}>{t('Bonjour')} 👋</h2>
              <p style={{ color: MUTED, fontSize: '13px', maxWidth: '420px' }}>{t('Pilotez votre activité — revenus, factures et obligations fiscales en un seul endroit.')}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold" style={{ background: 'rgba(255,255,255,0.06)', color: LIGHT, border: `1px solid ${BORDER}` }}>
                <Icon i="file-text" size={15} />
                {t('Nouveau devis')}
              </button>
              <button className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold" style={{ background: MAGENTA, color: '#fff' }}>
                <Icon i="plus" size={15} />
                {t('Nouvelle facture')}
              </button>
            </div>
          </div>

          {/* KPI row */}
          <div className="grid grid-cols-4 gap-5">
            {kpis.map((k, i) => (
              <div key={i} className="rounded-2xl p-6" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: k.accent + '1a' }}>
                  <Icon i={k.icon} size={20} style={{ color: k.accent }} />
                </div>
                <p style={{ color: MUTED, fontSize: '12px', marginBottom: '6px' }}>{k.label}</p>
                <p className="font-bold font-headings" style={{ color: LIGHT, fontSize: '22px', lineHeight: 1.1 }}>{k.value}</p>
                <p style={{ color: '#484848', fontSize: '11px', marginTop: '2px' }}>{k.unit}</p>
              </div>
            ))}
          </div>

          {/* Chart row */}
          <div className="grid grid-cols-3 gap-5">

            {/* Bar chart — wider */}
            <div className="col-span-2 rounded-2xl p-7" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="text-sm font-bold font-headings" style={{ color: LIGHT }}>{t('Revenus mensuels')}</p>
                  <p style={{ color: MUTED, fontSize: '12px', marginTop: '3px' }}>{t('12 mois · 2025')}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5"><div style={{ width: 10, height: 10, borderRadius: 3, background: MAGENTA }} /><span style={{ color: MUTED, fontSize: '11px' }}>{t('Ce mois')}</span></div>
                  <div className="flex items-center gap-1.5"><div style={{ width: 10, height: 10, borderRadius: 3, background: GOLD }} /><span style={{ color: MUTED, fontSize: '11px' }}>{t('Record')}</span></div>
                </div>
              </div>
              <div className="flex items-end gap-3" style={{ height: '140px' }}>
                {barH.map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full rounded-md" style={{
                      height: `${h}%`,
                      background: i === 11 ? MAGENTA : i === 7 ? GOLD : '#262626',
                    }} />
                    <span style={{ color: '#484848', fontSize: '10px' }}>{barM[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Donut */}
            <div className="rounded-2xl p-7" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <p className="text-sm font-bold font-headings mb-1" style={{ color: LIGHT }}>{t('État des factures')}</p>
              <p style={{ color: MUTED, fontSize: '12px', marginBottom: '28px' }}>{t('Mai 2025')}</p>
              <div className="flex flex-col items-center gap-6">
                <div className="relative" style={{ width: '110px', height: '110px' }}>
                  <svg viewBox="0 0 36 36" style={{ width: '110px', height: '110px', transform: 'rotate(-90deg)' }}>
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#252525" strokeWidth="3.5" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke={MAGENTA} strokeWidth="3.5" strokeDasharray="55 45" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke={GOLD} strokeWidth="3.5" strokeDasharray="25 75" strokeDashoffset="-55" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#ef4444" strokeWidth="3.5" strokeDasharray="20 80" strokeDashoffset="-80" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-bold" style={{ color: LIGHT, fontSize: '18px' }}>78%</span>
                    <span style={{ color: MUTED, fontSize: '9px' }}>{t('encaissé')}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 w-full">
                  {[
                    { color: MAGENTA,   label: t('Payées'),     value: '3 200 000 FCFA' },
                    { color: GOLD,      label: t('En attente'), value: '1 050 000 FCFA' },
                    { color: '#ef4444', label: t('En retard'),  value: '600 000 FCFA' },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: r.color }} />
                        <span style={{ color: MUTED, fontSize: '12px' }}>{r.label}</span>
                      </div>
                      <span style={{ color: LIGHT, fontSize: '12px', fontWeight: '600' }}>{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Score Santé + Assistant IA + Mode Inspecteur */}
          <div className="grid grid-cols-3 gap-5">

            {/* Score Santé Financière */}
            <div className="rounded-2xl p-7" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.12)' }}>
                  <Icon i="shield-check" size={16} style={{ color: '#22c55e' }} />
                </div>
                <div>
                  <p className="text-sm font-bold font-headings" style={{ color: LIGHT }}>{t('Score de Santé Financière')}</p>
                  <p style={{ color: MUTED, fontSize: '11px' }}>{t('Évaluation automatique de votre activité')}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 mb-5">
                {/* Circle */}
                <div className="relative flex-shrink-0" style={{ width: '90px', height: '90px' }}>
                  <svg viewBox="0 0 36 36" style={{ width: '90px', height: '90px', transform: 'rotate(-90deg)' }}>
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#252525" strokeWidth="3" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray="95 5" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-bold font-headings" style={{ color: '#22c55e', fontSize: '20px', lineHeight: 1 }}>95</span>
                    <span style={{ color: MUTED, fontSize: '9px' }}>/100</span>
                  </div>
                </div>
                <div>
                  <span className="text-sm font-bold" style={{ color: '#22c55e' }}>{t('Excellent')}</span>
                  <p style={{ color: MUTED, fontSize: '12px', marginTop: '4px', maxWidth: '140px' }}>{t('Votre activité est bien gérée et vos finances sont saines.')}</p>
                </div>
              </div>
              <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: '14px' }}>
                <p style={{ color: '#4a4a4a', fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>{t('POINTS POSITIFS')}</p>
                {[t('Profil entreprise complet'), t('Paramètres fiscaux configurés'), t('Base clients bien renseignée')].map((pt, i) => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <Icon i="check-circle" size={13} style={{ color: '#22c55e' }} />
                    <span style={{ color: MUTED, fontSize: '12px' }}>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Assistant IA */}
            <div className="rounded-2xl p-7 flex flex-col" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(194,20,122,0.15)' }}>
                    <Icon i="sparkles" size={16} style={{ color: MAGENTA }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold font-headings" style={{ color: LIGHT }}>{t('Assistant Financier')}</p>
                    <p style={{ color: MUTED, fontSize: '11px' }}>{t('Analyse en temps réel · Actualisé à 09:42')}</p>
                  </div>
                </div>
                <span style={{ background: 'rgba(194,20,122,0.18)', color: '#e87ec0', fontSize: '9px', fontWeight: '700', padding: '2px 7px', borderRadius: '4px' }}>{t('NOUVEAU')}</span>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center gap-3 py-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.12)' }}>
                  <Icon i="check-circle" size={22} style={{ color: '#22c55e' }} />
                </div>
                <p className="text-sm font-semibold" style={{ color: LIGHT }}>{t('Tout est en ordre !')}</p>
                <p style={{ color: MUTED, fontSize: '12px', textAlign: 'center', maxWidth: '180px' }}>{t('Aucun point d\'attention particulier détecté')}</p>
              </div>

              <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: '14px' }}>
                <p style={{ color: '#4a4a4a', fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>{t('SITUATION DE VOTRE ACTIVITÉ')}</p>
                {[
                  { icon: 'file-check', text: t('Toutes vos factures sont à jour'), sub: t('Excellent suivi des paiements'), color: '#22c55e' },
                  { icon: 'users', text: t('14 clients actifs'), sub: t('6 actifs ce mois'), color: GOLD },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 mb-3">
                    <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: item.color + '1a' }}>
                      <Icon i={item.icon} size={13} style={{ color: item.color }} />
                    </div>
                    <div>
                      <p style={{ color: LIGHT, fontSize: '12px', fontWeight: '500' }}>{item.text}</p>
                      <p style={{ color: MUTED, fontSize: '11px' }}>{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold mt-2" style={{ background: 'rgba(194,20,122,0.12)', color: '#e87ec0', border: `1px solid rgba(194,20,122,0.25)` }}>
                <Icon i="sparkles" size={12} />
                {t('Assistant complet →')}
              </a>
            </div>

            {/* Mode Inspecteur */}
            <div className="rounded-2xl p-7 flex flex-col" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(249,176,0,0.12)' }}>
                    <Icon i="shield" size={16} style={{ color: GOLD }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold font-headings" style={{ color: LIGHT }}>{t('Mode Inspecteur')}</p>
                    <p style={{ color: MUTED, fontSize: '11px' }}>{t('Contrôle de conformité automatique')}</p>
                  </div>
                </div>
                <span style={{ background: 'rgba(249,176,0,0.15)', color: GOLD, fontSize: '9px', fontWeight: '700', padding: '2px 7px', borderRadius: '4px' }}>{t('NOUVEAU')}</span>
              </div>

              {/* Status banner */}
              <div className="rounded-xl px-4 py-4 mb-5 flex flex-col gap-2" style={{ background: 'rgba(34,197,94,0.08)', border: `1px solid rgba(34,197,94,0.2)` }}>
                <div className="flex items-center gap-2">
                  <Icon i="check-circle" size={15} style={{ color: '#22c55e' }} />
                  <span className="text-sm font-semibold" style={{ color: '#22c55e' }}>{t('Votre activité est conforme.')}</span>
                </div>
                <p style={{ color: '#22c55e', fontSize: '11px', opacity: 0.8 }}>{t('Aucun problème majeur détecté.')}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Icon i="check-circle" size={11} style={{ color: '#22c55e' }} />
                  <span style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e', fontSize: '10px', fontWeight: '600', padding: '1px 8px', borderRadius: '20px' }}>{t('10 conformes')}</span>
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.1)' }}>
                  <Icon i="check-circle" size={20} style={{ color: '#22c55e' }} />
                </div>
                <p className="text-sm font-semibold" style={{ color: '#22c55e' }}>{t('Aucun problème détecté')}</p>
              </div>

              <a className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold mt-4" style={{ background: 'rgba(249,176,0,0.1)', color: GOLD, border: `1px solid rgba(249,176,0,0.2)` }}>
                <Icon i="shield" size={12} />
                {t('Inspecteur complet →')}
              </a>
            </div>
          </div>

          {/* Invoices table */}
          <div className="rounded-2xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <div className="flex items-center justify-between px-7 py-5" style={{ borderBottom: `1px solid ${BORDER}` }}>
              <p className="text-sm font-bold font-headings" style={{ color: LIGHT }}>{t('Dernières factures')}</p>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium" style={{ background: '#222', border: `1px solid ${BORDER}`, color: MUTED }}>
                  <Icon i="file-plus" size={12} style={{ color: GOLD }} />
                  {t('Nouveau devis')}
                </button>
                <a className="text-xs font-medium" style={{ color: MAGENTA }}>{t('Voir tout →')}</a>
              </div>
            </div>
            {/* Header */}
            <div className="grid px-7 py-3" style={{ gridTemplateColumns: '1fr 1.5fr 1fr 1fr 110px', borderBottom: `1px solid ${BORDER}` }}>
              {[t('Référence'), t('Client'), t('Montant'), t('Date'), t('Statut')].map((h, i) => (
                <p key={i} style={{ color: '#484848', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</p>
              ))}
            </div>
            {/* Rows */}
            {invoices.map((inv, i) => (
              <div key={i} className="grid px-7 py-4 items-center" style={{ gridTemplateColumns: '1fr 1.5fr 1fr 1fr 110px', borderBottom: i < invoices.length - 1 ? `1px solid #202020` : 'none' }}>
                <p className="text-sm font-semibold" style={{ color: LIGHT }}>{inv.ref}</p>
                <p className="text-sm" style={{ color: MUTED }}>{inv.client}</p>
                <p className="text-sm font-semibold" style={{ color: LIGHT }}>{inv.amount}</p>
                <p className="text-sm" style={{ color: MUTED }}>{inv.date}</p>
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: inv.color + '1a', color: inv.color, display: 'inline-block' }}>{inv.status}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
