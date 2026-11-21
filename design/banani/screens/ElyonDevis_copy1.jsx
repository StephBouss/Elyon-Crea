export const displayName = 'Elyon Créa — Nouveau Devis (Modal)';
export const shortDescription = 'Modal de création de devis avec prévisualisation temps réel';

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
      { icon: 'file-text',   label: t('Devis'), active: true },
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

const services = [
  { label: t('Identité visuelle complète'), prix: '350 000', selected: true },
  { label: t('Création de site web vitrine'), prix: '480 000', selected: true },
  { label: t('Stratégie réseaux sociaux'), prix: '150 000', selected: false },
  { label: t('Shooting photo professionnel'), prix: '120 000', selected: true },
  { label: t('Pack brochure & flyers'), prix: '80 000', selected: false },
];

const selectedServices = services.filter(s => s.selected);
const subtotal = selectedServices.reduce((acc, s) => acc + parseInt(s.prix.replace(' ', '')), 0);
const tva = Math.round(subtotal * 0.18);
const total = subtotal + tva;
const fmt = (n) => n.toLocaleString('fr-FR').replace(',', ' ');

export default function ElyonDevisModal() {
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

      {/* ── Main (dimmed) ── */}
      <div className="flex-1 flex flex-col relative" style={{ filter: 'brightness(0.35)' }}>
        <div className="flex items-center justify-between px-10 py-5" style={{ background: DARK2, borderBottom: `1px solid ${BORDER}` }}>
          <div>
            <h1 className="text-xl font-bold font-headings" style={{ color: LIGHT }}>{t('Devis')}</h1>
            <p style={{ color: MUTED, fontSize: '12px' }}>{t('Accueil')} › {t('Devis')}</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold" style={{ background: MAGENTA, color: '#fff' }}>
            <Icon i="plus" size={14} />
            {t('Nouveau devis')}
          </button>
        </div>
        <div className="px-10 py-10" style={{ color: MUTED, fontSize: '13px' }}>{t('Contenu de la page en arrière-plan…')}</div>
      </div>

      {/* ── Modal overlay ── */}
      <div className="absolute inset-0 flex items-start justify-center" style={{ paddingTop: '40px', paddingBottom: '40px', left: '220px' }}>
        <div className="flex gap-5 w-full" style={{ maxWidth: '1160px', alignItems: 'flex-start' }}>

          {/* ── Left panel: formulaire ── */}
          <div className="flex flex-col rounded-2xl" style={{ background: '#181818', border: `1px solid #383838`, width: '560px', minWidth: '560px' }}>

            {/* Modal header */}
            <div className="flex items-center justify-between px-7 py-5" style={{ borderBottom: `1px solid #282828` }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(194,20,122,0.15)' }}>
                  <Icon i="file-plus" size={16} style={{ color: MAGENTA }} />
                </div>
                <div>
                  <p className="font-bold text-sm font-headings" style={{ color: LIGHT }}>{t('Nouveau devis')}</p>
                  <p style={{ color: MUTED, fontSize: '11px' }}>{t('Réf. auto : DEV-2025-019')}</p>
                </div>
              </div>
              <a style={{ color: MUTED }}>
                <Icon i="x" size={18} />
              </a>
            </div>

            {/* Tabs */}
            <div className="flex" style={{ borderBottom: `1px solid #282828` }}>
              {[
                { icon: 'user', label: t('Client'), active: true },
                { icon: 'file-text', label: t('Objet & Services'), active: false },
                { icon: 'settings-2', label: t('Conditions'), active: false },
              ].map((tab, i) => (
                <button key={i} className="flex items-center gap-2 px-5 py-3 text-xs font-semibold" style={{
                  borderBottom: tab.active ? `2px solid ${MAGENTA}` : '2px solid transparent',
                  color: tab.active ? '#e87ec0' : MUTED,
                  background: 'transparent',
                  marginBottom: '-1px',
                }}>
                  <Icon i={tab.icon} size={13} />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="px-7 py-6 flex flex-col gap-5">

              {/* Section: Sélection client */}
              <div>
                <p className="text-xs font-semibold mb-3" style={{ color: '#555', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t('SÉLECTION DU CLIENT')}</p>

                {/* Toggle client existant / nouveau */}
                <div className="flex gap-2 mb-4">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold" style={{ background: 'rgba(194,20,122,0.15)', color: '#e87ec0', border: `1px solid rgba(194,20,122,0.3)` }}>
                    <Icon i="users" size={12} />
                    {t('Client existant')}
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold" style={{ background: '#222', color: MUTED, border: `1px solid #333` }}>
                    <Icon i="user-plus" size={12} />
                    {t('Nouveau client')}
                  </button>
                </div>

                {/* Champ client sélectionné */}
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-3" style={{ background: '#222', border: `1px solid #383838` }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'rgba(194,20,122,0.2)', color: '#e87ec0' }}>OG</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: LIGHT }}>Olam Gabon</p>
                    <p style={{ color: MUTED, fontSize: '11px' }}>contact@olamgabon.com · Libreville</p>
                  </div>
                  <Icon i="chevron-down" size={14} style={{ color: MUTED }} />
                </div>

                {/* Adresse facturation */}
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg" style={{ background: '#1e1e1e', border: `1px solid #2a2a2a` }}>
                  <Icon i="map-pin" size={12} style={{ color: MUTED }} />
                  <p style={{ color: MUTED, fontSize: '12px' }}>BP 2185, Libreville, Gabon</p>
                </div>
              </div>

              {/* Séparateur */}
              <div style={{ borderTop: `1px solid #252525` }} />

              {/* Section: Objet */}
              <div>
                <p className="text-xs font-semibold mb-3" style={{ color: '#555', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t('OBJET DU DEVIS')}</p>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: '#222', border: `1px solid #383838` }}>
                  <Icon i="pencil" size={13} style={{ color: MUTED }} />
                  <p style={{ color: LIGHT, fontSize: '13px' }}>{t('Refonte identité visuelle & site web')}</p>
                </div>
              </div>

              {/* Section: Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs mb-2" style={{ color: MUTED }}>{t('Date d\'émission')}</p>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg" style={{ background: '#222', border: `1px solid #383838` }}>
                    <Icon i="calendar" size={12} style={{ color: MUTED }} />
                    <p style={{ color: LIGHT, fontSize: '12px' }}>15 mai 2025</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs mb-2" style={{ color: MUTED }}>{t('Valable jusqu\'au')}</p>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg" style={{ background: '#222', border: `1px solid #383838` }}>
                    <Icon i="calendar" size={12} style={{ color: MUTED }} />
                    <p style={{ color: LIGHT, fontSize: '12px' }}>14 juin 2025</p>
                  </div>
                </div>
              </div>

              {/* Séparateur */}
              <div style={{ borderTop: `1px solid #252525` }} />

              {/* Section: Services */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold" style={{ color: '#555', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t('SERVICES')}</p>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: 'rgba(194,20,122,0.12)', color: '#e87ec0', border: `1px solid rgba(194,20,122,0.2)` }}>
                    <Icon i="plus" size={11} />
                    {t('Ajouter')}
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  {services.map((s, i) => (
                    <div key={i} className="flex items-center gap-3 px-3 py-3 rounded-xl" style={{ background: s.selected ? 'rgba(194,20,122,0.07)' : '#1e1e1e', border: `1px solid ${s.selected ? 'rgba(194,20,122,0.2)' : '#262626'}` }}>
                      {/* Checkbox */}
                      <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0" style={{ background: s.selected ? MAGENTA : 'transparent', border: s.selected ? `none` : `1px solid #444` }}>
                        {s.selected && <Icon i="check" size={10} style={{ color: '#fff' }} />}
                      </div>
                      <p className="flex-1 text-sm" style={{ color: s.selected ? LIGHT : MUTED }}>{s.label}</p>
                      <p className="text-xs font-semibold" style={{ color: s.selected ? '#e87ec0' : '#484848' }}>{s.prix} FCFA</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <p className="text-xs mb-2" style={{ color: MUTED }}>{t('Note interne (optionnel)')}</p>
                <div className="px-4 py-3 rounded-xl" style={{ background: '#1e1e1e', border: `1px solid #2a2a2a`, minHeight: '56px' }}>
                  <p style={{ color: '#484848', fontSize: '12px' }}>{t('Ajouter une note…')}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-7 py-5" style={{ borderTop: `1px solid #252525` }}>
              <button className="px-5 py-2.5 rounded-lg text-sm font-semibold" style={{ background: '#222', color: MUTED, border: `1px solid #333` }}>
                {t('Annuler')}
              </button>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold" style={{ background: '#222', color: LIGHT, border: `1px solid #383838` }}>
                  <Icon i="save" size={13} />
                  {t('Enregistrer brouillon')}
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold" style={{ background: MAGENTA, color: '#fff' }}>
                  <Icon i="send" size={13} />
                  {t('Envoyer le devis')}
                </button>
              </div>
            </div>
          </div>

          {/* ── Right panel: prévisualisation ── */}
          <div className="flex-1 flex flex-col rounded-2xl" style={{ background: '#181818', border: `1px solid #383838` }}>

            {/* Preview header */}
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: `1px solid #252525` }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: '#22c55e' }} />
                <p className="text-xs font-semibold" style={{ color: MUTED }}>{t('Aperçu en temps réel')}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs" style={{ background: '#222', border: `1px solid #333`, color: MUTED }}>
                  <Icon i="printer" size={11} />
                  {t('Imprimer')}
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs" style={{ background: '#222', border: `1px solid #333`, color: MUTED }}>
                  <Icon i="download" size={11} />
                  PDF
                </button>
              </div>
            </div>

            {/* Preview document */}
            <div className="flex-1 px-7 py-7">

              {/* Document blanc simulé */}
              <div className="rounded-xl px-8 py-8 flex flex-col gap-5" style={{ background: '#fafafa', minHeight: '700px' }}>

                {/* En-tête doc */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-md flex items-center justify-center font-bold text-sm" style={{ background: MAGENTA, color: '#fff' }}>EC</div>
                      <div>
                        <p className="font-bold text-sm" style={{ color: '#111' }}>Elyon Créa</p>
                        <p style={{ color: '#888', fontSize: '10px' }}>Agence créative & digitale</p>
                      </div>
                    </div>
                    <p style={{ color: '#999', fontSize: '10px' }}>BP 1234, Libreville, Gabon</p>
                    <p style={{ color: '#999', fontSize: '10px' }}>contact@elyoncrea.com · +241 77 00 00 00</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold font-headings" style={{ color: '#111', fontSize: '20px' }}>{t('DEVIS')}</p>
                    <p className="font-semibold" style={{ color: MAGENTA, fontSize: '13px' }}>DEV-2025-019</p>
                    <div className="mt-2">
                      <p style={{ color: '#888', fontSize: '10px' }}>{t('Émis le')} : 15 mai 2025</p>
                      <p style={{ color: '#888', fontSize: '10px' }}>{t('Valable jusqu\'au')} : 14 juin 2025</p>
                    </div>
                  </div>
                </div>

                {/* Séparateur */}
                <div style={{ borderTop: `2px solid ${MAGENTA}`, opacity: 0.25 }} />

                {/* Destinataire */}
                <div className="flex gap-8">
                  <div>
                    <p style={{ color: '#999', fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{t('Destinataire')}</p>
                    <p className="font-bold" style={{ color: '#111', fontSize: '13px' }}>Olam Gabon</p>
                    <p style={{ color: '#888', fontSize: '11px' }}>contact@olamgabon.com</p>
                    <p style={{ color: '#888', fontSize: '11px' }}>BP 2185, Libreville, Gabon</p>
                  </div>
                  <div>
                    <p style={{ color: '#999', fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{t('Objet')}</p>
                    <p className="font-semibold" style={{ color: '#111', fontSize: '13px' }}>{t('Refonte identité visuelle & site web')}</p>
                  </div>
                </div>

                {/* Tableau services */}
                <div>
                  {/* En-tête tableau */}
                  <div className="grid px-3 py-2 rounded-t-lg" style={{ gridTemplateColumns: '3fr 1fr 1fr', background: '#111' }}>
                    {[t('Désignation'), t('Qté'), t('Montant HT')].map((h, i) => (
                      <p key={i} style={{ color: '#fff', fontSize: '10px', fontWeight: '600', textAlign: i > 0 ? 'right' : 'left' }}>{h}</p>
                    ))}
                  </div>
                  {selectedServices.map((s, i) => (
                    <div key={i} className="grid px-3 py-2.5" style={{ gridTemplateColumns: '3fr 1fr 1fr', background: i % 2 === 0 ? '#f4f4f4' : '#fafafa', borderBottom: `1px solid #ebebeb` }}>
                      <p style={{ color: '#333', fontSize: '11px' }}>{s.label}</p>
                      <p style={{ color: '#555', fontSize: '11px', textAlign: 'right' }}>1</p>
                      <p style={{ color: '#111', fontSize: '11px', fontWeight: '600', textAlign: 'right' }}>{s.prix} FCFA</p>
                    </div>
                  ))}
                </div>

                {/* Totaux */}
                <div className="flex justify-end">
                  <div style={{ minWidth: '220px' }}>
                    <div className="flex justify-between py-1.5" style={{ borderBottom: `1px solid #e8e8e8` }}>
                      <p style={{ color: '#888', fontSize: '11px' }}>{t('Sous-total HT')}</p>
                      <p style={{ color: '#333', fontSize: '11px', fontWeight: '600' }}>{fmt(subtotal)} FCFA</p>
                    </div>
                    <div className="flex justify-between py-1.5" style={{ borderBottom: `1px solid #e8e8e8` }}>
                      <p style={{ color: '#888', fontSize: '11px' }}>TVA 18%</p>
                      <p style={{ color: '#333', fontSize: '11px', fontWeight: '600' }}>{fmt(tva)} FCFA</p>
                    </div>
                    <div className="flex justify-between py-2 px-3 rounded-lg mt-1" style={{ background: '#111' }}>
                      <p style={{ color: '#fff', fontSize: '12px', fontWeight: '700' }}>{t('TOTAL TTC')}</p>
                      <p style={{ color: '#e87ec0', fontSize: '12px', fontWeight: '700' }}>{fmt(total)} FCFA</p>
                    </div>
                  </div>
                </div>

                {/* Conditions / signature */}
                <div className="flex justify-between items-end mt-2">
                  <div style={{ maxWidth: '260px' }}>
                    <p style={{ color: '#bbb', fontSize: '9px' }}>{t('Ce devis est valable 30 jours à compter de sa date d\'émission. Tout accord sur ce devis vaut commande ferme.')}</p>
                  </div>
                  <div className="text-right">
                    <p style={{ color: '#999', fontSize: '10px', marginBottom: '24px' }}>{t('Signature & cachet client')}</p>
                    <div style={{ width: '120px', borderTop: `1px solid #ccc' }}`, marginLeft: 'auto' }} />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
