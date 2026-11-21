export const displayName = 'Elyon Header';
export const shortDescription = 'Fixed top navigation bar';

export default function ElyonHeader() {
  return (
    <div className="w-full bg-dark flex items-center justify-between px-16 py-4 border-b border-border">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/banani-prod.appspot.com/o/reference-images%2Fe1b20d7b-1888-489e-8690-4cf5f67247d8?alt=media&token=d175f110-6643-4e8c-b323-42ba1f471660"
          alt="Elyon Créa"
          className="h-12 w-auto"
        />
      </div>
      {/* Nav */}
      <nav className="flex items-center gap-10">
        {[t('Services'), t('Réalisations'), t('À propos'), t('Contact')].map((item) => (
          <a key={item} className="text-sm font-body text-muted-foreground font-medium tracking-wide">{item}</a>
        ))}
      </nav>
      {/* CTA */}
      <button className="bg-secondary text-secondary-foreground px-6 py-3 rounded-md text-sm font-body font-semibold">
        {t('Démarrer mon projet')}
      </button>
    </div>
  );
}
