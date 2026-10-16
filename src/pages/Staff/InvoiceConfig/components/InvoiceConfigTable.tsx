import { useTranslation } from 'react-i18next';
import { PencilSimple, Trash, CheckCircle } from '@phosphor-icons/react';
import type { InvoiceConfig } from '../../../../types/invoiceConfig';
import { Button } from '../../../../components/ui/Button';
import {
  DataTable,
  DataTableTableContainer,
  DataTableTable,
  DataTableTHead,
  DataTableTHeadRow,
  DataTableTHeadCell,
  DataTableTBody,
  DataTableRow,
  DataTableCell,
  DataTableLoading
} from '../../../../components/ui/DataTable';

interface InvoiceConfigTableProps {
  configs: InvoiceConfig[];
  isLoading: boolean;
  onEdit: (config: InvoiceConfig) => void;
  onDelete: (config: InvoiceConfig) => void;
  onRowClick?: (config: InvoiceConfig) => void;
}

export const InvoiceConfigTable = ({
  configs,
  isLoading,
  onEdit,
  onDelete,
  onRowClick,
}: InvoiceConfigTableProps) => {
  const { t } = useTranslation('common');

  return (
    <DataTable className="w-full">
      {isLoading && <DataTableLoading />}
      <DataTableTableContainer className="overflow-x-auto">
        <DataTableTable className="w-full">
          <DataTableTHead>
            <DataTableTHeadRow className="bg-[#EAEBEB] border-b border-border text-[13px]">
              <DataTableTHeadCell className="w-[80px] font-semibold text-content-main pl-6">
                {t('invoiceConfig.table.id')}
              </DataTableTHeadCell>
              <DataTableTHeadCell className="min-w-[160px] font-semibold text-content-main">
                {t('invoiceConfig.table.configName')}
              </DataTableTHeadCell>
              <DataTableTHeadCell className="min-w-[220px] font-semibold text-content-main">
                {t('invoiceConfig.table.provider')}
              </DataTableTHeadCell>
              <DataTableTHeadCell className="w-[100px] font-semibold text-content-main">
                {t('invoiceConfig.table.pattern')}
              </DataTableTHeadCell>
              <DataTableTHeadCell className="w-[120px] font-semibold text-content-main">
                {t('invoiceConfig.table.serial')}
              </DataTableTHeadCell>
              <DataTableTHeadCell className="w-[110px] font-semibold text-content-main">
                {t('invoiceConfig.table.taxRate')}
              </DataTableTHeadCell>
              <DataTableTHeadCell className="w-[100px] font-semibold text-content-main text-center">
                {t('invoiceConfig.table.digitalSignature')}
              </DataTableTHeadCell>
              <DataTableTHeadCell className="w-[120px] font-semibold text-content-main text-center pr-6">
                {t('invoiceConfig.table.actions')}
              </DataTableTHeadCell>
            </DataTableTHeadRow>
          </DataTableTHead>

          <DataTableTBody>
            {configs.length === 0 ? (
              <DataTableRow>
                <DataTableCell colSpan={8} className="py-8 text-center text-content-sub text-sm">
                  {t('invoiceConfig.table.empty')}
                </DataTableCell>
              </DataTableRow>
            ) : (
              configs.map((config) => (
                <DataTableRow
                  key={config.id}
                  onClick={() => onRowClick?.(config)}
                  className="hover:bg-gray-50/80 transition-colors border-b border-divide text-[14px] cursor-pointer"
                >
                  <DataTableCell className="pl-6 text-content-main font-medium">
                    {config.id}
                  </DataTableCell>
                  <DataTableCell className="font-semibold text-content-main">
                    {config.configName}
                  </DataTableCell>
                  <DataTableCell className="text-content-main">
                    {config.provider}
                  </DataTableCell>
                  <DataTableCell className="text-content-main">
                    {config.pattern}
                  </DataTableCell>
                  <DataTableCell className="text-content-main">
                    {config.serial}
                  </DataTableCell>
                  <DataTableCell className="text-content-main">
                    {config.taxRate}
                  </DataTableCell>
                  <DataTableCell className="text-center">
                    {config.hasDigitalSignature ? (
                      <span className="inline-flex items-center justify-center">
                        <CheckCircle
                          size={22}
                          className="text-primary"
                          weight="regular"
                        />
                      </span>
                    ) : null}
                  </DataTableCell>
                  <DataTableCell className="text-center pr-6">
                    <div
                      className="flex items-center justify-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="text"
                        size="sm"
                        iconOnly
                        onClick={() => onEdit(config)}
                        title={t('invoiceConfig.table.editTooltip')}
                        aria-label={t('invoiceConfig.table.editTooltip')}
                        className="hover:!text-turquoise-700"
                      >
                        <PencilSimple size={19} weight="regular" />
                      </Button>
                      <Button
                        variant="text"
                        size="sm"
                        iconOnly
                        onClick={() => onDelete(config)}
                        title={t('invoiceConfig.table.deleteTooltip')}
                        aria-label={t('invoiceConfig.table.deleteTooltip')}
                        className="hover:!text-alert hover:!bg-red-50"
                      >
                        <Trash size={19} weight="regular" />
                      </Button>
                    </div>
                  </DataTableCell>
                </DataTableRow>
              ))
            )}
          </DataTableTBody>
        </DataTableTable>
      </DataTableTableContainer>
    </DataTable>
  );
};
