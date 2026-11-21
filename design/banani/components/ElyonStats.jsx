export const displayName = 'Elyon Stats Bar';
export const shortDescription = 'Reassurance stats bar';

const stats = [
  { value: t('+250'), label: t('Projets livrés') },
  { value: t('+80'), label: t('Clients satisfaits') },
  { value: t('8'), label: t('Années d\'expérience') },
  { value: t('98%'), label: t('Taux de satisfaction') },
];

export default function ElyonStats() {
  return (
    <div className="w-full bg-dark-card border-y border-border">
      <div className="flex items-center">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`flex-1 flex flex-col items-center justify-center py-10 ${i < stats.length - 1 ? 'border-r border-border' : ''}`}
          >
            <span className="text-4xl font-headings font-bold text-secondary mb-1">{s.value}</span>
            <span className="text-sm font-body text-muted-foreground tracking-wide">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
