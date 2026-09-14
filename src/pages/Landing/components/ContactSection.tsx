import { useState } from 'react';
import { Card, CardBody } from '../../../components/ui/Card';
import { FormField } from '../../../components/ui/FormField';
import { Input } from '../../../components/ui/Input';
import { Radio } from '../../../components/ui/Radio';
import { Button } from '../../../components/ui/Button';

export const ContactSection = () => {
  const [selectedPackage, setSelectedPackage] = useState('standard');

  return (
    <section id="contact" className="py-24 px-4 md:px-10 bg-[#F4F7F7]">
      <div className="max-w-[784px] mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-[40px] font-bold text-content-main mb-12 text-center">
          Liên hệ tư vấn
        </h2>

        <Card className="shadow-lg border-transparent rounded-2xl w-full bg-white">
          <CardBody className="p-8">
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <FormField label="Họ tên" required>
                <Input placeholder="Nhập họ tên của bạn" className="h-10" />
              </FormField>
              
              <FormField label="Email" required>
                <Input placeholder="Nhập email của bạn" type="email" className="h-10" />
              </FormField>
              
              <FormField label="Điện thoại" required>
                <Input placeholder="Nhập điện thoại của bạn" type="tel" className="h-10" />
              </FormField>
              
              <FormField label="Tên công ty">
                <Input placeholder="Nhập tên công ty của bạn" className="h-10" />
              </FormField>

              <FormField label="Bạn đang quan tâm gói sản phẩm nào">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-1">
                  <label 
                    className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition-colors ${selectedPackage === 'basic' ? 'border-primary ring-1 ring-primary' : 'border-border hover:border-primary'}`}
                    onClick={() => setSelectedPackage('basic')}
                  >
                    <Radio name="package" value="basic" inputId="pkg-basic" checked={selectedPackage === 'basic'} onChange={() => setSelectedPackage('basic')} />
                    <span className="text-sm font-medium text-content-main">Cơ bản</span>
                  </label>
                  <label 
                    className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition-colors ${selectedPackage === 'standard' ? 'border-primary ring-1 ring-primary' : 'border-border hover:border-primary'}`}
                    onClick={() => setSelectedPackage('standard')}
                  >
                    <Radio name="package" value="standard" inputId="pkg-standard" checked={selectedPackage === 'standard'} onChange={() => setSelectedPackage('standard')} />
                    <span className="text-sm font-medium text-content-main">Tiêu chuẩn</span>
                  </label>
                  <label 
                    className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition-colors ${selectedPackage === 'advanced' ? 'border-primary ring-1 ring-primary' : 'border-border hover:border-primary'}`}
                    onClick={() => setSelectedPackage('advanced')}
                  >
                    <Radio name="package" value="advanced" inputId="pkg-advanced" checked={selectedPackage === 'advanced'} onChange={() => setSelectedPackage('advanced')} />
                    <span className="text-sm font-medium text-content-main">Nâng cao</span>
                  </label>
                </div>
              </FormField>

              <FormField label="Bạn mong muốn được tư vấn về vấn đề gì?">
                <textarea 
                  className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm placeholder:text-content-sub focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-[120px] resize-y"
                  placeholder="Tôi muốn được tư vấn về..."
                ></textarea>
              </FormField>

              <Button variant="primary" className="w-full h-10 rounded-md mt-2">
                Gửi
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </section>
  );
};
