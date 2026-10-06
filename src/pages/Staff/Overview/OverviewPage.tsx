import { GasPump, Drop, Database, Users } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { SummaryDonutCard } from './components/SummaryDonutCard';
import { RevenueLineChart } from './components/RevenueLineChart';
import { useGetOverviewMetrics } from '../../../hooks/api/overview/useGetOverviewMetrics';

export const OverviewPage = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetOverviewMetrics();

  if (isLoading || !data) {
    return <div className="p-8 flex justify-center text-gray-500">{t('overview.loading')}</div>;
  }

  return (
    <div className="max-w-[1600px] mx-auto w-full">
      <h1 className="text-xl font-bold text-gray-800 mb-6">{t('overview.title')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryDonutCard
          title={t('overview.stations')}
          totalLabel={t('overview.stations')}
          icon={
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#eaf8f1] border border-[#d1f0df]">
              <GasPump size={22} className="text-[#1a7a4c]" weight="regular" />
            </div>
          }
          data={data.summary.stations}
        />
        <SummaryDonutCard
          title={t('overview.pumps')}
          totalLabel={t('overview.pumps')}
          icon={
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#fef7e6] border border-[#fdeacc]">
              <Drop size={22} className="text-[#b47a09]" weight="regular" />
            </div>
          }
          data={data.summary.pumps}
        />
        <SummaryDonutCard
          title={t('overview.tanks')}
          totalLabel={t('overview.tanks')}
          icon={
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#fee2e2] border border-[#fecaca]">
              <Database size={22} className="text-[#b91c1c]" weight="regular" />
            </div>
          }
          data={data.summary.tanks}
        />
        <SummaryDonutCard
          title={t('overview.staff')}
          totalLabel={t('overview.staff')}
          icon={
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#e8f1fd] border border-[#d1e3fa]">
              <Users size={22} className="text-[#1d4ed8]" weight="regular" />
            </div>
          }
          data={data.summary.staff}
        />
      </div>

      <RevenueLineChart />
    </div>
  );
};
