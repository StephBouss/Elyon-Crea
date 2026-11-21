export const displayName = 'Elyon Créa — Comptabilité (Rapprochement bancaire)';
export const shortDescription = 'Back-office SaaS — onglet Rapprochement bancaire Juin 2026';

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
const ACTIVE_TAB = 'rapprochement'; // journal | balance | grandlivre | rapprochement

export default function ElyonComptaRapprochement() {
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

        {/* ── Contenu onglet Rapprochement bancaire ── */}
        <div className="px-10 py-8 flex flex-col gap-7">

          {/* Deux cartes soldes + badge écart */}
          <div className="flex items-stretch gap-5">
            {/* Solde comptable */}
            <div className="flex-1 rounded-2xl p-7 flex flex-col justify-between" style={{ background: '#0f1f12', border: `1px solid #22c55e33` }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#22c55e1a' }}>
                  <Icon i="book" size={16} style={{ color: GREEN }} />
                </div>
                <p style={{ color: '#6b7280', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{t('Solde selon la comptabilité (521)')}</p>
              </div>
              <div>
                <p className="font-bold font-headings" style={{ color: GREEN, fontSize: '32px', lineHeight: 1, fontFamily: 'monospace' }}>1 380 000</p>
                <p style={{ color: '#484848', fontSize: '12px', marginTop: '4px' }}>FCFA</p>
              </div>
              <p style={{ color: '#484848', fontSize: '11px', marginTop: '16px' }}>{t('Solde du compte 521 — Grand Livre Juin 2026')}</p>
            </div>

            {/* Badge écart central */}
            <div className="flex flex-col items-center justify-center gap-3 flex-shrink-0 px-2">
              <div className="w-px flex-1" style={{ background: BORDER }} />
              <div className="flex flex-col items-center gap-2">
                <Icon i="git-compare" size={18} style={{ color: '#484848' }} />
                <span className="px-4 py-2 rounded-xl text-xs font-bold text-center" style={{ background: 'rgba(249,176,0,0.12)', color: GOLD, border: `1px solid rgba(249,176,0,0.3)`, whiteSpace: 'nowrap' }}>
                  {t('Écart')} : 25 000 FCFA
                </span>
                <p style={{ color: '#484848', fontSize: '10px', textAlign: 'center' }}>{t('à justifier')}</p>
              </div>
              <div className="w-px flex-1" style={{ background: BORDER }} />
            </div>

            {/* Solde relevé */}
            <div className="flex-1 rounded-2xl p-7 flex flex-col justify-between" style={{ background: '#0e1520', border: `1px solid #3b82f633` }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#3b82f61a' }}>
                  <Icon i="landmark" size={16} style={{ color: '#3b82f6' }} />
                </div>
                <p style={{ color: '#6b7280', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{t('Solde selon le relevé bancaire')}</p>
              </div>
              <div>
                <p className="font-bold font-headings" style={{ color: '#3b82f6', fontSize: '32px', lineHeight: 1, fontFamily: 'monospace' }}>1 355 000</p>
                <p style={{ color: '#484848', fontSize: '12px', marginTop: '4px' }}>FCFA</p>
              </div>
              <p style={{ color: '#484848', fontSize: '11px', marginTop: '16px' }}>{t('Relevé importé — Banque UGB Juin 2026')}</p>
            </div>
          </div>

          {/* Ligne principale : éléments + synthèse + pointage */}
          <div className="flex gap-5 items-start">

            {/* Éléments de rapprochement */}
            <div className="rounded-2xl flex-1" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="px-6 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
                <p className="text-sm font-semibold" style={{ color: LIGHT }}>{t('Éléments de rapprochement')}</p>
                <p style={{ color: '#484848', fontSize: '11px', marginTop: '2px' }}>{t('Différences à expliquer entre comptabilité et relevé')}</p>
              </div>
              {/* En-tête */}
              <div className="grid px-6 py-3" style={{ gridTemplateColumns: '1fr 140px 100px', gap: '0 8px', borderBottom: `1px solid #2a2a2a` }}>
                {[t('Libellé'), t('Type'), t('Montant')].map((h, i) => (
                  <p key={i} style={{ color: '#484848', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.07em', textAlign: i === 2 ? 'right' : 'left' }}>{h}</p>
                ))}
              </div>
              {[
                { libelle: t('Frais de tenue de compte (prélevés, non saisis)'),                    type: t('à enregistrer en compta'), montant: '−15 000', typeColor: '#f59e0b' },
                { libelle: t('Chèque client en cours d\'encaissement (saisi, pas encore crédité)'), type: t('en attente banque'),        montant: '−10 000', typeColor: '#3b82f6' },
              ].map((el, i) => (
                <div key={i} className="grid px-6 py-4 items-start" style={{ gridTemplateColumns: '1fr 140px 100px', gap: '0 8px', borderBottom: i === 0 ? `1px solid #1e1e1e` : 'none' }}>
                  <p style={{ color: LIGHT, fontSize: '13px' }}>{el.libelle}</p>
                  <span className="text-xs font-semibold px-2 py-1 rounded-md inline-block" style={{ background: el.typeColor + '18', color: el.typeColor, border: `1px solid ${el.typeColor}33`, whiteSpace: 'nowrap' }}>{el.type}</span>
                  <p className="font-bold text-right" style={{ color: RED, fontFamily: 'monospace', fontSize: '13px' }}>{el.montant} FCFA</p>
                </div>
              ))}
            </div>

            {/* Bloc synthèse calcul */}
            <div className="rounded-2xl flex-1" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="px-6 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
                <p className="text-sm font-semibold" style={{ color: LIGHT }}>{t('Synthèse du rapprochement')}</p>
                <p style={{ color: '#484848', fontSize: '11px', marginTop: '2px' }}>{t('Calcul du solde rapproché')}</p>
              </div>
              <div className="px-6 py-5 flex flex-col gap-3">
                {[
                  { label: t('Solde comptable (521)'),              montant: '1 380 000', color: LIGHT,   weight: '400', dots: true },
                  { label: t('− Frais bancaires à enregistrer'),    montant: '−15 000',   color: RED,     weight: '400', dots: true },
                  { label: t('− Chèque en cours d\'encaissement'),  montant: '−10 000',   color: RED,     weight: '400', dots: true },
                ].map((l, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1">
                      <p style={{ color: MUTED, fontSize: '13px' }}>{l.label}</p>
                      <div className="flex-1 border-b border-dashed" style={{ borderColor: '#2a2a2a', marginTop: '2px' }} />
                    </div>
                    <p style={{ color: l.color, fontSize: '13px', fontFamily: 'monospace', fontWeight: l.weight, marginLeft: '12px' }}>{l.montant} FCFA</p>
                  </div>
                ))}

                {/* Séparateur = */}
                <div style={{ borderTop: `2px solid ${BORDER}`, paddingTop: '12px', marginTop: '4px' }}>
                  <div className="flex items-center justify-between">
                    <p className="font-bold" style={{ color: LIGHT, fontSize: '14px' }}>{t('= Solde rapproché')}</p>
                    <p className="font-bold" style={{ color: GREEN, fontSize: '18px', fontFamily: 'monospace' }}>1 355 000 FCFA</p>
                  </div>
                </div>

                {/* Bandeau OK */}
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl mt-2" style={{ background: '#22c55e12', border: `1px solid #22c55e2e` }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#22c55e22' }}>
                    <Icon i="check" size={13} style={{ color: GREEN }} />
                  </div>
                  <p style={{ color: GREEN, fontSize: '12px', fontWeight: '600' }}>{t('Solde rapproché = Solde du relevé → Rapprochement OK')}</p>
                </div>
              </div>
            </div>

            {/* Pointage opérations */}
            <div className="rounded-2xl" style={{ background: CARD, border: `1px solid ${BORDER}`, minWidth: '240px' }}>
              <div className="px-6 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
                <p className="text-sm font-semibold" style={{ color: LIGHT }}>{t('Pointage des opérations')}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span style={{ color: GREEN, fontSize: '11px', fontWeight: '600' }}>6 {t('pointées')}</span>
                  <span style={{ color: '#484848', fontSize: '10px' }}>·</span>
                  <span style={{ color: '#f59e0b', fontSize: '11px' }}>2 {t('en attente')}</span>
                </div>
              </div>
              {[
                { label: t('ENC-0009 — Boutique Élégance'),    pointed: true },
                { label: t('ENC-0012 — Acompte Le Manguier'),  pointed: true },
                { label: t('PAY-0021 — Règl. fournisseurs'),   pointed: true },
                { label: t('ENC-0014 — Clinique Okoumé'),       pointed: true },
                { label: t('ENC-0016 — BTP Ogooué'),           pointed: true },
                { label: t('ENC-0018 — Solde Le Manguier'),    pointed: true },
                { label: t('Frais tenue de compte'),           pointed: false },
                { label: t('Chèque en cours'),                 pointed: false },
              ].map((op, i) => (
                <div key={i} className="flex items-center gap-3 px-6 py-3" style={{ borderBottom: i < 7 ? `1px solid #1a1a1a` : 'none' }}>
                  <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0" style={{ background: op.pointed ? '#22c55e1a' : '#222', border: `1.5px solid ${op.pointed ? GREEN : '#3a3a3a'}` }}>
                    {op.pointed && <Icon i="check" size={10} style={{ color: GREEN }} />}
                  </div>
                  <p style={{ color: op.pointed ? MUTED : '#555', fontSize: '12px' }}>{op.label}</p>
                  {!op.pointed && <span className="ml-auto text-xs font-semibold" style={{ color: '#f59e0b' }}>{t('⏳')}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex items-center gap-3 pt-2">
            <button className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold" style={{ background: '#1a1a1a', border: `1px solid ${BORDER}`, color: MUTED }}>
              <Icon i="file-plus" size={14} />
              {t('Enregistrer les frais bancaires')}
            </button>
            <button className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold" style={{ background: '#1a1a1a', border: `1px solid ${BORDER}`, color: MUTED }}>
              <Icon i="upload" size={14} />
              {t('Importer un relevé')}
            </button>
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold ml-auto" style={{ background: MAGENTA, color: '#fff' }}>
              <Icon i="check-circle" size={15} />
              {t('Valider le rapprochement')}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
