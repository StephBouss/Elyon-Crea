export const displayName = 'Elyon Conversion Section';
export const shortDescription = 'Lead generation form block';

import Icon from '@global/Icon';

export default function ElyonConversion() {
  return (
    <div className="w-full py-24 px-24" style={{ background: 'linear-gradient(135deg, #0E0E0E 60%, #1a0a12 100%)' }}>
      <div className="max-w-3xl mx-auto text-center">
        <span className="text-xs font-semibold tracking-widest uppercase text-secondary font-body mb-4 block">{t('Passons à l\'action')}</span>
        <h2 className="text-5xl font-headings font-bold text-light leading-tight mb-4">
          {t('Prêt à donner vie à votre projet ?')}
        </h2>
        <p className="text-lg font-body mb-12" style={{ color: '#9a9a9a' }}>
          {t('Partagez-nous votre besoin en 30 secondes. Notre équipe vous recontacte sous 24h.')}
        </p>

        <div className="bg-dark-card rounded-xl p-10 border border-border">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="rounded-md px-4 py-3 flex items-center gap-3 border border-border font-body text-muted-foreground text-base" style={{ background: '#1a1a1a' }}>
              <Icon i="user" size={16} />
              {t('Votre nom')}
            </div>
            <div className="rounded-md px-4 py-3 flex items-center gap-3 border border-border font-body text-muted-foreground text-base" style={{ background: '#1a1a1a' }}>
              <Icon i="mail" size={16} />
              {t('Votre email')}
            </div>
          </div>
          <div className="rounded-md px-4 py-4 flex items-start gap-3 border border-border font-body text-muted-foreground text-base mb-6" style={{ background: '#1a1a1a', minHeight: '80px' }}>
            <Icon i="message-square" size={16} />
            <span>{t('Décrivez votre besoin en quelques mots…')}</span>
          </div>
          <button className="w-full bg-secondary text-secondary-foreground py-4 rounded-md font-bold text-lg font-body flex items-center justify-center gap-3">
            <Icon i="send" size={18} />
            {t('Envoyer ma demande')}
          </button>
          <p className="text-xs font-body mt-4" style={{ color: '#6E6E6E' }}>
            {t('Aucun spam. Vos données restent confidentielles.')}
          </p>
        </div>
      </div>
    </div>
  );
}
