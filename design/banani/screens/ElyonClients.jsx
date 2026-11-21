export const displayName = 'Elyon Créa — Clients';
export const shortDescription = 'Back-office SaaS — gestion de la base clients';

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
      { icon: 'shield',   label: t('Mode Inspecteur'), badge: t('NOUVEAU') },
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
      { icon: 'users',         label: t('Clients'), active: true },
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

const clients = [
  { initials: 'RS', name: 'Réseau SOGARA',     email: 'contact@sogara.ga',       ville: 'Port-Gentil', devis: 3, factures: 5, ca: '1 870 000 FCFA', lastActivity: '12 mai 2025',  status: t('Actif'),    color: '#22c55e' },
  { initials: 'GT', name: 'Gabon Telecom',     email: 'commandes@gabontelecom.ga',ville: 'Libreville',  devis: 2, factures: 4, ca: '2 600 000 FCFA', lastActivity: '08 mai 2025',  status: t('Actif'),    color: '#22c55e' },
  { initials: 'SG', name: 'SEEG Gabon',        email: 'daf@seeg.ga',             ville: 'Libreville',  devis: 1, factures: 3, ca: '980 000 FCFA',   lastActivity: '02 mai 2025',  status: t('Actif'),    color: '#22c55e' },
  { initials: 'MC', name: 'Ministère Culture', email: 'dg@culture.gouv.ga',      ville: 'Libreville',  devis: 4, factures: 2, ca: '1 140 000 FCFA', lastActivity: '28 avr. 2025', status: t('En pause'), color: GOLD },
  { initials: 'OG', name: 'Olam Gabon',        email: 'procurement@olamgabon.com',ville: 'Libreville', devis: 2, factures: 6, ca: '4 290 000 FCFA', lastActivity: '20 avr. 2025', status: t('Actif'),    color: '#22c55e' },
  { initials: 'BG', name: 'BGFIBank',          email: 'compta@bgfi.com',         ville: 'Libreville',  devis: 1, factures: 2, ca: '580 000 FCFA',   lastActivity: '15 avr. 2025', status: t('En pause'), color: GOLD },
  { initials: 'AG', name: 'Air Gabon',         email: 'marketing@airgabon.ga',   ville: 'Libreville',  devis: 3, factures: 4, ca: '1 700 000 FCFA', lastActivity: '08 avr. 2025', status: t('Actif'),    color: '#22c55e' },
  { initials: 'PI', name: 'Port-Gentil Invest',email: 'info@pginvest.ga',        ville: 'Port-Gentil', devis: 2, factures: 1, ca: '980 000 FCFA',   lastActivity: '02 avr. 2025', status: t('Prospect'), color: '#3b82f6' },
];

const clientKpis = [
  { icon: 'users',       label: t('Total clients'),    value: '14',         unit: t('base active'),        accent: '#3b82f6' },
  { icon: 'user-check',  label: t('Clients actifs'),   value: '9',          unit: t('ce mois'),            accent: '#22c55e' },
  { icon: 'trending-up', label: t('CA total clients'), value: '14 140 000', unit: 'FCFA',                  accent: MAGENTA },
  { icon: 'user-plus',   label: t('Prospects'),        value: '3',          unit: t('à convertir'),        accent: GOLD },
];

export default function ElyonClients() {
  return (
    <div className="flex font-body" style={{ background: DARK, minHeight: '1100px' }}>

      {/* ── Sidebar ── */}
      <div className="flex flex-col" style={{ width: '220px', minWidth: '220px', background: DARK2, borderRight: `1px solid ${BORDER}`, minHeight: '1100px' }}>
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
                    color:      item.active ? '#e87ec0' : MUTED,
                    fontWeight: item.active ? '600' : '400',
                  }}>
                  <span className="flex items-center gap-3">
                    <Icon i={item.icon} size={15} />
                    {item.label}
                  </span>
                  {item.badge && (
                    <span style={{ background: 'rgba(194,20,122,0.25)', color: '#e87ec0', fontSize: '9px', fontWeight: '700', padding: '2px 5px', borderRadius: '4px' }}>{item.badge}</span>
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
          <div>
            <h1 className="text-xl font-bold font-headings" style={{ color: LIGHT }}>{t('Clients')}</h1>
            <p style={{ color: MUTED, fontSize: '12px', marginTop: '2px' }}>{t('Accueil')} <span style={{ color: '#3a3a3a' }}>›</span> {t('Clients')}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm" style={{ background: '#1a1a1a', border: `1px solid ${BORDER}`, color: MUTED, width: '240px' }}>
              <Icon i="search" size={13} />
              {t('Rechercher un client…')}
            </div>
            <a className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#1a1a1a', border: `1px solid ${BORDER}` }}>
              <Icon i="bell" size={15} style={{ color: MUTED }} />
            </a>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold" style={{ background: MAGENTA, color: '#fff' }}>
              <Icon i="user-plus" size={14} />
              {t('Nouveau client')}
            </button>
          </div>
        </div>

        {/* Page content */}
        <div className="px-10 py-10 flex flex-col gap-8">

          {/* KPI row */}
          <div className="grid grid-cols-4 gap-5">
            {clientKpis.map((k, i) => (
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

          {/* Filters row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {[t('Tous'), t('Actifs'), t('En pause'), t('Prospects')].map((f, i) => (
                <button key={i} className="px-4 py-2 rounded-lg text-xs font-medium" style={{
                  background: i === 0 ? 'rgba(194,20,122,0.15)' : '#1a1a1a',
                  color:      i === 0 ? '#e87ec0' : MUTED,
                  border:     `1px solid ${i === 0 ? 'rgba(194,20,122,0.3)' : BORDER}`,
                }}>{f}</button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs" style={{ background: '#1a1a1a', border: `1px solid ${BORDER}`, color: MUTED }}>
                <Icon i="map-pin" size={12} />
                {t('Toutes villes')}
                <Icon i="chevron-down" size={12} />
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs" style={{ background: '#1a1a1a', border: `1px solid ${BORDER}`, color: MUTED }}>
                <Icon i="arrow-up-down" size={12} />
                {t('Trier par CA')}
              </div>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium" style={{ background: '#1a1a1a', border: `1px solid ${BORDER}`, color: MUTED }}>
                <Icon i="download" size={12} />
                {t('Exporter')}
              </button>
            </div>
          </div>

          {/* Clients table */}
          <div className="rounded-2xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            {/* Header */}
            <div className="grid px-7 py-4" style={{ gridTemplateColumns: '2fr 1.8fr 1fr 0.7fr 0.7fr 1.2fr 140px', borderBottom: `1px solid ${BORDER}` }}>
              {[t('Client'), t('Email'), t('Ville'), t('Devis'), t('Factures'), t('CA total'), t('Statut')].map((h, i) => (
                <p key={i} style={{ color: '#484848', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</p>
              ))}
            </div>
            {/* Rows */}
            {clients.map((cl, i) => (
              <div key={i} className="grid px-7 py-4 items-center" style={{ gridTemplateColumns: '2fr 1.8fr 1fr 0.7fr 0.7fr 1.2fr 140px', borderBottom: i < clients.length - 1 ? `1px solid #1e1e1e` : 'none' }}>
                {/* Client name + avatar */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'rgba(194,20,122,0.18)', color: '#e87ec0' }}>{cl.initials}</div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: LIGHT }}>{cl.name}</p>
                    <p style={{ color: '#484848', fontSize: '11px' }}>{t('Dernière activité :')} {cl.lastActivity}</p>
                  </div>
                </div>
                <p className="text-sm" style={{ color: MUTED }}>{cl.email}</p>
                <div className="flex items-center gap-1.5">
                  <Icon i="map-pin" size={11} style={{ color: '#484848' }} />
                  <p className="text-sm" style={{ color: MUTED }}>{cl.ville}</p>
                </div>
                <p className="text-sm font-semibold" style={{ color: LIGHT }}>{cl.devis}</p>
                <p className="text-sm font-semibold" style={{ color: LIGHT }}>{cl.factures}</p>
                <p className="text-sm font-semibold" style={{ color: MAGENTA }}>{cl.ca}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: cl.color + '1a', color: cl.color }}>{cl.status}</span>
                  <button className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: '#222', border: `1px solid #333` }}>
                    <Icon i="chevron-right" size={12} style={{ color: MUTED }} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
