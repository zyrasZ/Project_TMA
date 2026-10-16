import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardFooter } from '../../../components/ui/Card';
import { Paginator } from '../../../components/ui/Paginator';
import { useAppToast } from '../../../components/ui/Toast';
import {
  useGetInvoiceConfigs,
  useCreateInvoiceConfig,
  useUpdateInvoiceConfig,
  useDeleteInvoiceConfig
} from '../../../hooks/api/invoices/useInvoiceConfigs';
import type { InvoiceConfig, CreateInvoiceConfigInput } from '../../../types/invoiceConfig';

import { InvoiceConfigHeader } from './components/InvoiceConfigHeader';
import { InvoiceConfigFilters } from './components/InvoiceConfigFilters';
import { InvoiceConfigTable } from './components/InvoiceConfigTable';
import { InvoiceConfigModal } from './components/InvoiceConfigModal';
import { DeleteInvoiceConfigModal } from './components/DeleteInvoiceConfigModal';
import { InvoiceConfigDetailModal } from './components/InvoiceConfigDetailModal';

export const InvoiceConfigPage = () => {
  const { t } = useTranslation('common');
  const { showToast } = useAppToast();

  const [search, setSearch] = useState('');
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(30);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<InvoiceConfig | null>(null);

  // Queries & Mutations
  const { data: configsData, isLoading } = useGetInvoiceConfigs({
    search,
    first,
    rows
  });

  const { mutate: createConfig, isPending: isCreating } = useCreateInvoiceConfig();
  const { mutate: updateConfig, isPending: isUpdating } = useUpdateInvoiceConfig();
  const { mutate: deleteConfig, isPending: isDeleting } = useDeleteInvoiceConfig();

  const configs = configsData?.data || [];
  const totalRecords = configsData?.total || 0;

  const handlePageChange = (event: { first: number; rows: number; page: number }) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setFirst(0); // Reset ve trang 1 khi tim kiem
  };

  const handleOpenAddModal = () => {
    setSelectedConfig(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (config: InvoiceConfig) => {
    setSelectedConfig(config);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (config: InvoiceConfig) => {
    setSelectedConfig(config);
    setIsDeleteModalOpen(true);
  };

  const handleOpenDetailModal = (config: InvoiceConfig) => {
    setSelectedConfig(config);
    setIsDetailModalOpen(true);
  };

  const handleSaveConfig = (data: CreateInvoiceConfigInput) => {
    if (selectedConfig) {
      updateConfig(
        { id: selectedConfig.id, ...data },
        {
          onSuccess: () => {
            showToast({
              title: t('invoiceConfig.toast.success'),
              message: t('invoiceConfig.toast.updateSuccess'),
              severity: 'success'
            });
            setIsModalOpen(false);
            setSelectedConfig(null);
          }
        }
      );
    } else {
      createConfig(data, {
        onSuccess: () => {
          showToast({
            title: t('invoiceConfig.toast.success'),
            message: t('invoiceConfig.toast.addSuccess'),
            severity: 'success'
          });
          setIsModalOpen(false);
        }
      });
    }
  };

  const handleConfirmDelete = () => {
    if (!selectedConfig) return;

    deleteConfig(selectedConfig.id, {
      onSuccess: () => {
        showToast({
          title: t('invoiceConfig.toast.success'),
          message: t('invoiceConfig.toast.deleteSuccess'),
          severity: 'success'
        });
        setIsDeleteModalOpen(false);
        setSelectedConfig(null);
      }
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-full">
      {/* Header trang & Nút thêm cấu hình */}
      <InvoiceConfigHeader onAddConfig={handleOpenAddModal} />

      {/* Card chính chứa Table và Bộ lọc */}
      <Card padding="none" className="bg-white rounded-xl shadow-sm border border-divide overflow-hidden flex flex-col gap-0">
        <CardContent className="mt-0 p-0 text-inherit">
          {/* Vùng bộ lọc và tìm kiếm */}
          <InvoiceConfigFilters search={search} setSearch={handleSearchChange} />

          {/* Bảng dữ liệu cấu hình hóa đơn */}
          <div className="bg-white">
            <InvoiceConfigTable
              configs={configs}
              isLoading={isLoading}
              onEdit={handleOpenEditModal}
              onDelete={handleOpenDeleteModal}
              onRowClick={handleOpenDetailModal}
            />
          </div>
        </CardContent>

        {/* Footer phân trang */}
        <CardFooter className="mt-0 p-4 border-t border-divide bg-white block w-full">
          <Paginator
            first={first}
            rows={rows}
            totalRecords={totalRecords}
            itemName={t('invoiceConfig.itemName')}
            rowsPerPageOptions={[10, 20, 30, 50]}
            onPageChange={handlePageChange}
            className="w-full [&_.p-paginator-current]:mr-auto"
          />
        </CardFooter>
      </Card>

      {/* Modal Thêm mới / Cập nhật cấu hình */}
      <InvoiceConfigModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedConfig(null);
        }}
        config={selectedConfig}
        onSubmit={handleSaveConfig}
        isLoading={isCreating || isUpdating}
      />

      {/* Modal Xác nhận xóa */}
      <DeleteInvoiceConfigModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedConfig(null);
        }}
        config={selectedConfig}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />

      {/* Modal Xem thông tin chi tiết */}
      <InvoiceConfigDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedConfig(null);
        }}
        config={selectedConfig}
      />
    </div>
  );
};
