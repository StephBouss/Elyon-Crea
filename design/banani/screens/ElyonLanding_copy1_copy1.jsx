export const displayName = 'Elyon Créa — Landing Page1';
export const screenSize = 'desktop';

import ElyonHeaderV2 from '@components/ElyonHeaderV2';
import ElyonHero from '@components/ElyonHero';
import ElyonStats from '@components/ElyonStats';
import ElyonProblemSolutionV2 from '@components/ElyonProblemSolutionV2';
import ElyonCampaignPath from '@components/ElyonCampaignPath';
import ElyonServices from '@components/ElyonServices';
import ElyonServicesDetailed from '@components/ElyonServicesDetailed';
import ElyonStackValeur from '@components/ElyonStackValeur';
import ElyonFormules from '@components/ElyonFormules';
import ElyonGarantie from '@components/ElyonGarantie';
import ElyonCTAFinal from '@components/ElyonCTAFinal';
import ElyonPortfolio from '@components/ElyonPortfolio';
import ElyonMethod from '@components/ElyonMethod';
import ElyonTestimonials from '@components/ElyonTestimonials';
import ElyonConversion from '@components/ElyonConversion';
import ElyonFAQ from '@components/ElyonFAQ';
import ElyonFooter from '@components/ElyonFooter';

export default function ElyonLandingPage() {
  return (
    <div className="font-body bg-dark">
      <ElyonHeaderV2 />
      <ElyonHero activeSlide={0} />
      <ElyonStats />
      <ElyonProblemSolutionV2 />
      <ElyonStackValeur />
      <ElyonServicesDetailed />
      <ElyonFormules />
      <ElyonPortfolio />
      <ElyonGarantie />
      <ElyonFAQ />
      <ElyonCTAFinal />
      <ElyonFooter />
    </div>
  );
}
