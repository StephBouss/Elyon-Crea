export const displayName = 'Elyon Créa — Comptabilité';
export const shortDescription = 'Back-office SaaS — vue comptable, revenus et dépenses';

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
      { icon: 'users',         label: t('Clients') },
      { icon: 'package',       label: t('Produits & Services') },
      { icon: 'folder-kanban', label: t('Projets') },
    ],
  },
  {
    label: t('FINANCE'),
    items: [
      { icon: 'bar-chart-2', label: t('Comptabilité'), active: true },
      { icon: 'trending-up', label: t('Rapports') },
    ],
  },
  {
    label: t('CONFIGURATION'),
    items: [{ icon: 'settings', label: t('Paramètres') }],
  },
];

const transactions = [
  { icon: 'receipt',     label: t('Facture Gabon Telecom'),       cat: t('Encaissement'),  date: '08 mai 2025',  montant: '+1 200 000', type: 'credit', color: '#22c55e' },
  { icon: 'wifi',        label: t('Abonnement Adobe Creative'),   cat: t('Logiciels'),     date: '05 mai 2025',  montant: '-42 000',    type: 'debit',  color: '#ef4444' },
  { icon: 'receipt',     label: t('Facture Réseau SOGARA'),       cat: t('Encaissement'),  date: '02 mai 2025',  montant: '+590 000',   type: 'credit', color: '#22c55e' },
  { icon: 'receipt',     label: t('Facture SEEG Gabon'),          cat: t('Encaissement'),  date: '02 mai 2025',  montant: '+380 000',   type: 'credit', color: '#22c55e' },
  { icon: 'user',        label: t('Salaire assistante — Avril'),  cat: t('Charges RH'),    date: '30 avr. 2025', montant: '-180 000',   type: 'debit',  color: '#ef4444' },
  { icon: 'map-pin',     label: t('Loyer bureau — Mai'),          cat: t('Charges fixes'), date: '28 avr. 2025', montant: '-250 000',   type: 'debit',  color: '#ef4444' },
  { icon: 'receipt',     label: t('Facture Olam Gabon'),          cat: t('Encaissement'),  date: '20 avr. 2025', montant: '+1 450 000', type: 'credit', color: '#22c55e' },
  { icon: 'smartphone',  label: t('Forfait mobile pro'),          cat: t('Charges fixes'), date: '18 avr. 2025', montant: '-35 000',    type: 'debit',  color: '#ef4444' },
  { icon: 'camera',      label: t('Location matériel photo'),     cat: t('Équipement'),    date: '15 avr. 2025', montant: '-90 000',    type: 'debit',  color: '#ef4444' },
  { icon: 'receipt',     label: t('Facture Air Gabon'),           cat: t('Encaissement'),  date: '08 avr. 2025', montant: '+620 000',   type: 'credit', color: '#22c55e' },
];

// Barres du graphique mensuel — CA net simplifié
const months = [
  { label: 'Jan', revenus: 1800, charges: 900 },
  { label: 'Fév', revenus: 2200, charges: 750 },
  { label: 'Mar', revenus: 1600, charges: 820 },
  { label: 'Avr', revenus: 3100, charges: 1050 },
  { label: 'Mai', revenus: 3800, charges: 980 },
  { label: 'Jui', revenus: 2900, charges: 860 },
];
const maxBar = 4000;

const comptaKpis = [
  { icon: 'trending-up',  label: t('CA mai 2025'),       value: '3 800 000', unit: 'FCFA encaissés',    accent: '#22c55e' },
  { icon: 'trending-down',label: t('Charges mai 2025'),  value: '597 000',   unit: 'FCFA de charges',   accent: '#ef4444' },
  { icon: 'bar-chart-2',  label: t('Résultat net mai'),  value: '3 203 000', unit: 'FCFA net',           accent: MAGENTA },
  { icon: 'percent',      label: t('Marge nette'),        value: '84%',       unit: t('taux de marge'),  accent: GOLD },
];

export default function ElyonCompta() {
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
            <h1 className="text-xl font-bold font-headings" style={{ color: LIGHT }}>{t('Comptabilité')}</h1>
            <p style={{ color: MUTED, fontSize: '12px', marginTop: '2px' }}>{t('Accueil')} <span style={{ color: '#3a3a3a' }}>›</span> {t('Comptabilité')}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs" style={{ background: '#1a1a1a', border: `1px solid ${BORDER}`, color: MUTED }}>
              <Icon i="calendar" size={12} />
              {t('Mai 2025')}
              <Icon i="chevron-down" size={12} />
            </div>
            <a className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#1a1a1a', border: `1px solid ${BORDER}` }}>
              <Icon i="bell" size={15} style={{ color: MUTED }} />
            </a>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold" style={{ background: MAGENTA, color: '#fff' }}>
              <Icon i="download" size={14} />
              {t('Exporter bilan')}
            </button>
          </div>
        </div>

        {/* Page content */}
        <div className="px-10 py-10 flex flex-col gap-8">

          {/* KPI row */}
          <div className="grid grid-cols-4 gap-5">
            {comptaKpis.map((k, i) => (
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

          {/* Graph + Répartition charges */}
          <div className="grid grid-cols-3 gap-5">

            {/* Graphique revenus vs charges */}
            <div className="col-span-2 rounded-2xl p-7" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm font-semibold" style={{ color: LIGHT }}>{t('Revenus vs Charges — 6 derniers mois')}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full" style={{ background: '#22c55e' }} /><p style={{ color: MUTED, fontSize: '11px' }}>{t('Revenus')}</p></div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full" style={{ background: '#ef4444' }} /><p style={{ color: MUTED, fontSize: '11px' }}>{t('Charges')}</p></div>
                </div>
              </div>
              {/* Barres */}
              <div className="flex items-end gap-4" style={{ height: '160px' }}>
                {months.map((m, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex items-end gap-1" style={{ height: '140px' }}>
                      <div className="flex-1 rounded-t-md" style={{ height: `${m.revenus / maxBar * 140}px`, background: i === 4 ? '#22c55e' : '#22c55e44' }} />
                      <div className="flex-1 rounded-t-md" style={{ height: `${m.charges / maxBar * 140}px`, background: i === 4 ? '#ef4444' : '#ef444444' }} />
                    </div>
                    <p style={{ color: i === 4 ? LIGHT : '#484848', fontSize: '11px', fontWeight: i === 4 ? '600' : '400' }}>{m.label}</p>
                  </div>
                ))}
              </div>
              {/* Axe Y labels */}
              <div className="flex justify-between mt-3">
                <p style={{ color: '#484848', fontSize: '10px' }}>0</p>
                <p style={{ color: '#484848', fontSize: '10px' }}>1 M</p>
                <p style={{ color: '#484848', fontSize: '10px' }}>2 M</p>
                <p style={{ color: '#484848', fontSize: '10px' }}>3 M</p>
                <p style={{ color: '#484848', fontSize: '10px' }}>4 M FCFA</p>
              </div>
            </div>

            {/* Répartition charges */}
            <div className="rounded-2xl p-7" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <p className="text-sm font-semibold mb-6" style={{ color: LIGHT }}>{t('Répartition des charges')}</p>
              {[
                { label: t('Charges RH'),    montant: '180 000', pct: 30, color: '#e87ec0' },
                { label: t('Charges fixes'), montant: '285 000', pct: 48, color: GOLD },
                { label: t('Logiciels'),     montant: '42 000',  pct: 7,  color: '#3b82f6' },
                { label: t('Équipement'),    montant: '90 000',  pct: 15, color: '#a855f7' },
              ].map((c, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between items-center mb-1.5">
                    <p style={{ color: MUTED, fontSize: '12px' }}>{c.label}</p>
                    <div className="flex items-center gap-2">
                      <p style={{ color: LIGHT, fontSize: '12px', fontWeight: '600' }}>{c.montant} FCFA</p>
                      <span style={{ color: c.color, fontSize: '11px', fontWeight: '700' }}>{c.pct}%</span>
                    </div>
                  </div>
                  <div className="rounded-full h-1.5 w-full" style={{ background: '#2a2a2a' }}>
                    <div className="rounded-full h-full" style={{ width: `${c.pct}%`, background: c.color }} />
                  </div>
                </div>
              ))}
              <div className="mt-5 pt-4" style={{ borderTop: `1px solid ${BORDER}` }}>
                <div className="flex justify-between">
                  <p style={{ color: MUTED, fontSize: '12px' }}>{t('Total charges mai')}</p>
                  <p className="font-bold" style={{ color: '#ef4444', fontSize: '13px' }}>597 000 FCFA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Journal des transactions */}
          <div className="rounded-2xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <div className="flex items-center justify-between px-7 py-5" style={{ borderBottom: `1px solid ${BORDER}` }}>
              <p className="text-sm font-semibold" style={{ color: LIGHT }}>{t('Journal des transactions')}</p>
              <div className="flex items-center gap-2">
                {[t('Toutes'), t('Encaissements'), t('Charges')].map((f, i) => (
                  <button key={i} className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{
                    background: i === 0 ? 'rgba(194,20,122,0.15)' : '#222',
                    color:      i === 0 ? '#e87ec0' : MUTED,
                    border:     `1px solid ${i === 0 ? 'rgba(194,20,122,0.3)' : '#333'}`,
                  }}>{f}</button>
                ))}
              </div>
            </div>
            {/* Header */}
            <div className="grid px-7 py-3" style={{ gridTemplateColumns: '2.4fr 1.2fr 1fr 1fr', borderBottom: `1px solid #1e1e1e` }}>
              {[t('Libellé'), t('Catégorie'), t('Date'), t('Montant')].map((h, i) => (
                <p key={i} style={{ color: '#484848', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: i === 3 ? 'right' : 'left' }}>{h}</p>
              ))}
            </div>
            {transactions.map((tx, i) => (
              <div key={i} className="grid px-7 py-3.5 items-center" style={{ gridTemplateColumns: '2.4fr 1.2fr 1fr 1fr', borderBottom: i < transactions.length - 1 ? `1px solid #1a1a1a` : 'none' }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: tx.type === 'credit' ? '#22c55e14' : '#ef444414', border: `1px solid ${tx.type === 'credit' ? '#22c55e30' : '#ef444430'}` }}>
                    <Icon i={tx.icon} size={12} style={{ color: tx.color }} />
                  </div>
                  <p className="text-sm" style={{ color: LIGHT }}>{tx.label}</p>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-md" style={{ background: '#222', color: MUTED, border: `1px solid #2a2a2a`, display: 'inline-block' }}>{tx.cat}</span>
                <p style={{ color: '#484848', fontSize: '12px' }}>{tx.date}</p>
                <p className="text-sm font-bold text-right" style={{ color: tx.color }}>{tx.montant} FCFA</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
