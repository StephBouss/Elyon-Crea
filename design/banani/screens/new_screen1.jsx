export const displayName = 'Elyon Créa — Mentions Légales';
export const screenSize = 'desktop';

import Icon from '@global/Icon';
import ElyonHeader from '@components/ElyonHeader';
import ElyonFooter from '@components/ElyonFooter';

const Section = ({ title, children }) => (
  <div className="mb-12">
    <h2 className="text-xl font-headings font-bold mb-4" style={{ color: '#F9B000' }}>{title}</h2>
    <div className="font-body text-base leading-relaxed" style={{ color: '#c0c0c0' }}>
      {children}
    </div>
  </div>
);

const Row = ({ label, value }) => (
  <div className="flex gap-4 py-2 border-b" style={{ borderColor: '#2a2a2a' }}>
    <span className="font-body text-sm font-semibold w-56 flex-shrink-0" style={{ color: '#9a9a9a' }}>{label}</span>
    <span className="font-body text-sm" style={{ color: '#e0e0e0' }}>{value}</span>
  </div>
);

export default function MentionsLegales() {
  return (
    <div className="font-body" style={{ background: '#0E0E0E', minHeight: '100vh' }}>
      <ElyonHeader />

      {/* Page header */}
      <div className="relative w-full overflow-hidden py-20 px-24" style={{ background: 'linear-gradient(135deg, #0E0E0E 60%, #1a0a12 100%)' }}>
        <div className="absolute inset-0 flex items-center justify-end pr-24 pointer-events-none select-none">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/banani-prod.appspot.com/o/reference-images%2Fe1b20d7b-1888-489e-8690-4cf5f67247d8?alt=media&token=d175f110-6643-4e8c-b323-42ba1f471660"
            alt=""
            style={{ width: '480px', opacity: 0.06, filter: 'brightness(1.4)' }}
          />
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(14,14,14,0.98) 50%, rgba(14,14,14,0.3) 100%)' }} />
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <a className="font-body text-sm" style={{ color: '#9a9a9a' }}>{t('Accueil')}</a>
            <Icon i="chevron-right" size={14} style={{ color: '#6E6E6E' }} />
            <span className="font-body text-sm" style={{ color: '#F9B000' }}>{t('Mentions légales')}</span>
          </div>
          <h1 className="text-5xl font-headings font-bold text-white leading-tight mb-4">{t('Mentions légales')}</h1>
          <p className="font-body text-lg" style={{ color: '#9a9a9a' }}>{t('Dernière mise à jour : juin 2025')}</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-24 py-20 max-w-4xl">

        <Section title={t('1. Éditeur du site')}>
          <div className="rounded-lg p-6 border" style={{ background: '#141414', borderColor: '#2a2a2a' }}>
            <Row label={t('Raison sociale')} value={t('Elyon Créa')} />
            <Row label={t('Forme juridique')} value={t('Agence de communication')} />
            <Row label={t('Siège social')} value={t('Libreville, Gabon')} />
            <Row label={t('Pays')} value={t('République Gabonaise')} />
            <Row label={t('Email de contact')} value={t('contact@elyoncrea.ga')} />
            <Row label={t('Téléphone')} value={t('+241 XX XX XX XX')} />
          </div>
        </Section>

        <Section title={t('2. Directeur de la publication')}>
          <p>{t('Le directeur de la publication est le représentant légal d\'Elyon Créa. Pour toute question relative au contenu du site, vous pouvez nous contacter à l\'adresse email mentionnée ci-dessus.')}</p>
        </Section>

        <Section title={t('3. Hébergement')}>
          <div className="rounded-lg p-6 border" style={{ background: '#141414', borderColor: '#2a2a2a' }}>
            <Row label={t('Hébergeur')} value={t('À préciser')} />
            <Row label={t('Adresse')} value={t('À préciser')} />
            <Row label={t('Site web')} value={t('À préciser')} />
          </div>
        </Section>

        <Section title={t('4. Propriété intellectuelle')}>
          <p className="mb-4">{t('L\'ensemble des contenus présents sur le site d\'Elyon Créa (textes, images, illustrations, logos, vidéos, sons, plans, noms, slogans, dénominations, marques, animations, bases de données) sont la propriété exclusive d\'Elyon Créa ou de ses partenaires.')}</p>
          <p>{t('Toute reproduction, représentation, modification, publication, adaptation ou exploitation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l\'autorisation préalable et écrite d\'Elyon Créa.')}</p>
        </Section>

        <Section title={t('5. Protection des données personnelles')}>
          <p className="mb-4">{t('Conformément aux lois en vigueur en République Gabonaise relatives à la protection des données personnelles, vous disposez d\'un droit d\'accès, de rectification et de suppression des données vous concernant.')}</p>
          <p className="mb-4">{t('Les informations collectées via le formulaire de contact sont utilisées uniquement dans le cadre de la réponse à votre demande et ne sont jamais transmises à des tiers sans votre consentement.')}</p>
          <p>{t('Pour exercer vos droits, contactez-nous à : contact@elyoncrea.ga')}</p>
        </Section>

        <Section title={t('6. Cookies')}>
          <p className="mb-4">{t('Le site Elyon Créa peut utiliser des cookies afin d\'améliorer l\'expérience utilisateur. Un cookie est un petit fichier texte enregistré sur votre ordinateur ou appareil mobile lors de la visite d\'un site.')}</p>
          <p>{t('Vous pouvez configurer votre navigateur pour refuser les cookies. Cependant, certaines fonctionnalités du site pourraient ne plus être disponibles.')}</p>
        </Section>

        <Section title={t('7. Loi applicable')}>
          <p>{t('Les présentes mentions légales sont régies par le droit gabonais. En cas de litige, les tribunaux compétents de Libreville (République Gabonaise) seront seuls compétents.')}</p>
        </Section>

        <Section title={t('8. Contact')}>
          <div className="flex items-start gap-6 rounded-lg p-6 border" style={{ background: '#141414', borderColor: '#2a2a2a' }}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Icon i="mail" size={18} style={{ color: '#F9B000' }} />
                <span className="font-body text-sm" style={{ color: '#e0e0e0' }}>{t('contact@elyoncrea.ga')}</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon i="map-pin" size={18} style={{ color: '#F9B000' }} />
                <span className="font-body text-sm" style={{ color: '#e0e0e0' }}>{t('Libreville, République Gabonaise')}</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon i="phone" size={18} style={{ color: '#F9B000' }} />
                <span className="font-body text-sm" style={{ color: '#e0e0e0' }}>{t('+241 XX XX XX XX')}</span>
              </div>
            </div>
          </div>
        </Section>

      </div>

      <ElyonFooter />
    </div>
  );
}
