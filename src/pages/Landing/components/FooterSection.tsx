import { Footer } from '../../../components/ui/Footer';
import { useTranslation } from 'react-i18next';

export const FooterSection = () => {
  const { t } = useTranslation('common');
  return (
    <div id="footer">
      <Footer contactTitle={t('landing.nav.contact')} />
    </div>
  );
};
