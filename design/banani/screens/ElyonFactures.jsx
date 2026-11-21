export const displayName = 'Elyon Créa — Factures';
export const shortDescription = 'Back-office SaaS — liste et gestion des factures';

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
      { icon: 'receipt',     label: t('Factures'), active: true },
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

const invoices = [
  { ref: 'FAC-2025-042', client: 'Réseau SOGARA',     amount: '590 000 FCFA',   date: '12 mai 2025',  due: '12 juin 2025',  status: t('Payée'),      color: '#22c55e' },
  { ref: 'FAC-2025-041', client: 'Gabon Telecom',     amount: '1 200 000 FCFA', date: '08 mai 2025',  due: '08 juin 2025',  status: t('En attente'), color: GOLD },
  { ref: 'FAC-2025-040', client: 'SEEG Gabon',        amount: '380 000 FCFA',   date: '02 mai 2025',  due: '02 juin 2025',  status: t('Payée'),      color: '#22c55e' },
  { ref: 'FAC-2025-039', client: 'Ministère Culture', amount: '750 000 FCFA',   date: '28 avr. 2025', due: '28 mai 2025',   status: t('En retard'),  color: '#ef4444' },
  { ref: 'FAC-2025-038', client: 'Olam Gabon',        amount: '1 450 000 FCFA', date: '20 avr. 2025', due: '20 mai 2025',   status: t('Payée'),      color: '#22c55e' },
  { ref: 'FAC-2025-037', client: 'BGFIBank',          amount: '290 000 FCFA',   date: '15 avr. 2025', due: '15 mai 2025',   status: t('En retard'),  color: '#ef4444' },
  { ref: 'FAC-2025-036', client: 'Air Gabon',         amount: '620 000 FCFA',   date: '08 avr. 2025', due: '08 mai 2025',   status: t('Payée'),      color: '#22c55e' },
];

const invoiceKpis = [
  { icon: 'receipt',      label: t('Total factures'),     value: '24',             unit: t('ce mois'),        accent: '#3b82f6' },
  { icon: 'check-circle', label: t('Payées'),             value: '5 220 000',      unit: 'FCFA encaissés',    accent: '#22c55e' },
  { icon: 'clock',        label: t('En attente'),         value: '1 490 000',      unit: 'FCFA à recevoir',   accent: GOLD },
  { icon: 'alert-circle', label: t('En retard'),          value: '1 040 000',      unit: 'FCFA impayés',      accent: '#ef4444' },
];

export default function ElyonFactures() {
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
            <h1 className="text-xl font-bold font-headings" style={{ color: LIGHT }}>{t('Factures')}</h1>
            <p style={{ color: MUTED, fontSize: '12px', marginTop: '2px' }}>{t('Accueil')} <span style={{ color: '#3a3a3a' }}>›</span> {t('Factures')}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm" style={{ background: '#1a1a1a', border: `1px solid ${BORDER}`, color: MUTED, width: '240px' }}>
              <Icon i="search" size={13} />
              {t('Rechercher une facture…')}
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
        <div className="px-10 py-10 flex flex-col gap-8">

          {/* KPI row */}
          <div className="grid grid-cols-4 gap-5">
            {invoiceKpis.map((k, i) => (
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
              {[t('Toutes'), t('Payées'), t('En attente'), t('En retard'), t('Annulée')].map((f, i) => (
                <button key={i} className="px-4 py-2 rounded-lg text-xs font-medium" style={{
                  background: i === 0 ? 'rgba(194,20,122,0.15)' : '#1a1a1a',
                  color:      i === 0 ? '#e87ec0' : MUTED,
                  border:     `1px solid ${i === 0 ? 'rgba(194,20,122,0.3)' : BORDER}`,
                }}>{f}</button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs" style={{ background: '#1a1a1a', border: `1px solid ${BORDER}`, color: MUTED }}>
                <Icon i="calendar" size={12} />
                {t('Mai 2025')}
                <Icon i="chevron-down" size={12} />
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs" style={{ background: '#1a1a1a', border: `1px solid ${BORDER}`, color: MUTED }}>
                <Icon i="arrow-up-down" size={12} />
                {t('Trier par date')}
              </div>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium" style={{ background: '#1a1a1a', border: `1px solid ${BORDER}`, color: MUTED }}>
                <Icon i="download" size={12} />
                {t('Exporter')}
              </button>
            </div>
          </div>

          {/* Invoices table */}
          <div className="rounded-2xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            {/* Header */}
            <div className="grid px-7 py-4" style={{ gridTemplateColumns: '1.2fr 1.6fr 1fr 1fr 1fr 260px', borderBottom: `1px solid ${BORDER}` }}>
              {[t('Référence'), t('Client'), t('Montant'), t('Date émission'), t('Échéance'), t('Actions')].map((h, i) => (
                <p key={i} style={{ color: '#484848', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</p>
              ))}
            </div>
            {/* Rows */}
            {invoices.map((inv, i) => (
              <div key={i} className="grid px-7 py-4 items-center" style={{ gridTemplateColumns: '1.2fr 1.6fr 1fr 1fr 1fr 260px', borderBottom: i < invoices.length - 1 ? `1px solid #1e1e1e` : 'none' }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: '#222' }}>
                    <Icon i="receipt" size={13} style={{ color: MUTED }} />
                  </div>
                  <p className="text-sm font-semibold" style={{ color: LIGHT }}>{inv.ref}</p>
                </div>
                <p className="text-sm" style={{ color: MUTED }}>{inv.client}</p>
                <p className="text-sm font-semibold" style={{ color: LIGHT }}>{inv.amount}</p>
                <p className="text-sm" style={{ color: MUTED }}>{inv.date}</p>
                <p className="text-sm" style={{ color: inv.status === t('En retard') ? '#ef4444' : MUTED }}>{inv.due}</p>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {/* Badge statut */}
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: inv.color + '1a', color: inv.color }}>{inv.status}</span>
                  {/* Bouton Aperçu — toujours visible */}
                  <button className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.05)', color: MUTED, border: `1px solid #333` }}>
                    <Icon i="eye" size={10} />
                    {t('Aperçu')}
                  </button>
                  {/* Bouton → BL — visible quand payée */}
                  {inv.status === t('Payée') && (
                    <button className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold" style={{ background: 'rgba(194,20,122,0.12)', color: '#e87ec0', border: `1px solid rgba(194,20,122,0.25)` }}>
                      <Icon i="truck" size={10} />
                      {t('→ BL')}
                    </button>
                  )}
                  {/* Bouton Relancer — en attente */}
                  {inv.status === t('En attente') && (
                    <button className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold" style={{ background: 'rgba(249,176,0,0.12)', color: GOLD, border: `1px solid rgba(249,176,0,0.25)` }}>
                      <Icon i="send" size={10} />
                      {t('Relancer')}
                    </button>
                  )}
                  {/* Bouton Relancer — en retard */}
                  {inv.status === t('En retard') && (
                    <button className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold" style={{ background: 'rgba(239,68,68,0.12)', color: '#ef4444', border: `1px solid rgba(239,68,68,0.25)` }}>
                      <Icon i="alert-triangle" size={10} />
                      {t('Relancer')}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
