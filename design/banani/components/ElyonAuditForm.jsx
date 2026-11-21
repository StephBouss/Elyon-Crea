export const displayName = 'Elyon Audit Gratuit — Formulaire';
export const shortDescription = 'Formulaire de demande d\'audit gratuit avec validation';

import Icon from '@global/Icon';

export default function ElyonAuditForm() {
  return (
    <div className="w-full bg-light py-20 px-24">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent-magenta font-body mb-3 block">{t('Audit gratuit')}</span>
          <h1 className="text-4xl font-headings font-bold text-foreground mb-4">{t('Prêt à décupler votre impact ?')}</h1>
          <p className="text-base font-body text-muted">{t('Répondez à quelques questions, et nous analyserons votre stratégie de communication en détail.')}</p>
        </div>

        {/* Form */}
        <div className="bg-background rounded-xl p-10 border border-light-card">
          <form className="space-y-6">
            {/* Row 1 : Nom + Email */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-semibold tracking-widest uppercase text-foreground mb-2 block">{t('Votre nom')}</label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-light-card bg-light">
                  <Icon i="user" size={16} style={{ color: '#a0a0a0' }} />
                  <input
                    type="text"
                    placeholder={t('Jean Dupont')}
                    className="flex-1 bg-transparent text-foreground placeholder-muted outline-none"
                    style={{ fontSize: '14px' }}
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold tracking-widest uppercase text-foreground mb-2 block">{t('Adresse email')}</label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-light-card bg-light">
                  <Icon i="mail" size={16} style={{ color: '#a0a0a0' }} />
                  <input
                    type="email"
                    placeholder={t('jean@example.com')}
                    className="flex-1 bg-transparent text-foreground placeholder-muted outline-none"
                    style={{ fontSize: '14px' }}
                  />
                </div>
              </div>
            </div>

            {/* Row 2 : Entreprise + Secteur */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-semibold tracking-widest uppercase text-foreground mb-2 block">{t('Nom de l\'entreprise')}</label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-light-card bg-light">
                  <Icon i="briefcase" size={16} style={{ color: '#a0a0a0' }} />
                  <input
                    type="text"
                    placeholder={t('Ma Boutique & Co')}
                    className="flex-1 bg-transparent text-foreground placeholder-muted outline-none"
                    style={{ fontSize: '14px' }}
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold tracking-widest uppercase text-foreground mb-2 block">{t('Secteur d\'activité')}</label>
                <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-light-card bg-light cursor-pointer">
                  <span className="text-muted">{t('Sélectionner un secteur')}</span>
                  <Icon i="chevron-down" size={16} style={{ color: '#a0a0a0' }} />
                </div>
              </div>
            </div>

            {/* Row 3 : Téléphone + Budget */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-semibold tracking-widest uppercase text-foreground mb-2 block">{t('Téléphone')}</label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-light-card bg-light">
                  <Icon i="phone" size={16} style={{ color: '#a0a0a0' }} />
                  <input
                    type="tel"
                    placeholder={t('+241 77 000 000')}
                    className="flex-1 bg-transparent text-foreground placeholder-muted outline-none"
                    style={{ fontSize: '14px' }}
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold tracking-widest uppercase text-foreground mb-2 block">{t('Budget annuel (XAF)')}</label>
                <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-light-card bg-light cursor-pointer">
                  <span className="text-muted">{t('Moins de 500k · 500k–2M · 2M+')})</span>
                  <Icon i="chevron-down" size={16} style={{ color: '#a0a0a0' }} />
                </div>
              </div>
            </div>

            {/* Row 4 : Besoin principal */}
            <div>
              <label className="text-xs font-semibold tracking-widest uppercase text-foreground mb-3 block">{t('Quel est votre besoin principal ? (cochez toutes les cases pertinentes)')}</label>
              <div className="space-y-3">
                {[
                  { label: t('Refondre mon identité visuelle'), icon: 'palette' },
                  { label: t('Augmenter ma visibilité en ligne (SEO/réseaux)'), icon: 'trending-up' },
                  { label: t('Créer un site e-commerce'), icon: 'shopping-cart' },
                  { label: t('Produire des vidéos / contenu'), icon: 'video' },
                  { label: t('Auditer ma stratégie marketing'), icon: 'bar-chart-2' },
                  { label: t('Organiser un événement / activation'), icon: 'megaphone' },
                ].map((item, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-light-card hover:border-accent-magenta transition-colors">
                    <div className="w-5 h-5 rounded border-2 border-light-card flex items-center justify-center" style={{ borderColor: '#a0a0a0' }}>
                      <Icon i="check" size={12} style={{ color: 'transparent' }} />
                    </div>
                    <Icon i={item.icon} size={16} style={{ color: '#F9B000' }} />
                    <span className="text-sm font-body text-foreground">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Row 5 : Message personnalisé */}
            <div>
              <label className="text-xs font-semibold tracking-widest uppercase text-foreground mb-2 block">{t('Parlez-nous de votre projet (optionnel)')}</label>
              <div className="flex items-start gap-3 px-4 py-3 rounded-lg border border-light-card bg-light">
                <Icon i="message-square" size={16} style={{ color: '#a0a0a0', marginTop: '6px' }} />
                <textarea
                  placeholder={t('Décrivez brièvement votre situation actuelle, vos défis et vos ambitions…')}
                  className="flex-1 bg-transparent text-foreground placeholder-muted outline-none resize-none"
                  rows={4}
                  style={{ fontSize: '14px' }}
                />
              </div>
            </div>

            {/* Row 6 : Fichiers à auditer */}
            <div>
              <label className="text-xs font-semibold tracking-widest uppercase text-foreground mb-3 block">{t('Partagez les documents à auditer (optionnel)')}</label>
              <div className="border-2 border-dashed border-light-card rounded-lg p-8 bg-light/50 text-center cursor-pointer transition-all hover:border-accent-magenta hover:bg-light">
                <Icon i="upload-cloud" size={32} style={{ color: '#F9B000', margin: '0 auto 12px' }} />
                <p className="text-sm font-semibold text-foreground mb-1">{t('Glissez-déposez vos fichiers ici')}</p>
                <p className="text-xs text-muted mb-4">{t('ou cliquez pour parcourir')}</p>
                <p className="text-xs text-muted">{t('Accepte : images (PNG, JPG), PDFs, liens web')}</p>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {[
                  { icon: 'image', label: t('Ajouter une image') },
                  { icon: 'file-text', label: t('Ajouter un document') },
                  { icon: 'link-2', label: t('Coller un lien web') },
                ].map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-light-card bg-light hover:border-accent-magenta transition-colors"
                  >
                    <Icon i={item.icon} size={16} style={{ color: '#F9B000' }} />
                    <span className="text-sm font-body text-foreground">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Checkbox consent */}
            <label className="flex items-start gap-3 cursor-pointer">
              <div className="w-5 h-5 rounded border-2 border-light-card flex items-center justify-center flex-shrink-0 mt-0.5" style={{ borderColor: '#F9B000' }}>
                <Icon i="check" size={12} style={{ color: '#F9B000' }} />
              </div>
              <span className="text-sm font-body text-muted">
                {t('J\'accepte la politique de confidentialité et je souhaite recevoir les conseils d\'Elyon Créa par email.')}
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-lg text-base font-semibold text-white transition-all mt-8"
              style={{ background: '#C2147A' }}
            >
              {t('Recevoir mon audit gratuit')}
            </button>

            <p className="text-center text-xs text-muted">{t('Nous vous répondrons dans les 24h ouvrables.')}</p>
          </form>
        </div>

        {/* Reassurance */}
        <div className="grid grid-cols-3 gap-6 mt-12">
          {[
            { icon: 'lock', label: t('Données sécurisées'), sub: t('Aucun spam, juste nos conseils.') },
            { icon: 'clock', label: t('Réponse rapide'), sub: t('Dans les 24h ouvrables.') },
            { icon: 'star', label: t('Audit gratuit'), sub: t('Aucune obligation d\'achat.') },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 rounded-lg bg-light-card flex items-center justify-center mx-auto mb-3">
                <Icon i={item.icon} size={20} style={{ color: '#F9B000' }} />
              </div>
              <p className="font-semibold text-foreground text-sm">{item.label}</p>
              <p className="text-xs text-muted mt-1">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
