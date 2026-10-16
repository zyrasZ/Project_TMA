import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Check } from '@phosphor-icons/react';
import { Modal } from '../../../../components/ui/Modal';
import { Button } from '../../../../components/ui/Button';
import { Input } from '../../../../components/ui/Input';
import { Select } from '../../../../components/ui/Select';
import { MultiSelect } from '../../../../components/ui/MultiSelect';
import { ProviderDetailFields } from './ProviderDetailFields';
import {
  STATION_OPTIONS,
  TAX_RATE_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
  PROVIDER_OPTIONS,
  DEFAULT_PROVIDER_URLS,
} from '../constants';
import { formSchema, type FormValues } from '../schemas';
import type {
  InvoiceConfig,
  CreateInvoiceConfigInput,
  InvoiceTaxRate,
  PaymentMethod,
  InvoiceProvider,
} from '../../../../types/invoiceConfig';

interface InvoiceConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: InvoiceConfig | null;
  onSubmit: (data: CreateInvoiceConfigInput) => void;
  isLoading?: boolean;
}

export const InvoiceConfigModal = ({
  isOpen,
  onClose,
  config,
  onSubmit,
  isLoading,
}: InvoiceConfigModalProps) => {
  const { t } = useTranslation('common');
  const isEdit = Boolean(config);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      configName: '',
      stationIds: [],
      taxRate: '',
      paymentMethod: '',
      provider: '',
      taxCode: '',
      serial: '',
      username: '',
      password: '',
      apiBaseUrl: '',
      hasDigitalSignature: false,
    },
  });

  // Theo dõi đơn vị cung cấp đang chọn để quyết định hiển thị các trường chi tiết
  const selectedProvider = useWatch({ control, name: 'provider' });
  const hasProvider = Boolean(selectedProvider);

  // Đồng bộ lại dữ liệu form mỗi khi mở popup (Thêm mới hoặc Chỉnh sửa)
  useEffect(() => {
    if (isOpen) {
      const initialStationIds = config?.stationIds?.length
        ? config.stationIds
        : config?.stationId && config.stationId !== 'all'
        ? [config.stationId]
        : [];

      reset({
        configName: config?.configName ?? '',
        stationIds: initialStationIds,
        taxRate: config?.taxRate ?? '',
        paymentMethod: config?.paymentMethod ?? '',
        provider: config?.provider ?? '',
        taxCode: config?.taxCode ?? '',
        serial: config?.serial ?? '',
        username: config?.username ?? '',
        password: config?.password ?? '',
        apiBaseUrl: config?.apiBaseUrl ?? '',
        hasDigitalSignature: config?.hasDigitalSignature ?? false,
      });
    }
  }, [config, isOpen, reset]);

  // Xử lý submit form
  const onFormSubmit = (data: FormValues) => {
    onSubmit({
      configName: data.configName,
      stationIds: data.stationIds,
      stationId: data.stationIds[0] || 'all',
      taxRate: data.taxRate as InvoiceTaxRate,
      paymentMethod: data.paymentMethod as PaymentMethod,
      provider: data.provider as InvoiceProvider,
      pattern: config?.pattern ?? '1',
      serial: data.serial,
      taxCode: data.taxCode,
      username: data.username,
      password: data.password,
      apiBaseUrl: data.apiBaseUrl,
      hasDigitalSignature: data.hasDigitalSignature ?? false,
    });
  };

  // Footer chứa 2 nút: Hủy và Lưu
  const footer = (
    <div className="flex items-center justify-end gap-3 w-full">
      <Button
        type="button"
        variant="secondary"
        onClick={onClose}
        className="px-5 flex items-center gap-1.5 font-medium bg-[#EAEBEB] hover:bg-gray-200 border-none text-content-main"
      >
        <X size={16} weight="bold" />
        <span>{t('invoiceConfig.modal.cancel')}</span>
      </Button>
      <Button
        type="button"
        variant="primary"
        onClick={handleSubmit(onFormSubmit)}
        disabled={isLoading}
        className="px-6 flex items-center gap-1.5 font-medium"
      >
        <Check size={16} weight="bold" />
        <span>{t('invoiceConfig.modal.save')}</span>
      </Button>
    </div>
  );

  return (
    <Modal
      visible={isOpen}
      onHide={onClose}
      header={isEdit ? t('invoiceConfig.modal.editTitle') : t('invoiceConfig.modal.addTitle')}
      footer={footer}
      className="w-[92vw] max-w-[940px]"
      contentClassName="p-0 bg-white"
    >
      <div className="flex flex-col">
        {/* Phần 1: Thông tin chung cấu hình hóa đơn (nền xám nhạt bg-surface) */}
        <div className="bg-surface p-6 sm:p-8 flex flex-col gap-5 border-b border-divide/60">
          <Controller
            name="configName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={t('invoiceConfig.modal.configName')}
                placeholder={t('invoiceConfig.modal.configNamePlaceholder')}
                required
                error={errors.configName?.message}
              />
            )}
          />

          <Controller
            name="stationIds"
            control={control}
            render={({ field }) => (
              <MultiSelect
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                label={t('invoiceConfig.modal.station')}
                placeholder={t('invoiceConfig.modal.stationPlaceholder')}
                options={STATION_OPTIONS}
                selectAllLabel={t('invoiceConfig.modal.stationAll')}
                required
                error={errors.stationIds?.message}
              />
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Controller
              name="taxRate"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  onBlur={field.onBlur}
                  label={t('invoiceConfig.modal.taxRate')}
                  placeholder={t('invoiceConfig.modal.taxRatePlaceholder')}
                  options={TAX_RATE_OPTIONS}
                  required
                  error={errors.taxRate?.message}
                />
              )}
            />
            <Controller
              name="paymentMethod"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  onBlur={field.onBlur}
                  label={t('invoiceConfig.modal.paymentMethod')}
                  placeholder={t('invoiceConfig.modal.paymentMethodPlaceholder')}
                  options={PAYMENT_METHOD_OPTIONS}
                  required
                  error={errors.paymentMethod?.message}
                />
              )}
            />
          </div>
        </div>

        {/* Phần 2: Cấu hình nhà cung cấp hóa đơn (nền trắng bg-white) */}
        <div className="bg-white p-6 sm:p-8 flex flex-col gap-5">
          <Controller
            name="provider"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.value);
                  // Tự động điền URL API mẫu nếu ô Địa chỉ API đang trống
                  if (e.value && !getValues('apiBaseUrl')) {
                    setValue('apiBaseUrl', DEFAULT_PROVIDER_URLS[e.value] || '', {
                      shouldValidate: true,
                    });
                  }
                }}
                onBlur={field.onBlur}
                label={t('invoiceConfig.modal.provider')}
                placeholder={t('invoiceConfig.modal.providerPlaceholder')}
                options={PROVIDER_OPTIONS}
                required
                error={errors.provider?.message}
              />
            )}
          />

          {/* Các trường chi tiết của nhà cung cấp — chỉ hiển thị sau khi đã chọn đơn vị cung cấp */}
          {hasProvider && (
            <ProviderDetailFields
              control={control}
              errors={errors}
              selectedProvider={selectedProvider}
              t={t}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};
