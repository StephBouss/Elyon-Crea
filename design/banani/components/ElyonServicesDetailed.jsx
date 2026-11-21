export const displayName = 'Elyon Services Détaillés';
export const shortDescription = '11 pôles de services en cartes avec tooltip individuel par prestation';

import Icon from '@global/Icon';

const poles = [
  {
    icon: 'lightbulb',
    color: '#C2147A',
    title: t('Conseil & Stratégie'),
    items: [
      { label: t('Audit de marque'), desc: t('Analyse complète de votre image, de vos forces et de vos axes d\'amélioration pour poser des bases solides.') },
      { label: t('Positionnement'), desc: t('Définition de votre place unique sur le marché et de ce qui vous différencie durablement de la concurrence.') },
      { label: t('Plateforme de marque'), desc: t('Formalisation de votre vision, mission, valeurs et promesse en un document de référence stratégique.') },
      { label: t('Stratégie de communication'), desc: t('Élaboration d\'un plan de communication cohérent, adapté à vos cibles et à vos objectifs business.') },
      { label: t('Plan média'), desc: t('Sélection des canaux et des investissements médias pour maximiser votre couverture et votre impact.') },
      { label: t('Naming'), desc: t('Création d\'un nom de marque mémorable, disponible et porteur de sens pour votre positionnement.') },
    ],
  },
  {
    icon: 'pen-tool',
    color: '#F9B000',
    title: t('Identité & Création'),
    subtitle: t('Studio Graphic'),
    items: [
      { label: t('Logo'), desc: t('Conception d\'un logo unique, déclinable sur tous supports, représentant fidèlement votre identité.') },
      { label: t('Charte graphique'), desc: t('Définition des règles d\'utilisation de votre identité : couleurs, typographies, espacements et tons.') },
      { label: t('Direction artistique'), desc: t('Définition et cohérence de l\'univers visuel global de votre marque sur l\'ensemble des supports.') },
      { label: t('Papeterie'), desc: t('Création de cartes de visite, en-têtes, signatures email et tout support de papeterie professionnelle.') },
      { label: t('Illustrations'), desc: t('Création d\'illustrations sur mesure pour enrichir votre univers graphique et renforcer votre singularité.') },
    ],
  },
  {
    icon: 'monitor',
    color: '#C2147A',
    title: t('Web & Digital'),
    items: [
      { label: t('Sites vitrines'), desc: t('Conception et développement de sites institutionnels modernes, rapides et représentatifs de votre marque.') },
      { label: t('Landing pages'), desc: t('Pages d\'atterrissage optimisées pour la conversion, pensées pour vos campagnes publicitaires.') },
      { label: t('E-commerce'), desc: t('Boutiques en ligne performantes avec catalogue produit, paiement sécurisé et gestion des commandes.') },
      { label: t('UX/UI'), desc: t('Design d\'interfaces intuitives et agréables, centrées sur l\'expérience utilisateur et la fluidité de navigation.') },
      { label: t('SEO/SEA'), desc: t('Optimisation du référencement naturel et gestion des campagnes payantes pour maximiser votre visibilité.') },
      { label: t('Emailing'), desc: t('Création et envoi de campagnes d\'emailing ciblées, personnalisées et analysées pour engager vos contacts.') },
      { label: t('Maintenance'), desc: t('Suivi technique, mises à jour de sécurité et évolutions de votre plateforme pour garantir sa pérennité.') },
    ],
  },
  {
    icon: 'instagram',
    color: '#F9B000',
    title: t('Social Media & Contenu'),
    items: [
      { label: t('Ligne éditoriale'), desc: t('Définition du ton, des thématiques et du calendrier de contenu alignés avec votre stratégie de marque.') },
      { label: t('Calendrier'), desc: t('Planification mensuelle des publications pour maintenir une présence régulière et cohérente sur les réseaux.') },
      { label: t('Visuels'), desc: t('Création de visuels percutants et cohérents avec votre charte graphique pour chaque publication.') },
      { label: t('Community management'), desc: t('Animation de vos communautés, réponses aux commentaires et interactions quotidiennes avec vos abonnés.') },
      { label: t('Reporting'), desc: t('Analyse mensuelle de vos performances : portée, engagement, croissance et recommandations d\'optimisation.') },
    ],
  },
  {
    icon: 'radio',
    color: '#C2147A',
    title: t('Publicité Média'),
    subtitle: t('ATL'),
    items: [
      { label: t('Campagnes TV/Radio'), desc: t('Conception et diffusion de campagnes publicitaires sur les chaînes TV et stations radio nationales.') },
      { label: t('Spots'), desc: t('Production de spots publicitaires courts et impactants adaptés à la diffusion télévision ou radio.') },
      { label: t('Affichage grand format'), desc: t('Conception et achat d\'espaces d\'affichage urbain : panneaux 4x3, abribus, mobilier urbain.') },
      { label: t('Presse'), desc: t('Conception d\'annonces presse adaptées aux formats de vos titres cibles, print et digital.') },
      { label: t('Achat d\'espace'), desc: t('Négociation et acquisition des meilleurs espaces médias au meilleur rapport qualité/prix pour votre budget.') },
    ],
  },
  {
    icon: 'megaphone',
    color: '#F9B000',
    title: t('Activation & Marketing Terrain'),
    subtitle: t('BTL'),
    items: [
      { label: t('Street marketing'), desc: t('Actions de communication directe en milieu urbain pour créer du buzz et toucher vos cibles au quotidien.') },
      { label: t('PLV'), desc: t('Conception et production de publicité sur lieu de vente pour dynamiser vos points de distribution.') },
      { label: t('Animations'), desc: t('Organisation d\'animations en point de vente ou en espace public pour engager directement vos consommateurs.') },
      { label: t('Échantillonnage'), desc: t('Distribution d\'échantillons et de produits test pour faire découvrir votre offre à grande échelle.') },
      { label: t('Jeux-concours'), desc: t('Création et animation de jeux-concours pour générer de l\'engagement et enrichir votre base de contacts.') },
    ],
  },
  {
    icon: 'calendar',
    color: '#C2147A',
    title: t('Événementiel'),
    items: [
      { label: t('Organisation d\'événements'), desc: t('Conception et coordination complète de vos événements professionnels : lancements, conférences, soirées.') },
      { label: t('Stands'), desc: t('Design et fabrication de stands sur mesure pour vos participations à des salons et foires professionnelles.') },
      { label: t('Scénographie'), desc: t('Création de l\'univers visuel et spatial de votre événement pour une expérience immersive et mémorable.') },
      { label: t('Signalétique'), desc: t('Conception de tous les supports de signalétique directionnelle et décorative pour votre événement.') },
      { label: t('Invitations'), desc: t('Création et gestion des invitations, de la conception graphique à l\'envoi et au suivi des confirmations.') },
    ],
  },
  {
    icon: 'printer',
    color: '#F9B000',
    title: t('Impression & Production'),
    subtitle: t('Print'),
    items: [
      { label: t('Petit & grand format'), desc: t('Impression de tous vos supports, des cartes de visite aux bâches publicitaires de grande taille.') },
      { label: t('Bâches'), desc: t('Production de bâches vinyle intérieur et extérieur pour vos événements, façades et points de vente.') },
      { label: t('Kakémonos'), desc: t('Impression et montage de kakémonos rétractables, idéaux pour vos événements et salons professionnels.') },
      { label: t('Enseignes'), desc: t('Fabrication d\'enseignes lumineuses, découpées ou sérigraphiées pour identifier votre point de vente.') },
      { label: t('Packaging'), desc: t('Conception et impression de packagings attractifs qui valorisent vos produits en point de vente.') },
    ],
  },
  {
    icon: 'gift',
    color: '#C2147A',
    title: t('Objets Publicitaires & Goodies'),
    items: [
      { label: t('Textile'), desc: t('Impression et broderie sur vêtements (t-shirts, polos, casquettes) pour vos équipes et vos événements.') },
      { label: t('Mugs'), desc: t('Personnalisation de mugs et gobelets thermiques à votre image, idéaux pour fidéliser vos clients.') },
      { label: t('Stylos'), desc: t('Stylos et fournitures de bureau marqués à votre logo, utiles et visibles au quotidien.') },
      { label: t('Tote bags'), desc: t('Création de tote bags personnalisés en coton ou non-tissé pour valoriser votre marque au quotidien.') },
      { label: t('Clés USB'), desc: t('Clés USB personnalisées à votre logo, pratiques et appréciées comme goodies ou cadeaux clients.') },
      { label: t('Marquage'), desc: t('Application de votre identité (logo, slogan, URL) sur tout type de support par sérigraphie, gravure ou transfert.') },
    ],
  },
  {
    icon: 'video',
    color: '#F9B000',
    title: t('Production Audiovisuelle'),
    items: [
      { label: t('Films institutionnels'), desc: t('Réalisation de films d\'entreprise qui valorisent votre histoire, vos équipes et votre savoir-faire.') },
      { label: t('Spots'), desc: t('Production de spots publicitaires vidéo percutants pour diffusion TV, web et réseaux sociaux.') },
      { label: t('Motion design'), desc: t('Création d\'animations graphiques et de vidéos animées pour présenter vos contenus de façon dynamique.') },
      { label: t('Photo'), desc: t('Shootings photo professionnels : produits, équipes, événements et contenus pour vos supports de communication.') },
      { label: t('Voix-off'), desc: t('Enregistrement et production de voix-off professionnelles pour vos vidéos, spots radio et présentations.') },
    ],
  },
  {
    icon: 'bar-chart-2',
    color: '#C2147A',
    title: t('Déploiement, Coordination & Mesure'),
    items: [
      { label: t('Coordination de production'), desc: t('Supervision et coordination de l\'ensemble des prestataires et équipes impliqués dans votre campagne.') },
      { label: t('Pose'), desc: t('Installation terrain de vos supports print, enseignes, bâches et PLV par nos équipes dédiées.') },
      { label: t('Suivi de campagne'), desc: t('Monitoring en temps réel de l\'avancement et de la diffusion de votre campagne sur tous les canaux.') },
      { label: t('KPI'), desc: t('Définition et suivi des indicateurs clés de performance pour mesurer l\'atteinte de vos objectifs.') },
      { label: t('ROI'), desc: t('Analyse du retour sur investissement de chaque action pour optimiser vos prochaines campagnes.') },
    ],
  },
];

export default function ElyonServicesDetailed() {
  return (
    <div className="w-full bg-light py-24 px-24">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-xs font-semibold tracking-widest uppercase font-body mb-3 block" style={{ color: '#C2147A' }}>{t('Notre expertise')}</span>
        <h2 className="text-4xl font-headings font-bold text-foreground leading-tight mb-4">
          {t('Une agence 360°, un seul partenaire.')}
        </h2>
        <p className="text-base font-body max-w-xl mx-auto" style={{ color: '#6E6E6E' }}>
          {t('De la stratégie à la mesure des résultats, nous couvrons l\'intégralité de votre communication.')}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-5">
        {poles.map((pole, i) => (
          <div
            key={i}
            className="relative rounded-xl border p-6"
            style={{ background: '#ffffff', borderColor: '#e8e4df' }}
          >
            {/* Number badge */}
            <span className="absolute top-5 right-5 text-xs font-headings font-bold" style={{ color: '#d0ccc8' }}>
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* Icon */}
            <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4 flex-shrink-0"
              style={{ background: `${pole.color}18` }}>
              <Icon i={pole.icon} size={22} style={{ color: pole.color }} />
            </div>

            {/* Title */}
            <h3 className="text-base font-headings font-bold mb-1" style={{ color: '#0E0E0E' }}>{pole.title}</h3>
            {pole.subtitle && (
              <span className="text-xs font-body font-semibold mb-3 block" style={{ color: pole.color }}>{pole.subtitle}</span>
            )}

            {/* Divider */}
            <div className="w-8 h-px my-3" style={{ background: pole.color }} />

            {/* Items list — each item has its own tooltip */}
            <ul className="flex flex-col gap-2">
              {pole.items.map((item, j) => (
                <li key={j} className="relative flex items-center gap-2 text-sm font-body" style={{ color: '#6E6E6E' }}>
                  <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: pole.color }} />
                  <span className="expertise-item relative inline-block">
                    {item.label}
                    {/* Individual tooltip */}
                    <span
                      className="expertise-tooltip absolute left-0 font-body text-xs leading-relaxed rounded-lg px-4 py-3 pointer-events-none"
                      style={{
                        bottom: 'calc(100% + 8px)',
                        minWidth: '230px',
                        maxWidth: '270px',
                        background: '#0E0E0E',
                        color: '#c8c8c8',
                        border: `1px solid ${pole.color}40`,
                        boxShadow: `0 8px 24px rgba(0,0,0,0.2), 0 0 0 1px ${pole.color}15`,
                        zIndex: 50,
                        opacity: 0,
                        visibility: 'hidden',
                      }}
                    >
                      <span className="block w-8 h-0.5 rounded mb-2" style={{ background: pole.color }} />
                      <span className="font-semibold block mb-1" style={{ color: '#ffffff' }}>{item.label}</span>
                      {item.desc}
                      <span
                        className="absolute"
                        style={{
                          top: '100%',
                          left: '16px',
                          width: 0,
                          height: 0,
                          borderLeft: '6px solid transparent',
                          borderRight: '6px solid transparent',
                          borderTop: '6px solid #0E0E0E',
                        }}
                      />
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-6 right-6 h-px" style={{ background: `linear-gradient(to right, ${pole.color}60, transparent)` }} />
          </div>
        ))}
      </div>
    </div>
  );
}
