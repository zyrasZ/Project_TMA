import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import type { TFunction } from 'i18next';
import { Input } from '../../../../components/ui/Input';
import { Checkbox } from '../../../../components/ui/Checkbox';
import { DEFAULT_PROVIDER_URLS } from '../constants';
import type { FormValues } from '../schemas';

interface ProviderDetailFieldsProps {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  selectedProvider: string;
  t: TFunction;
}

export const ProviderDetailFields = ({
  control,
  errors,
  selectedProvider,
  t,
}: ProviderDetailFieldsProps) => {
  return (
    <div className="flex flex-col gap-5">
      {/* Hàng 1: Mã số thuế & Ký hiệu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Controller
          name="taxCode"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label={t('invoiceConfig.modal.taxCode')}
              placeholder={t('invoiceConfig.modal.taxCodePlaceholder')}
              required
              error={errors.taxCode?.message}
            />
          )}
        />
        <Controller
          name="serial"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label={t('invoiceConfig.modal.serial')}
              placeholder={t('invoiceConfig.modal.serialPlaceholder')}
              required
              error={errors.serial?.message}
            />
          )}
        />
      </div>

      {/* Hàng 2: Tên đăng nhập & Mật khẩu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              autoComplete="off"
              label={t('invoiceConfig.modal.username')}
              placeholder={t('invoiceConfig.modal.usernamePlaceholder')}
              required
              error={errors.username?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              autoComplete="new-password"
              label={t('invoiceConfig.modal.password')}
              placeholder={t('invoiceConfig.modal.passwordPlaceholder')}
              required
              error={errors.password?.message}
            />
          )}
        />
      </div>

      {/* Hàng 3: Địa chỉ API (Base URL) */}
      <Controller
        name="apiBaseUrl"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label={t('invoiceConfig.modal.apiBaseUrl')}
            placeholder={
              DEFAULT_PROVIDER_URLS[selectedProvider] ||
              t('invoiceConfig.modal.apiBaseUrlPlaceholder')
            }
            required
            error={errors.apiBaseUrl?.message}
          />
        )}
      />

      {/* Hàng 4: Chữ ký số */}
      <Controller
        name="hasDigitalSignature"
        control={control}
        render={({ field }) => (
          <Checkbox
            checked={field.value ?? false}
            onChange={(e) => field.onChange(e.checked)}
            label={t('invoiceConfig.modal.hasDigitalSignature')}
          />
        )}
      />
    </div>
  );
};
