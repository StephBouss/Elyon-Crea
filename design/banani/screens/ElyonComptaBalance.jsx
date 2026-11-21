export const displayName = 'Elyon Créa — Comptabilité (Balance)';
export const shortDescription = 'Back-office SaaS — onglet Balance des comptes Juin 2026';

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

// ── Données Journal ──────────────────────────────────────────────────────────
const ROSE   = '#e87ec0';
const GREEN  = '#22c55e';
const RED    = '#ef4444';
const AUTO_BADGE_COLOR = '#e87ec0'; // Rose Envol

const journalEntries = [
  { date: '02/06', piece: 'FAC-2026-0009', auto: true,  lines: [
    { compte: '411', libelle: t('Boutique Élégance Nzeng'),  debit: '250 000',   credit: '' },
    { compte: '706', libelle: t('Services vendus'),           debit: '',          credit: '250 000' },
  ]},
  { date: '04/06', piece: 'FAC-2026-0012', auto: true,  lines: [
    { compte: '411', libelle: t('Restaurant Le Manguier'),    debit: '1 150 000', credit: '' },
    { compte: '706', libelle: t('Services vendus'),           debit: '',          credit: '1 150 000' },
  ]},
  { date: '05/06', piece: 'ENC-0009',      auto: true,  lines: [
    { compte: '521', libelle: t('Encaissement Boutique Élégance'), debit: '250 000', credit: '' },
    { compte: '411', libelle: t('Boutique Élégance Nzeng'),        debit: '',        credit: '250 000' },
  ]},
  { date: '08/06', piece: 'FAC-2026-0014', auto: true,  lines: [
    { compte: '411', libelle: t('Clinique Dentaire Okoumé'),  debit: '300 000',   credit: '' },
    { compte: '706', libelle: t('Services vendus'),           debit: '',          credit: '300 000' },
  ]},
  { date: '10/06', piece: 'ACH-0007',      auto: false, lines: [
    { compte: '605', libelle: t('Impression flyers — Imprim\'Gabon'), debit: '400 000', credit: '' },
    { compte: '401', libelle: t('Fournisseur Imprim\'Gabon'),         debit: '',        credit: '400 000' },
  ]},
  { date: '10/06', piece: 'ACH-0008',      auto: false, lines: [
    { compte: '622', libelle: t('Loyer bureau (Juin)'),       debit: '200 000',   credit: '' },
    { compte: '401', libelle: t('Fournisseur bailleur'),      debit: '',          credit: '200 000' },
  ]},
  { date: '12/06', piece: 'ENC-0012',      auto: true,  lines: [
    { compte: '521', libelle: t('Acompte Restaurant Le Manguier'), debit: '500 000', credit: '' },
    { compte: '411', libelle: t('Restaurant Le Manguier'),         debit: '',        credit: '500 000' },
  ]},
  { date: '14/06', piece: 'FAC-2026-0016', auto: true,  lines: [
    { compte: '411', libelle: t('BTP Ogooué Services'),       debit: '400 000',   credit: '' },
    { compte: '706', libelle: t('Services vendus'),           debit: '',          credit: '400 000' },
  ]},
  { date: '15/06', piece: 'PAY-0021',      auto: false, lines: [
    { compte: '401', libelle: t('Règlement Imprim\'Gabon + loyer'), debit: '450 000', credit: '' },
    { compte: '521', libelle: t('Banque'),                          debit: '',        credit: '450 000' },
  ]},
  { date: '18/06', piece: 'APP-0003',      auto: false, lines: [
    { compte: '571', libelle: t('Approvisionnement caisse'),  debit: '150 000',   credit: '' },
    { compte: '521', libelle: t('Banque'),                    debit: '',          credit: '150 000' },
  ]},
  { date: '20/06', piece: 'ENC-0014',      auto: true,  lines: [
    { compte: '521', libelle: t('Encaissement Clinique Okoumé'), debit: '300 000', credit: '' },
    { compte: '411', libelle: t('Clinique Dentaire Okoumé'),     debit: '',        credit: '300 000' },
  ]},
  { date: '22/06', piece: 'ISL-06',        auto: false, lines: [
    { compte: '64',  libelle: t('Versement ISL (Juin)'),      debit: '120 000',   credit: '' },
    { compte: '521', libelle: t('Banque'),                    debit: '',          credit: '120 000' },
  ]},
  { date: '24/06', piece: 'FAC-2026-0017', auto: true,  lines: [
    { compte: '411', libelle: t('École Les Petits Colibris'), debit: '400 000',   credit: '' },
    { compte: '706', libelle: t('Services vendus'),           debit: '',          credit: '400 000' },
  ]},
  { date: '25/06', piece: 'ACH-0009',      auto: false, lines: [
    { compte: '605', libelle: t('Achat fournitures (caisse)'),debit: '60 000',    credit: '' },
    { compte: '571', libelle: t('Caisse'),                    debit: '',          credit: '60 000' },
  ]},
  { date: '26/06', piece: 'FAC-2026-0018', auto: true,  lines: [
    { compte: '411', libelle: t('Cabinet Médic+'),            debit: '250 000',   credit: '' },
    { compte: '706', libelle: t('Services vendus'),           debit: '',          credit: '250 000' },
  ]},
  { date: '27/06', piece: 'ENC-0016',      auto: true,  lines: [
    { compte: '521', libelle: t('Encaissement BTP Ogooué'),   debit: '400 000',   credit: '' },
    { compte: '411', libelle: t('BTP Ogooué Services'),       debit: '',          credit: '400 000' },
  ]},
  { date: '30/06', piece: 'ENC-0018',      auto: true,  lines: [
    { compte: '521', libelle: t('Solde Restaurant Le Manguier'), debit: '650 000', credit: '' },
    { compte: '411', libelle: t('Restaurant Le Manguier'),        debit: '',       credit: '650 000' },
  ]},
];

// ── Données Balance ───────────────────────────────────────────────────────────
const balanceRows = [
  { classe: t('4 — Tiers'),       compte: '411', intitule: t('Clients'),               debit: '2 750 000', credit: '2 100 000', soldeD: '650 000',   soldeC: '' },
  { classe: t('4 — Tiers'),       compte: '401', intitule: t('Fournisseurs'),           debit: '450 000',   credit: '600 000',   soldeD: '',          soldeC: '150 000' },
  { classe: t('5 — Trésorerie'),  compte: '521', intitule: t('Banque'),                 debit: '2 100 000', credit: '720 000',   soldeD: '1 380 000', soldeC: '' },
  { classe: t('5 — Trésorerie'),  compte: '571', intitule: t('Caisse'),                 debit: '150 000',   credit: '60 000',    soldeD: '90 000',    soldeC: '' },
  { classe: t('6 — Charges'),     compte: '605', intitule: t('Autres achats'),          debit: '460 000',   credit: '0',         soldeD: '460 000',   soldeC: '' },
  { classe: t('6 — Charges'),     compte: '622', intitule: t('Locations'),              debit: '200 000',   credit: '0',         soldeD: '200 000',   soldeC: '' },
  { classe: t('6 — Charges'),     compte: '64',  intitule: t('Impôts et taxes (ISL)'), debit: '120 000',   credit: '0',         soldeD: '120 000',   soldeC: '' },
  { classe: t('7 — Produits'),    compte: '706', intitule: t('Services vendus'),        debit: '0',         credit: '2 750 000', soldeD: '',          soldeC: '2 750 000' },
];

// ── Données Grand Livre (compte 521) ─────────────────────────────────────────
const grandLivreRows = [
  { date: '05/06', piece: 'ENC-0009', libelle: t('Encaissement Boutique Élégance Nzeng'), debit: '250 000', credit: '',        solde: '250 000' },
  { date: '12/06', piece: 'ENC-0012', libelle: t('Acompte Restaurant Le Manguier'),       debit: '500 000', credit: '',        solde: '750 000' },
  { date: '15/06', piece: 'PAY-0021', libelle: t('Règlement Imprim\'Gabon + loyer'),       debit: '',        credit: '450 000', solde: '300 000' },
  { date: '18/06', piece: 'APP-0003', libelle: t('Approvisionnement caisse'),              debit: '',        credit: '150 000', solde: '150 000' },
  { date: '20/06', piece: 'ENC-0014', libelle: t('Encaissement Clinique Okoumé'),          debit: '300 000', credit: '',        solde: '450 000' },
  { date: '22/06', piece: 'ISL-06',   libelle: t('Versement ISL (Juin)'),                  debit: '',        credit: '120 000', solde: '330 000' },
  { date: '27/06', piece: 'ENC-0016', libelle: t('Encaissement BTP Ogooué Services'),      debit: '400 000', credit: '',        solde: '730 000' },
  { date: '30/06', piece: 'ENC-0018', libelle: t('Solde Restaurant Le Manguier'),          debit: '650 000', credit: '',        solde: '1 380 000' },
];

// ── Active tab = Journal ──────────────────────────────────────────────────────
const ACTIVE_TAB = 'balance'; // journal | balance | grandlivre | rapprochement

export default function ElyonComptaBalance() {
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
              {t('Juin 2026')}
              <Icon i="chevron-down" size={12} />
            </div>
            <a className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#1a1a1a', border: `1px solid ${BORDER}` }}>
              <Icon i="bell" size={15} style={{ color: MUTED }} />
            </a>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold" style={{ background: MAGENTA, color: '#fff' }}>
              <Icon i="download" size={14} />
              {t('Exporter')}
            </button>
          </div>
        </div>

        {/* ── Onglets ── */}
        <div className="flex items-center gap-0 px-10" style={{ background: DARK2, borderBottom: `1px solid ${BORDER}` }}>
          {[
            { id: 'journal',        label: t('Journal') },
            { id: 'balance',        label: t('Balance') },
            { id: 'grandlivre',     label: t('Grand livre') },
            { id: 'rapprochement',  label: t('Rapprochement bancaire') },
          ].map((tab) => {
            const active = tab.id === ACTIVE_TAB;
            return (
              <button key={tab.id} className="px-6 py-4 text-sm font-medium relative" style={{
                color: active ? ROSE : MUTED,
                fontWeight: active ? '600' : '400',
                borderBottom: active ? `2px solid ${MAGENTA}` : '2px solid transparent',
                marginBottom: '-1px',
              }}>{tab.label}</button>
            );
          })}
        </div>

        {/* ── Contenu onglet Balance ── */}
        <div className="px-10 py-8 flex flex-col gap-6">

          {/* Bandeau équilibré */}
          <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl" style={{ background: '#22c55e14', border: `1px solid #22c55e33` }}>
            <Icon i="check-circle" size={18} style={{ color: GREEN }} />
            <p className="font-semibold" style={{ color: GREEN, fontSize: '14px' }}>{t('Balance équilibrée — Total Débit = Total Crédit = 6 230 000 FCFA')}</p>
          </div>

          {/* Tableau Balance */}
          <div className="rounded-2xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>

            {/* En-tête colonnes */}
            <div className="grid px-7 py-3.5" style={{ gridTemplateColumns: '70px 1.8fr 1fr 1fr 1fr 1fr', gap: '0 8px', borderBottom: `1px solid #2a2a2a` }}>
              {[t('Compte'), t('Intitulé'), t('Total Débit'), t('Total Crédit'), t('Solde Débiteur'), t('Solde Créditeur')].map((h, i) => (
                <p key={i} style={{ color: '#484848', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.07em', textAlign: i >= 2 ? 'right' : 'left' }}>{h}</p>
              ))}
            </div>

            {/* Lignes groupées par classe */}
            {(() => {
              let lastClasse = null;
              return balanceRows.map((row, i) => {
                const showSep = row.classe !== lastClasse;
                lastClasse = row.classe;
                return (
                  <div key={i}>
                    {showSep && (
                      <div className="px-7 py-2" style={{ background: '#161616', borderTop: i > 0 ? `1px solid #2a2a2a` : 'none' }}>
                        <p style={{ color: '#484848', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.09em' }}>{row.classe}</p>
                      </div>
                    )}
                    <div className="grid px-7 py-3.5 items-center" style={{ gridTemplateColumns: '70px 1.8fr 1fr 1fr 1fr 1fr', gap: '0 8px', borderBottom: i < balanceRows.length - 1 ? `1px solid #1a1a1a` : 'none' }}>
                      <p style={{ color: ROSE, fontSize: '13px', fontWeight: '700', fontFamily: 'monospace' }}>{row.compte}</p>
                      <p style={{ color: LIGHT, fontSize: '13px' }}>{row.intitule}</p>
                      <p style={{ color: MUTED, fontSize: '13px', textAlign: 'right', fontFamily: 'monospace' }}>{row.debit}</p>
                      <p style={{ color: MUTED, fontSize: '13px', textAlign: 'right', fontFamily: 'monospace' }}>{row.credit === '0' ? <span style={{ color: '#2e2e2e' }}>—</span> : row.credit}</p>
                      <p style={{ color: row.soldeD ? GREEN : '#2a2a2a', fontSize: '13px', fontWeight: row.soldeD ? '600' : '400', textAlign: 'right', fontFamily: 'monospace' }}>{row.soldeD || '—'}</p>
                      <p style={{ color: row.soldeC ? '#94a3b8' : '#2a2a2a', fontSize: '13px', textAlign: 'right', fontFamily: 'monospace' }}>{row.soldeC || '—'}</p>
                    </div>
                  </div>
                );
              });
            })()}

            {/* Ligne totaux */}
            <div className="grid px-7 py-4 items-center" style={{ gridTemplateColumns: '70px 1.8fr 1fr 1fr 1fr 1fr', gap: '0 8px', borderTop: `2px solid ${BORDER}`, background: '#1a1a1a', borderRadius: '0 0 16px 16px' }}>
              <p />
              <p className="font-bold text-xs uppercase tracking-widest" style={{ color: GOLD }}>{t('TOTAUX')}</p>
              <p className="font-bold text-right" style={{ color: GOLD, fontSize: '14px', fontFamily: 'monospace' }}>6 230 000</p>
              <p className="font-bold text-right" style={{ color: GOLD, fontSize: '14px', fontFamily: 'monospace' }}>6 230 000</p>
              <p className="font-bold text-right" style={{ color: GOLD, fontSize: '14px', fontFamily: 'monospace' }}>2 900 000</p>
              <p className="font-bold text-right" style={{ color: GOLD, fontSize: '14px', fontFamily: 'monospace' }}>2 900 000</p>
            </div>
          </div>

          {/* Cartes synthèse par classe */}
          <div className="grid grid-cols-4 gap-5">
            {[
              { label: t('Classe 4 — Tiers'),      soldeD: '650 000',   soldeC: '150 000',   icon: 'users',      color: '#3b82f6' },
              { label: t('Classe 5 — Trésorerie'), soldeD: '1 470 000', soldeC: '',          icon: 'landmark',   color: '#22c55e' },
              { label: t('Classe 6 — Charges'),    soldeD: '780 000',   soldeC: '',          icon: 'trending-down', color: RED },
              { label: t('Classe 7 — Produits'),   soldeD: '',          soldeC: '2 750 000', icon: 'trending-up', color: MAGENTA },
            ].map((cls, i) => (
              <div key={i} className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: cls.color + '1a' }}>
                    <Icon i={cls.icon} size={16} style={{ color: cls.color }} />
                  </div>
                  <p style={{ color: MUTED, fontSize: '11px', fontWeight: '600' }}>{cls.label}</p>
                </div>
                {cls.soldeD && (
                  <div className="mb-1">
                    <p style={{ color: '#484848', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>{t('Solde Débiteur')}</p>
                    <p className="font-bold font-headings" style={{ color: GREEN, fontSize: '18px', fontFamily: 'monospace' }}>{cls.soldeD}</p>
                    <p style={{ color: '#484848', fontSize: '10px' }}>FCFA</p>
                  </div>
                )}
                {cls.soldeC && (
                  <div className="mb-1">
                    <p style={{ color: '#484848', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>{t('Solde Créditeur')}</p>
                    <p className="font-bold font-headings" style={{ color: '#94a3b8', fontSize: '18px', fontFamily: 'monospace' }}>{cls.soldeC}</p>
                    <p style={{ color: '#484848', fontSize: '10px' }}>FCFA</p>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
