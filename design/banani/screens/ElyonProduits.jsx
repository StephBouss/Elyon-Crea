export const displayName = 'Elyon Créa — Produits & Services';
export const shortDescription = 'Back-office SaaS — catalogue filtré par catégorie avec CA détaillé';

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
      { icon: 'package',       label: t('Produits & Services'), active: true },
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

const products = [
  { icon: 'palette',       category: t('Design'),         name: t('Identité visuelle complète'),      desc: t('Logo, charte graphique, déclinaisons'), prix: '350 000', unite: t('forfait'), actif: true,  vendu: 12 },
  { icon: 'globe',         category: t('Web'),            name: t('Site web vitrine'),                 desc: t('Design + développement, 5 pages'),     prix: '480 000', unite: t('forfait'), actif: true,  vendu: 9  },
  { icon: 'smartphone',    category: t('Web'),            name: t('Site web e-commerce'),              desc: t('Boutique en ligne complète'),           prix: '750 000', unite: t('forfait'), actif: true,  vendu: 4  },
  { icon: 'instagram',     category: t('Social Media'),   name: t('Pack réseaux sociaux'),             desc: t('Stratégie + 12 visuels / mois'),        prix: '150 000', unite: t('/ mois'),  actif: true,  vendu: 7  },
  { icon: 'camera',        category: t('Photo / Vidéo'), name: t('Shooting photo professionnel'),     desc: t('Demi-journée, retouches incluses'),     prix: '120 000', unite: t('session'), actif: true,  vendu: 15 },
  { icon: 'film',          category: t('Photo / Vidéo'), name: t('Vidéo institutionnelle'),           desc: t('Tournage + montage, 2-3 min'),          prix: '380 000', unite: t('forfait'), actif: false, vendu: 3  },
  { icon: 'printer',       category: t('Print'),          name: t('Pack brochure & flyers'),           desc: t('Conception + fichiers print-ready'),    prix: '80 000',  unite: t('forfait'), actif: true,  vendu: 21 },
  { icon: 'megaphone',     category: t('Communication'), name: t('Campagne publicitaire digitale'),   desc: t('Meta Ads + Google Ads, 1 mois'),        prix: '200 000', unite: t('/ mois'),  actif: false, vendu: 2  },
  { icon: 'layout',        category: t('Design'),         name: t('Présentation PowerPoint pro'),      desc: t('Template sur-mesure, 20 slides max'),  prix: '60 000',  unite: t('forfait'), actif: true,  vendu: 8  },
];

// CA par catégorie (prix × ventes pour chaque service)
// Design: Identité visuelle 350 000×12 + PowerPoint 60 000×8 = 4 680 000
const designCA    = 350000*12 + 60000*8;   // 4 680 000
const designVendu = 12 + 8;                // 20
const designMoy   = Math.round(designCA / designVendu); // 234 000

const designProducts = products.filter(p => p.category === t('Design'));

// Filtre actif = Design
const ACTIVE_CAT = t('Design');
const CATEGORIES = [t('Tous'), t('Design'), t('Web'), t('Social Media'), t('Photo / Vidéo'), t('Print'), t('Communication')];

export default function ElyonProduits() {
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
            <h1 className="text-xl font-bold font-headings" style={{ color: LIGHT }}>{t('Produits & Services')}</h1>
            <p style={{ color: MUTED, fontSize: '12px', marginTop: '2px' }}>{t('Accueil')} <span style={{ color: '#3a3a3a' }}>›</span> {t('Produits & Services')}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm" style={{ background: '#1a1a1a', border: `1px solid ${BORDER}`, color: MUTED, width: '240px' }}>
              <Icon i="search" size={13} />
              {t('Rechercher un service…')}
            </div>
            <a className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#1a1a1a', border: `1px solid ${BORDER}` }}>
              <Icon i="bell" size={15} style={{ color: MUTED }} />
            </a>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold" style={{ background: MAGENTA, color: '#fff' }}>
              <Icon i="plus" size={14} />
              {t('Nouveau service')}
            </button>
          </div>
        </div>

        {/* Page content */}
        <div className="px-10 py-10 flex flex-col gap-8">

          {/* Filters row — AVANT les KPIs pour que le contexte soit clair */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {CATEGORIES.map((f, i) => {
                const isActive = f === ACTIVE_CAT;
                return (
                  <button key={i} className="px-4 py-2 rounded-lg text-xs font-medium" style={{
                    background: isActive ? 'rgba(194,20,122,0.15)' : '#1a1a1a',
                    color:      isActive ? '#e87ec0' : MUTED,
                    border:     `1px solid ${isActive ? 'rgba(194,20,122,0.3)' : BORDER}`,
                  }}>{f}</button>
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs" style={{ background: '#1a1a1a', border: `1px solid ${BORDER}`, color: MUTED }}>
                <Icon i="arrow-up-down" size={12} />
                {t('Trier par ventes')}
              </div>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium" style={{ background: '#1a1a1a', border: `1px solid ${BORDER}`, color: MUTED }}>
                <Icon i="download" size={12} />
                {t('Exporter')}
              </button>
            </div>
          </div>

          {/* KPI row — contextualisés sur la catégorie "Design" */}
          <div className="grid grid-cols-4 gap-5">
            {/* KPI 1 — Références dans la catégorie */}
            <div className="rounded-2xl p-6" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: '#3b82f61a' }}>
                <Icon i="package" size={20} style={{ color: '#3b82f6' }} />
              </div>
              <p style={{ color: MUTED, fontSize: '12px', marginBottom: '6px' }}>{t('Références Design')}</p>
              <p className="font-bold font-headings" style={{ color: LIGHT, fontSize: '22px', lineHeight: 1.1 }}>{designProducts.length}</p>
              <p style={{ color: '#484848', fontSize: '11px', marginTop: '2px' }}>{t('dans la catégorie')}</p>
            </div>
            {/* KPI 2 — CA total Design */}
            <div className="rounded-2xl p-6" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: MAGENTA + '1a' }}>
                <Icon i="bar-chart-2" size={20} style={{ color: MAGENTA }} />
              </div>
              <p style={{ color: MUTED, fontSize: '12px', marginBottom: '6px' }}>{t('CA total Design')}</p>
              <p className="font-bold font-headings" style={{ color: LIGHT, fontSize: '22px', lineHeight: 1.1 }}>{(designCA / 1000000).toFixed(2).replace('.', ',')} M</p>
              <p style={{ color: '#484848', fontSize: '11px', marginTop: '2px' }}>FCFA {t('générés')}</p>
            </div>
            {/* KPI 3 — Ventes totales Design */}
            <div className="rounded-2xl p-6" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: '#22c55e1a' }}>
                <Icon i="shopping-bag" size={20} style={{ color: '#22c55e' }} />
              </div>
              <p style={{ color: MUTED, fontSize: '12px', marginBottom: '6px' }}>{t('Ventes Design')}</p>
              <p className="font-bold font-headings" style={{ color: LIGHT, fontSize: '22px', lineHeight: 1.1 }}>{designVendu}</p>
              <p style={{ color: '#484848', fontSize: '11px', marginTop: '2px' }}>{t('prestations vendues')}</p>
            </div>
            {/* KPI 4 — CA moyen par vente Design */}
            <div className="rounded-2xl p-6" style={{ background: CARD, border: `1px solid ${BORDER}`, outline: `1.5px solid rgba(194,20,122,0.35)` }}>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: GOLD + '1a' }}>
                  <Icon i="trending-up" size={20} style={{ color: GOLD }} />
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md" style={{ background: 'rgba(194,20,122,0.15)', color: '#e87ec0' }}>{t('Design')}</span>
              </div>
              <p style={{ color: MUTED, fontSize: '12px', marginBottom: '6px' }}>{t('CA moyen / vente')}</p>
              <p className="font-bold font-headings" style={{ color: LIGHT, fontSize: '22px', lineHeight: 1.1 }}>{designMoy.toLocaleString('fr-FR')} <span style={{ color: '#484848', fontSize: '13px', fontWeight: '400' }}>FCFA</span></p>
              <p style={{ color: '#484848', fontSize: '11px', marginTop: '2px' }}>{t('par prestation design')}</p>
            </div>
          </div>

          {/* Bandeau récapitulatif catégorie */}
          <div className="rounded-xl px-6 py-4 flex items-center gap-6" style={{ background: 'rgba(194,20,122,0.07)', border: `1px solid rgba(194,20,122,0.2)` }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(194,20,122,0.15)' }}>
              <Icon i="palette" size={18} style={{ color: '#e87ec0' }} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold" style={{ color: LIGHT }}>{t('Catégorie Design — vue filtrée')}</p>
              <p style={{ color: MUTED, fontSize: '12px' }}>{t('Affichage des')} {designProducts.length} {t('services Design uniquement. Le CA total de cette catégorie représente')} <span style={{ color: '#e87ec0', fontWeight: '600' }}>{((designCA / (2570000)) * 100).toFixed(0)}%</span> {t('du CA global du catalogue.')}</p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="text-right">
                <p style={{ color: '#484848', fontSize: '11px' }}>{t('CA global catalogue')}</p>
                <p className="font-semibold" style={{ color: MUTED, fontSize: '13px' }}>2 570 000 FCFA</p>
              </div>
              <div style={{ width: '1px', height: '32px', background: BORDER }} />
              <div className="text-right">
                <p style={{ color: '#484848', fontSize: '11px' }}>{t('CA Design')}</p>
                <p className="font-semibold" style={{ color: '#e87ec0', fontSize: '13px' }}>{(designCA / 1000).toLocaleString('fr-FR')} 000 FCFA</p>
              </div>
            </div>
          </div>

          {/* Products table — filtrée Design */}
          <div className="rounded-2xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            {/* Header */}
            <div className="grid px-7 py-4" style={{ gridTemplateColumns: '2.4fr 1.2fr 1fr 0.8fr 1fr 140px', borderBottom: `1px solid ${BORDER}` }}>
              {[t('Service'), t('Catégorie'), t('Prix unitaire'), t('Ventes'), t('CA généré'), t('Statut')].map((h, i) => (
                <p key={i} style={{ color: '#484848', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</p>
              ))}
            </div>
            {/* Rows — seulement Design */}
            {designProducts.map((p, i) => {
              const caService = parseInt(p.prix.replace(' ', '')) * p.vendu;
              const pct = Math.round(caService / designCA * 100);
              return (
                <div key={i} className="grid px-7 py-5 items-center" style={{ gridTemplateColumns: '2.4fr 1.2fr 1fr 0.8fr 1fr 140px', borderBottom: i < designProducts.length - 1 ? `1px solid #1e1e1e` : 'none' }}>
                  {/* Nom */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(194,20,122,0.15)', border: `1px solid rgba(194,20,122,0.25)` }}>
                      <Icon i={p.icon} size={15} style={{ color: '#e87ec0' }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: LIGHT }}>{p.name}</p>
                      <p style={{ color: '#484848', fontSize: '11px' }}>{p.desc}</p>
                    </div>
                  </div>
                  {/* Catégorie */}
                  <span className="text-xs font-medium px-2.5 py-1 rounded-md" style={{ background: 'rgba(194,20,122,0.1)', color: '#e87ec0', border: `1px solid rgba(194,20,122,0.2)`, display: 'inline-block' }}>{p.category}</span>
                  {/* Prix */}
                  <p className="text-sm font-semibold" style={{ color: LIGHT }}>{p.prix} <span style={{ color: '#484848', fontWeight: '400', fontSize: '11px' }}>FCFA</span></p>
                  {/* Ventes */}
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold" style={{ color: LIGHT }}>{p.vendu}</p>
                    <div className="rounded-full" style={{ width: '36px', height: '4px', background: MAGENTA + '30' }}>
                      <div className="rounded-full h-full" style={{ width: `${p.vendu / designVendu * 100}%`, background: MAGENTA }} />
                    </div>
                  </div>
                  {/* CA généré + % */}
                  <div>
                    <p className="text-sm font-semibold" style={{ color: LIGHT }}>{(caService / 1000).toLocaleString('fr-FR')} 000 <span style={{ color: '#484848', fontWeight: '400', fontSize: '11px' }}>FCFA</span></p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="rounded-full" style={{ height: '3px', width: `${pct * 1.2}px`, background: GOLD + 'aa' }}>
                        <div className="rounded-full h-full" style={{ width: `${pct}%`, background: GOLD }} />
                      </div>
                      <p style={{ color: GOLD, fontSize: '10px', fontWeight: '600' }}>{pct}%</p>
                    </div>
                  </div>
                  {/* Statut */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: '#22c55e1a', color: '#22c55e' }}>{t('Actif')}</span>
                    <button className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: '#222', border: `1px solid #333` }}>
                      <Icon i="pencil" size={11} style={{ color: MUTED }} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
