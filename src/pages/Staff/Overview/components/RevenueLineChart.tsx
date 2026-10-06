import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Card } from '../../../../components/ui/Card';
import { useGetRevenueByStation, useGetStations } from '../../../../hooks/api/overview/useGetOverviewMetrics';

export const RevenueLineChart = () => {
  const { t } = useTranslation();
  const [stationId, setStationId] = useState('quang-trung');
  const { data: stations, isLoading: isStationsLoading } = useGetStations();
  const { data, isLoading } = useGetRevenueByStation(stationId);

  const categories = data?.categories || [];
  const series = data?.series || [];

  const isEmpty = !series || series.length === 0 || series.every(s => s.data.length === 0);

  const mappedSeries = series.map((s) => {
    return { ...s, data: s.data };
  });

  const options: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    stroke: {
      curve: 'straight',
      width: 2
    },
    markers: {
      size: 4,
      strokeWidth: 2,
      colors: ['#fff'],
      strokeColors: series.map(s => s.color),
      hover: { size: 6 }
    },
    colors: series.map(s => s.color),
    xaxis: {
      type: 'category',
      categories: categories,
      labels: {
        style: { colors: '#A0AEC0', fontSize: '12px' }
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false }
    },
    yaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: '#A0AEC0', fontSize: '12px' },
        offsetX: -5
      },
      title: {
        text: 'Triệu',
        style: { color: '#A0AEC0', fontSize: '12px', fontWeight: 500 },
        offsetX: 5
      },
      min: 0,
      max: 100,
      tickAmount: 4
    },
    grid: {
      borderColor: '#E2E8F0',
      strokeDashArray: 4,
      yaxis: { lines: { show: true } },
      padding: { left: 25, right: 15 } 
    },
    tooltip: {
      x: {
        formatter: (val) => {
          const idx = Math.round(Number(val));
          if (idx >= 1 && idx <= categories.length) return categories[idx - 1];
          return '';
        }
      }
    },
    legend: {
      show: !isEmpty,
      position: 'bottom',
      horizontalAlign: 'center',
      itemMargin: { horizontal: 10, vertical: 15 },
      fontSize: '12px',
      fontWeight: 500,
      labels: { colors: '#4A5568' }
    }
  };

  return (
    <Card className="flex flex-col bg-white shadow-sm border border-border-neutral mt-6 overflow-hidden p-0">
      <style>{`
        /* Chỉ xê dịch duy nhất nhãn chữ của ca đầu tiên sang phải để không bị đè vào trục Y */
        .apexcharts-xaxis-texts-g text:nth-child(1) {
          transform: translateX(20px);
        }
      `}</style>
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-border-neutral">
        <h3 className="text-[15px] font-semibold text-gray-800">{t('overview.revenue.title')}</h3>
        <select 
          value={stationId}
          onChange={(e) => setStationId(e.target.value)}
          disabled={isStationsLoading}
          className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 outline-none hover:border-gray-400 cursor-pointer bg-white disabled:opacity-50"
        >
          {isStationsLoading ? (
            <option value="quang-trung">Đang tải...</option>
          ) : (
            stations?.map((station) => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))
          )}
        </select>
      </div>
      
      {/* Body */}
      <div className="w-full p-4 pt-6 relative min-h-[350px]">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10 text-[13px] text-gray-500 font-medium pb-10 bg-white/50">
            {t('overview.revenue.loading')}
          </div>
        )}
        {!isLoading && isEmpty && (
          <div className="absolute inset-0 flex items-center justify-center z-10 text-[13px] text-gray-500 font-medium pb-10">
            {t('overview.revenue.noData')}
          </div>
        )}
        <Chart 
          options={options} 
          series={isEmpty ? [{ name: 'Trống', data: categories.map((_, i) => [i + 1, null]) as any }] : mappedSeries} 
          type="line" 
          height={350} 
        />
      </div>
    </Card>
  );
};
