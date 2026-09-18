import { Card, CardBody } from '../../../components/ui/Card';
import { FormField } from '../../../components/ui/FormField';
import { Input } from '../../../components/ui/Input';
import { Radio } from '../../../components/ui/Radio';
import { Button } from '../../../components/ui/Button';
import { Textarea } from '../../../components/ui/Textarea';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from './contactSchema';

export const ContactSection = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      package: 'standard',
      message: '',
    },
  });

  const onSubmit = (data: ContactFormData) => {
    console.log('Form data:', data);
    // TODO: Send data to API
    alert('Đã nhận thông tin liên hệ: ' + JSON.stringify(data, null, 2));
  };

  return (
    <section id="contact" className="py-24 px-4 md:px-10 bg-[#F4F7F7]">
      <div className="max-w-[784px] mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-[40px] font-bold text-content-main mb-12 text-center">
          Liên hệ tư vấn
        </h2>

        <Card className="shadow-lg border-transparent rounded-2xl w-full bg-white">
          <CardBody className="p-8">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <FormField label="Họ tên" required error={errors.name?.message}>
                    <Input {...field} placeholder="Nhập họ tên của bạn" className="h-10" hasError={!!errors.name} />
                  </FormField>
                )}
              />
              
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <FormField label="Email" required error={errors.email?.message}>
                    <Input {...field} placeholder="Nhập email của bạn" type="email" className="h-10" hasError={!!errors.email} />
                  </FormField>
                )}
              />
              
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <FormField label="Điện thoại" required error={errors.phone?.message}>
                    <Input {...field} placeholder="Nhập điện thoại của bạn" type="tel" className="h-10" hasError={!!errors.phone} />
                  </FormField>
                )}
              />
              
              <Controller
                name="company"
                control={control}
                render={({ field }) => (
                  <FormField label="Tên công ty" required error={errors.company?.message}>
                    <Input {...field} placeholder="Nhập tên công ty của bạn" className="h-10" hasError={!!errors.company} />
                  </FormField>
                )}
              />

              <Controller
                name="package"
                control={control}
                render={({ field }) => (
                  <FormField label="Bạn đang quan tâm gói sản phẩm nào" error={errors.package?.message}>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-1">
                      {['basic', 'standard', 'advanced'].map((pkg) => (
                        <label 
                          key={pkg}
                          className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition-colors ${field.value === pkg ? 'border-primary ring-1 ring-primary' : 'border-border hover:border-primary'}`}
                          onClick={() => field.onChange(pkg)}
                        >
                          <Radio 
                            name="package" 
                            value={pkg} 
                            inputId={`pkg-${pkg}`} 
                            checked={field.value === pkg} 
                            onChange={() => field.onChange(pkg)} 
                          />
                          <span className="text-sm font-medium text-content-main">
                            {pkg === 'basic' ? 'Cơ bản' : pkg === 'standard' ? 'Tiêu chuẩn' : 'Nâng cao'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </FormField>
                )}
              />

              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <FormField label="Bạn mong muốn được tư vấn về vấn đề gì?" required error={errors.message?.message}>
                    <Textarea 
                      {...field}
                      className="min-h-[120px]"
                      placeholder="Tôi muốn được tư vấn về..."
                      hasError={!!errors.message}
                    />
                  </FormField>
                )}
              />

              <Button type="submit" variant="primary" className="w-full h-10 rounded-md mt-2">
                Gửi
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </section>
  );
};
