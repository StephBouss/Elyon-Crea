export const displayName = 'Elyon Créa — Audit Gratuit';
export const screenSize = 'desktop';

import ElyonHeaderV2 from '@components/ElyonHeaderV2';
import ElyonAuditForm from '@components/ElyonAuditForm';
import ElyonFooter from '@components/ElyonFooter';

export default function ElyonAuditPage() {
  return (
    <div className="font-body bg-dark">
      <ElyonHeaderV2 />
      <ElyonAuditForm />
      <ElyonFooter />
    </div>
  );
}
