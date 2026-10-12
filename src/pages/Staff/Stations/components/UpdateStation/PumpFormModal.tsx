import { Modal } from '../../../../../components/ui/Modal';
import { Select } from '../../../../../components/ui/Select';
import { Input } from '../../../../../components/ui/Input';
import { Button } from '../../../../../components/ui/Button';
import { Check } from '@phosphor-icons/react';
import { useEffect } from 'react';
import { z } from 'zod';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  code: z.string().min(1, 'Vui lòng chọn mã vòi'),
  name: z.string().min(1, 'Vui lòng nhập tên vòi bơm'),
  tankName: z.string().min(1, 'Vui lòng chọn bồn cấp nhiên liệu'),
});

type FormValues = z.infer<typeof formSchema>;

interface PumpFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pump: any) => void;
  tanks: any[];
  initialData?: any;
}

export const PumpFormModal = ({ isOpen, onClose, onSave, tanks, initialData }: PumpFormModalProps) => {
  const isEdit = !!initialData;

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '', name: '', tankName: ''
    }
  });

  useEffect(() => {
    if (isOpen) {
      reset(initialData || {
        code: '', name: '', tankName: ''
      });
    }
  }, [isOpen, initialData, reset]);

  // Tự động suy ra loại nhiên liệu theo bồn được chọn
  const currentTankName = useWatch({ control, name: 'tankName' });
  const selectedTank = tanks.find(t => t.name === currentTankName);
  const derivedFuelType = selectedTank?.fuelType || '';

  const onSubmit = (data: FormValues) => {
    onSave({ 
      ...data,
      tankCode: selectedTank?.code || '', 
      fuelType: derivedFuelType 
    });
    onClose();
  };

  return (
    <Modal
      visible={isOpen}
      onHide={onClose}
      header={<span className="text-[18px] font-bold">{isEdit ? 'Cập nhật vòi bơm' : 'Thêm vòi bơm mới'}</span>}
      className="w-[90vw] max-w-[500px]"
    >
      <div className="flex flex-col">
        <div className="flex flex-col gap-5 p-6 pb-6">
        <Controller name="code" control={control} render={({ field }) => (
          <Select {...field} disabled={isEdit} className={isEdit ? "border-transparent text-content-main" : ""} error={errors.code?.message} label="Mã vòi" required options={[{label: '01', value: '01'}, {label: '02', value: '02'}]} placeholder="Chọn mã vòi bơm" onChange={(val) => field.onChange(val?.value ?? val)} />
        )} />
        
        <Controller name="name" control={control} render={({ field }) => (
          <Input {...field} error={errors.name?.message} label="Tên vòi bơm" required placeholder="Nhập tên vòi bơm" />
        )} />
        
        <Controller name="tankName" control={control} render={({ field }) => (
          <Select {...field} error={errors.tankName?.message} label="Bơm từ bồn" required options={tanks.map(t => ({label: t.name, value: t.name}))} placeholder={tanks.length ? "Chọn bồn" : "Chưa có bồn nào"} onChange={(val) => field.onChange(val?.value ?? val)} />
        )} />
        
        <Input 
          label="Loại nhiên liệu"
          required
          disabled 
          className="border-transparent text-content-main" 
          placeholder="Tự động hiển thị theo bồn" 
          value={derivedFuelType}
        />
        </div>
        
        <div className="flex items-center justify-end gap-3 p-4 px-6 border-t border-divide">
          <Button variant="secondary" onClick={onClose} className="px-6 border-none bg-gray-100 hover:bg-gray-200">
            Hủy
          </Button>
          <Button variant="primary" className="px-6 flex items-center gap-2" onClick={handleSubmit(onSubmit)}>
            <Check weight="bold" /> Lưu
          </Button>
        </div>
      </div>
    </Modal>
  );
};
