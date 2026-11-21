export const displayName = 'Elyon Créa — Assistant IA';
export const shortDescription = 'Back-office SaaS — Assistant IA conversationnel intégré au back-office';

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
      { icon: 'sparkles', label: t('Assistant IA'),    badge: t('NOUVEAU'), active: true },
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
      { icon: 'bar-chart-2', label: t('Comptabilité') },
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
const ACTIVE_TAB = 'rapprochement'; // unused on this screen — kept for data reuse only

export default function ElyonAssistantIA() {
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
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(168,85,247,0.15)', border: `1px solid rgba(168,85,247,0.3)` }}>
              <Icon i="sparkles" size={17} style={{ color: '#a855f7' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold font-headings" style={{ color: LIGHT }}>{t('Assistant IA')}</h1>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md" style={{ background: 'rgba(168,85,247,0.2)', color: '#a855f7' }}>{t('NOUVEAU')}</span>
              </div>
              <p style={{ color: MUTED, fontSize: '12px', marginTop: '2px' }}>{t('Posez vos questions, analysez vos données, obtenez des conseils — en langage naturel')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs" style={{ background: '#1a1a1a', border: `1px solid ${BORDER}`, color: MUTED }}>
              <Icon i="database" size={12} style={{ color: GREEN }} />
              {t('Connecté à vos données Juin 2026')}
            </div>
            <a className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#1a1a1a', border: `1px solid ${BORDER}` }}>
              <Icon i="bell" size={15} style={{ color: MUTED }} />
            </a>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold" style={{ background: '#1a1a1a', border: `1px solid ${BORDER}`, color: MUTED }}>
              <Icon i="plus" size={13} />
              {t('Nouvelle conversation')}
            </button>
          </div>
        </div>

        {/* ── Corps : sidebar historique + zone chat ── */}
        <div className="flex flex-1 gap-0">

          {/* Historique des conversations */}
          <div className="flex flex-col py-5 px-3 gap-1" style={{ minWidth: '240px', width: '240px', borderRight: `1px solid ${BORDER}`, background: '#161616' }}>
            <p style={{ color: MUTED, fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 8px', marginBottom: '8px' }}>{t('Conversations récentes')}</p>
            {[
              { label: t('Résumé financier Juin 2026'),       date: t('Aujourd\'hui'),  active: true },
              { label: t('Qui me doit encore de l\'argent ?'), date: t('Hier') },
              { label: t('Explique-moi la balance'),           date: t('22 juin') },
              { label: t('Analyse des charges du trimestre'),  date: t('18 juin') },
              { label: t('Prévision trésorerie juillet'),      date: t('15 juin') },
              { label: t('Vérification rapprochement mai'),    date: t('10 juin') },
            ].map((conv, i) => (
              <a key={i} className="px-3 py-3 rounded-xl" style={{
                background: conv.active ? 'rgba(168,85,247,0.12)' : 'transparent',
                border: `1px solid ${conv.active ? 'rgba(168,85,247,0.25)' : 'transparent'}`,
              }}>
                <p style={{ color: conv.active ? LIGHT : MUTED, fontSize: '12px', fontWeight: conv.active ? '600' : '400', lineHeight: 1.4, marginBottom: '3px' }}>{conv.label}</p>
                <p style={{ color: '#484848', fontSize: '10px' }}>{conv.date}</p>
              </a>
            ))}

            <div style={{ height: '1px', background: BORDER, margin: '12px 4px' }} />
            <p style={{ color: MUTED, fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 8px', marginBottom: '8px' }}>{t('Suggestions rapides')}</p>
            {[
              { icon: 'trending-up',   label: t('Résumé du mois') },
              { icon: 'users',         label: t('Clients en retard') },
              { icon: 'alert-triangle',label: t('Anomalies détectées') },
              { icon: 'landmark',      label: t('Solde de trésorerie') },
            ].map((s, i) => (
              <button key={i} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left" style={{ background: '#1a1a1a', border: `1px solid #222`, color: MUTED, fontSize: '12px', marginBottom: '4px' }}>
                <Icon i={s.icon} size={12} style={{ color: '#a855f7', flexShrink: 0 }} />
                {s.label}
              </button>
            ))}
          </div>

          {/* Zone conversation principale */}
          <div className="flex-1 flex flex-col" style={{ background: DARK }}>

            {/* Messages */}
            <div className="flex-1 px-10 py-8 flex flex-col gap-6">

              {/* Message IA d'accueil */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(168,85,247,0.15)', border: `1px solid rgba(168,85,247,0.3)` }}>
                  <Icon i="sparkles" size={16} style={{ color: '#a855f7' }} />
                </div>
                <div style={{ maxWidth: '680px' }}>
                  <p style={{ color: '#a855f7', fontSize: '11px', fontWeight: '700', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t('Assistant Elyon IA')}</p>
                  <div className="rounded-2xl rounded-tl-sm px-5 py-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                    <p style={{ color: LIGHT, fontSize: '14px', lineHeight: 1.6 }}>{t('Bonjour ! Je suis l\'assistant IA d\'Elyon Créa. Je suis connecté à toutes vos données de juin 2026 — journal comptable, factures, clients, trésorerie.')}</p>
                    <p style={{ color: MUTED, fontSize: '14px', lineHeight: 1.6, marginTop: '8px' }}>{t('Que souhaitez-vous savoir ? Vous pouvez me poser des questions en langage naturel.')}</p>
                  </div>
                </div>
              </div>

              {/* Message utilisateur */}
              <div className="flex items-start gap-3 flex-row-reverse">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm" style={{ background: MAGENTA, color: '#fff', flexShrink: 0 }}>DG</div>
                <div style={{ maxWidth: '600px' }}>
                  <p style={{ color: MUTED, fontSize: '11px', fontWeight: '700', marginBottom: '6px', textAlign: 'right', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t('Vous')}</p>
                  <div className="rounded-2xl rounded-tr-sm px-5 py-4" style={{ background: 'rgba(194,20,122,0.12)', border: `1px solid rgba(194,20,122,0.25)` }}>
                    <p style={{ color: LIGHT, fontSize: '14px', lineHeight: 1.6 }}>{t('Donne-moi un résumé de la situation financière de juin 2026.')}</p>
                  </div>
                </div>
              </div>

              {/* Réponse IA avec données structurées */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(168,85,247,0.15)', border: `1px solid rgba(168,85,247,0.3)` }}>
                  <Icon i="sparkles" size={16} style={{ color: '#a855f7' }} />
                </div>
                <div style={{ maxWidth: '780px' }}>
                  <p style={{ color: '#a855f7', fontSize: '11px', fontWeight: '700', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t('Assistant Elyon IA')}</p>
                  <div className="rounded-2xl rounded-tl-sm px-5 py-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                    <p style={{ color: LIGHT, fontSize: '14px', lineHeight: 1.6, marginBottom: '16px' }}>{t('Voici votre résumé financier pour juin 2026 :')}</p>

                    {/* KPIs inline */}
                    <div className="grid grid-cols-4 gap-3 mb-5">
                      {[
                        { label: t('CA facturé'),       value: '2 750 000', unit: 'FCFA', color: GREEN,     icon: 'trending-up' },
                        { label: t('Encaissé'),         value: '2 100 000', unit: 'FCFA', color: '#3b82f6', icon: 'landmark' },
                        { label: t('Charges'),          value: '780 000',   unit: 'FCFA', color: RED,       icon: 'trending-down' },
                        { label: t('Solde banque'),     value: '1 380 000', unit: 'FCFA', color: GREEN,     icon: 'building-2' },
                      ].map((k, i) => (
                        <div key={i} className="rounded-xl px-4 py-3" style={{ background: '#1a1a1a', border: `1px solid #2a2a2a` }}>
                          <div className="flex items-center gap-1.5 mb-2">
                            <Icon i={k.icon} size={12} style={{ color: k.color }} />
                            <p style={{ color: '#484848', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{k.label}</p>
                          </div>
                          <p className="font-bold font-headings" style={{ color: k.color, fontSize: '16px', fontFamily: 'monospace' }}>{k.value}</p>
                          <p style={{ color: '#484848', fontSize: '10px' }}>{k.unit}</p>
                        </div>
                      ))}
                    </div>

                    <p style={{ color: MUTED, fontSize: '13px', lineHeight: 1.7 }}>{t('✅ Juin est votre meilleur mois de trésorerie depuis janvier (+63% vs mai). Le taux de marge brute est de 78%.')}</p>
                    <p style={{ color: MUTED, fontSize: '13px', lineHeight: 1.7, marginTop: '6px' }}>{t('⚠️ Restaurant Le Manguier doit encore 650 000 FCFA (facture FAC-2026-0012, en retard de 28 jours). Je vous recommande une relance immédiate.')}</p>
                    <p style={{ color: MUTED, fontSize: '13px', lineHeight: 1.7, marginTop: '6px' }}>{t('⚠️ Des frais bancaires de 15 000 FCFA prélevés le 28 juin ne sont pas encore enregistrés dans le journal.')}</p>

                    <div className="flex items-center gap-2 mt-4 pt-4" style={{ borderTop: `1px solid #2a2a2a` }}>
                      <p style={{ color: '#484848', fontSize: '11px' }}>{t('Voulez-vous que je génère :')}</p>
                      {[t('Le rapport PDF du mois'), t('La relance pour Le Manguier'), t('L\'écriture des frais bancaires')].map((a, i) => (
                        <button key={i} className="text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background: 'rgba(168,85,247,0.1)', color: '#a855f7', border: `1px solid rgba(168,85,247,0.2)` }}>{a}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Message utilisateur 2 */}
              <div className="flex items-start gap-3 flex-row-reverse">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm" style={{ background: MAGENTA, color: '#fff' }}>DG</div>
                <div style={{ maxWidth: '600px' }}>
                  <p style={{ color: MUTED, fontSize: '11px', fontWeight: '700', marginBottom: '6px', textAlign: 'right', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t('Vous')}</p>
                  <div className="rounded-2xl rounded-tr-sm px-5 py-4" style={{ background: 'rgba(194,20,122,0.12)', border: `1px solid rgba(194,20,122,0.25)` }}>
                    <p style={{ color: LIGHT, fontSize: '14px', lineHeight: 1.6 }}>{t('Génère la relance pour Restaurant Le Manguier.')}</p>
                  </div>
                </div>
              </div>

              {/* Réponse IA — draft relance */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(168,85,247,0.15)', border: `1px solid rgba(168,85,247,0.3)` }}>
                  <Icon i="sparkles" size={16} style={{ color: '#a855f7' }} />
                </div>
                <div style={{ maxWidth: '780px' }}>
                  <p style={{ color: '#a855f7', fontSize: '11px', fontWeight: '700', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t('Assistant Elyon IA')}</p>
                  <div className="rounded-2xl rounded-tl-sm px-5 py-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                    <p style={{ color: MUTED, fontSize: '13px', marginBottom: '12px' }}>{t('Voici le brouillon de relance que j\'ai généré :')}</p>
                    <div className="rounded-xl px-5 py-4" style={{ background: '#161616', border: `1px solid #2a2a2a`, borderLeft: `3px solid rgba(168,85,247,0.6)` }}>
                      <p style={{ color: MUTED, fontSize: '11px', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t('Objet : Rappel de paiement — Facture FAC-2026-0012')}</p>
                      <p style={{ color: LIGHT, fontSize: '13px', lineHeight: 1.7 }}>{t('Bonjour,')}</p>
                      <p style={{ color: LIGHT, fontSize: '13px', lineHeight: 1.7, marginTop: '8px' }}>{t('Sauf erreur de notre part, la facture FAC-2026-0012 d\'un montant de 650 000 FCFA, émise le 04 juin 2026, n\'a pas encore été réglée à ce jour.')}</p>
                      <p style={{ color: LIGHT, fontSize: '13px', lineHeight: 1.7, marginTop: '8px' }}>{t('Nous vous remercions de bien vouloir procéder au règlement dans les meilleurs délais. Pour tout renseignement, n\'hésitez pas à nous contacter.')}</p>
                      <p style={{ color: LIGHT, fontSize: '13px', lineHeight: 1.7, marginTop: '8px' }}>{t('Cordialement,')}<br />{t('Elyon Créa')}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <button className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg" style={{ background: MAGENTA, color: '#fff' }}>
                        <Icon i="send" size={11} />
                        {t('Envoyer par email')}
                      </button>
                      <button className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg" style={{ background: '#1a1a1a', border: `1px solid ${BORDER}`, color: MUTED }}>
                        <Icon i="copy" size={11} />
                        {t('Copier le texte')}
                      </button>
                      <button className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg" style={{ background: '#1a1a1a', border: `1px solid ${BORDER}`, color: MUTED }}>
                        <Icon i="edit-2" size={11} />
                        {t('Modifier')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Zone de saisie */}
            <div className="px-10 py-5" style={{ borderTop: `1px solid ${BORDER}`, background: DARK2 }}>
              <div className="flex items-end gap-3 rounded-2xl px-5 py-4" style={{ background: CARD, border: `1px solid rgba(168,85,247,0.3)` }}>
                <div className="flex-1">
                  <div style={{ color: MUTED, fontSize: '14px' }}>{t('Posez une question ou demandez une action… (ex : Quelles factures sont impayées ? Génère mon bilan du mois.)')}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#1a1a1a', border: `1px solid ${BORDER}` }}>
                    <Icon i="paperclip" size={14} style={{ color: MUTED }} />
                  </button>
                  <button className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(168,85,247,0.15)', border: `1px solid rgba(168,85,247,0.3)` }}>
                    <Icon i="send" size={14} style={{ color: '#a855f7' }} />
                  </button>
                </div>
              </div>
              <p style={{ color: '#484848', fontSize: '11px', textAlign: 'center', marginTop: '8px' }}>{t('L\'IA accède uniquement à vos données Elyon Créa. Vos informations restent privées et sécurisées.')}</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
