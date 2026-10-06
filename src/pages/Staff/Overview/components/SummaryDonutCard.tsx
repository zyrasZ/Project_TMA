import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../../components/ui/Card';

interface SummaryDonutCardProps {
  title: string;
  icon: React.ReactNode;
  data: { label: string; value: number; color: string }[];
  totalLabel: string;
}

export const SummaryDonutCard = ({ title, icon, data, totalLabel }: SummaryDonutCardProps) => {
  const { t } = useTranslation();
  const isEmpty = !data || data.length === 0 || data.every(item => item.value === 0);

  const series = isEmpty ? [1] : data.map(item => item.value);
  const labels = isEmpty ? [t('overview.revenue.noData')] : data.map(item => item.label);
  const colors = isEmpty ? ['#e6f4f1'] : data.map(item => item.color);

  const options: ApexOptions = {
    chart: {
      type: 'donut',
      toolbar: { show: false }
    },
    labels: labels,
    colors: colors,
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '14px',
              fontWeight: 500,
              color: '#718096',
              offsetY: 20
            },
            value: {
              show: true,
              fontSize: '32px',
              fontWeight: 700,
              color: '#1a202c',
              offsetY: -10,
              formatter: (val) => String(val)
            },
            total: {
              show: true,
              showAlways: true,
              label: totalLabel,
              fontSize: '14px',
              fontWeight: 500,
              color: '#718096',
              formatter: function () {
                if (isEmpty) return '0';
                return data.reduce((a, b) => a + b.value, 0).toString();
              }
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 0
    },
    legend: {
      show: false // We use custom legend below to match grid layout
    },
    tooltip: {
      enabled: true
    }
  };

  return (
    <Card className="flex flex-col bg-white shadow-sm border border-border-neutral h-full overflow-hidden p-0">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border-neutral">
        {icon}
        <h3 className="text-[15px] font-semibold text-gray-800">{title}</h3>
      </div>
      
      {/* Body */}
      <div className="flex-1 flex flex-col p-5">
        <div className="flex justify-center relative">
          <Chart options={options} series={series} type="donut" height={220} />
        </div>

        {!isEmpty && (
          <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-auto pt-4">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-[2px] flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-[13px] text-gray-500 truncate">{item.label}</span>
                <span className="text-[14px] font-bold text-gray-800 ml-1">{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
