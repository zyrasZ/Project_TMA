import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { PricingSection } from './components/PricingSection';
import { ContactSection } from './components/ContactSection';
import { FooterSection } from './components/FooterSection';
import { Header } from '../../components/ui/Header';
import { ArrowUp } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

export const LandingPage = () => {
  const { t } = useTranslation('common');
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-surface relative">
      <Header
        navLinks={[
          { label: t('landing.nav.features'), href: '#features' },
          { label: t('landing.nav.pricing'), href: '#pricing' },
          { label: t('landing.nav.contact'), href: '#contact' },
          { label: t('landing.nav.guide'), href: '#guide' },
        ]}
      />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <ContactSection />
      <FooterSection />

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-12 right-12 w-[56px] h-[56px] bg-primary text-white rounded-lg shadow-lg flex items-center justify-center transition-colors duration-300 z-50 hover:bg-turquoise-700"
        aria-label="Scroll to top"
      >
        <ArrowUp size={44} weight="regular" />
      </button>
    </div>
  );
};
