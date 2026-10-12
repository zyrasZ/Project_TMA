import { Modal } from '../../../../../components/ui/Modal';
import { Select } from '../../../../../components/ui/Select';
import { Input } from '../../../../../components/ui/Input';
import { Button } from '../../../../../components/ui/Button';
import { Check, X } from '@phosphor-icons/react';
import { useEffect } from 'react';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  code: z.string().min(1, 'Vui lòng chọn mã bồn'),
  name: z.string().min(1, 'Vui lòng nhập tên bồn'),
  fuelType: z.string().min(1, 'Vui lòng chọn loại nhiên liệu'),
  tankType: z.string().optional(),
  capacity: z.string().min(1, 'Vui lòng nhập dung tích bồn'),
  height: z.string().optional(),
  length: z.string().optional(),
  lowWarning: z.string().optional(),
  highWarning: z.string().optional(),
  sensorSerial: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface TankFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tank: any) => void;
  initialData?: any;
}

export const TankFormModal = ({ isOpen, onClose, onSave, initialData }: TankFormModalProps) => {
  const isEdit = !!initialData;

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '', name: '', fuelType: '', tankType: '', capacity: '', height: '', length: '', lowWarning: '', highWarning: '', sensorSerial: ''
    }
  });

  useEffect(() => {
    if (isOpen) {
      reset(initialData || {
        code: '', name: '', fuelType: '', tankType: '', capacity: '', height: '', length: '', lowWarning: '', highWarning: '', sensorSerial: ''
      });
    }
  }, [isOpen, initialData, reset]);

  const formatNumber = (value: string) => {
    if (!value) return '';
    const numericValue = value.toString().replace(/\D/g, '');
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const onSubmit = (data: FormValues) => {
    onSave(data);
    onClose();
  };

  return (
    <Modal
      visible={isOpen}
      onHide={onClose}
      header={<span className="text-[18px] font-bold">{isEdit ? 'Cập nhật bồn bể' : 'Thêm bồn mới'}</span>}
      className="w-[90vw] max-w-[1020px]"
    >
      <div className="flex flex-col">
        <div className="bg-surface p-6 pb-4">
          <div className="grid grid-cols-2 gap-4">
            <Controller name="code" control={control} render={({ field }) => (
              <Input {...field} disabled className="text-content-main border-transparent" error={errors.code?.message} label="Mã bồn" required placeholder="Nhập mã bồn" />
            )} />
            <div className="hidden md:block"></div>
            
            <Controller name="name" control={control} render={({ field }) => (
              <Input {...field} error={errors.name?.message} label="Tên bồn" required placeholder="Nhập tên bồn" />
            )} />
            <Controller name="fuelType" control={control} render={({ field }) => (
              <Select {...field} error={errors.fuelType?.message} label="Loại nhiên liệu" required placeholder="Chọn loại nhiên liệu" options={[{label: 'Xăng RON 95-III', value: 'Xăng RON 95-III'}, {label: 'Dầu DO 0.05S-II', value: 'Dầu DO 0.05S-II'}]} onChange={(val) => field.onChange(val?.value ?? val)} />
            )} />
          </div>
        </div>

        <div className="p-6 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <Controller name="tankType" control={control} render={({ field }) => (
            <Select {...field} error={errors.tankType?.message} label="Kiểu bồn" placeholder="Chọn kiểu bồn" options={[{label: 'Bồn ngầm', value: 'underground'}, {label: 'Bồn đứng', value: 'vertical'}]} onChange={(val) => field.onChange(val?.value ?? val)} />
          )} />
          <Controller name="capacity" control={control} render={({ field }) => (
            <Input {...field} onChange={(e: any) => field.onChange(formatNumber(e.target.value))} error={errors.capacity?.message} label="Dung tích bồn" required placeholder="Nhập dung tích bồn" suffixNode={<span className="text-content-sub">Lít</span>} />
          )} />
          <Controller name="height" control={control} render={({ field }) => (
            <Input {...field} onChange={(e: any) => field.onChange(formatNumber(e.target.value))} error={errors.height?.message} label="Chiều cao" placeholder="Nhập chiều cao bồn" suffixNode={<span className="text-content-sub">mm</span>} />
          )} />
          <Controller name="length" control={control} render={({ field }) => (
            <Input {...field} onChange={(e: any) => field.onChange(formatNumber(e.target.value))} error={errors.length?.message} label="Chiều dài" placeholder="Nhập chiều dài bồn" suffixNode={<span className="text-content-sub">mm</span>} />
          )} />
          <Controller name="lowWarning" control={control} render={({ field }) => (
            <Input {...field} onChange={(e: any) => field.onChange(formatNumber(e.target.value))} error={errors.lowWarning?.message} label="Cảnh báo mức thấp" placeholder="Nhập mức cảnh báo" suffixNode={<span className="text-content-sub">Lít</span>} />
          )} />
          <Controller name="highWarning" control={control} render={({ field }) => (
            <Input {...field} onChange={(e: any) => field.onChange(formatNumber(e.target.value))} error={errors.highWarning?.message} label="Cảnh báo mức cao" placeholder="Nhập mức cảnh báo" suffixNode={<span className="text-content-sub">Lít</span>} />
          )} />
          <Controller name="sensorSerial" control={control} render={({ field }) => (
            <Input {...field} error={errors.sensorSerial?.message} label="Cảm biến đo" placeholder="Nhập Serial No" wrapperClassName="col-span-2" />
          )} />
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-3 p-4 px-6 border-t border-divide">
          <Button variant="secondary" onClick={onClose} className="px-6 border-none bg-gray-100 hover:bg-gray-200 flex items-center gap-2">
            <X weight="bold" /> Hủy
          </Button>
          <Button variant="primary" className="px-6 flex items-center gap-2" onClick={handleSubmit(onSubmit)}>
            <Check weight="bold" /> Lưu
          </Button>
        </div>
      </div>
    </Modal>
  );
};
