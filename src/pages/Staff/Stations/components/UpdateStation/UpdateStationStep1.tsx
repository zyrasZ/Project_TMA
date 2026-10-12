import { Select } from '../../../../../components/ui/Select';
import { Input } from '../../../../../components/ui/Input';

import { Control, Controller, FieldErrors } from 'react-hook-form';
import { z } from 'zod';

export const stationStep1Schema = z.object({
  name: z.string().min(1, 'Tên trạm không được để trống'),
  type: z.string().min(1, 'Loại trạm không được để trống'),
  province: z.string().min(1, 'Tỉnh thành không được để trống'),
  address: z.string().min(1, 'Địa chỉ không được để trống'),
});

export type StationStep1FormValues = z.infer<typeof stationStep1Schema>;

interface UpdateStationStep1Props {
  station: any;
  control: Control<StationStep1FormValues>;
  errors: FieldErrors<StationStep1FormValues>;
}

export const UpdateStationStep1 = ({ 
  station, 
  control,
  errors
}: UpdateStationStep1Props) => {
  return (
    <div className="flex flex-col gap-5 px-6">
      <div className="grid grid-cols-2 gap-5">
        {/* ID CBX */}
        <Input 
          label="ID CBX"
          wrapperClassName="col-span-2"
          value={station?.id || '123456'} 
          disabled 
          className="bg-gray-50" 
        />

        {/* Tên trạm */}
        <Controller name="name" control={control} render={({ field }) => (
          <Input 
            {...field}
            label="Tên trạm"
            required
            wrapperClassName="col-span-2"
            placeholder="Nhập tên trạm" 
            error={errors.name?.message as string}
          />
        )} />

        {/* Loại trạm */}
        <Controller name="type" control={control} render={({ field }) => (
          <Select
            {...field}
            label="Loại trạm"
            required
            options={[
              { label: 'Cửa hàng', value: 'store' },
              { label: 'Đại lý', value: 'agent' },
              { label: 'Trạm nội bộ', value: 'internal' }
            ]}
            onChange={(val) => field.onChange(val?.value ?? val)}
            placeholder="Chọn loại trạm"
            error={errors.type?.message as string}
          />
        )} />

        {/* Tỉnh thành */}
        <Controller name="province" control={control} render={({ field }) => (
          <Select
            {...field}
            label="Tỉnh thành"
            required
            options={[
              { label: 'Hồ Chí Minh', value: 'hcm' },
              { label: 'Hà Nội', value: 'hn' },
              { label: 'Đà Nẵng', value: 'dn' },
              { label: 'Cần Thơ', value: 'ct' },
              { label: 'Hải Phòng', value: 'hp' }
            ]}
            onChange={(val) => field.onChange(val?.value ?? val)}
            placeholder="Chọn tỉnh thành"
            error={errors.province?.message as string}
          />
        )} />

        {/* Địa chỉ */}
        <Controller name="address" control={control} render={({ field }) => (
          <Input 
            {...field}
            label="Địa chỉ"
            required
            wrapperClassName="col-span-2"
            placeholder="Nhập địa chỉ" 
            error={errors.address?.message as string}
          />
        )} />
      </div>
    </div>
  );
};
