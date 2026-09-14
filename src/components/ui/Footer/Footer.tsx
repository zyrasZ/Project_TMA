import React from 'react';
import { cn } from '../../../lib/utils';
import { EnvelopeSimple, Phone, MapPin } from '@phosphor-icons/react';

export interface ContactInfo {
  icon?: React.ReactNode;
  lines: string[];
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  copyright?: string;
  contactTitle?: string;
  contacts?: ContactInfo[];
  showScrollToTop?: boolean;
  containerClassName?: string;
}

export const Footer = React.forwardRef<HTMLElement, FooterProps>(
  (
    {
      logo,
      copyright = '2024 TMA Solutions © All Rights Reserved',
      contactTitle = 'Liên hệ',
      contacts = [
        {
          icon: <EnvelopeSimple size={24} />,
          lines: ['nxthong@tma.com.vn', 'phuongpv@sei.com.vn'],
        },
        {
          icon: <Phone size={24} />,
          lines: ['(0383) 927 958 (Nguyễn Xuân Thông)', '(0933) 133 188 (Phạm Văn Phương)'],
        },
        {
          icon: <MapPin size={24} />,
          lines: ['Tòa nhà TMA, đường số 10, Công viên phần mềm Quang Trung, Quận 12, Hồ Chí Minh'],
        },
      ],
      showScrollToTop = true,
      className,
      containerClassName,
      ...props
    },
    ref
  ) => {

    return (
      <footer
        ref={ref}
        className={cn('bg-grey-neutral-900 text-white py-12 lg:py-16 relative', className)}
        {...props}
      >
        <div
          className={cn(
            'max-w-[1440px] mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between gap-12',
            containerClassName
          )}
        >
          {/* Left: Logo & Copyright */}
          <div className="flex flex-col gap-6 items-start">
            <div className="flex-shrink-0 cursor-pointer">
              {logo || <img src="/logo.png" alt="TMA Logo" className="h-10" />}
            </div>
            <p className="text-body-3 text-white/70">{copyright}</p>
          </div>

          {/* Right: Contact Info */}
          <div className="flex flex-col gap-6 md:min-w-[450px]">
            <h3 className="text-h6 font-bold text-white">{contactTitle}</h3>
            <div className="flex flex-col gap-5">
              {contacts.map((contact, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="text-white/70 mt-1 flex-shrink-0">{contact.icon}</div>
                  <div className="flex flex-col gap-1">
                    {contact.lines.map((line, i) => (
                      <span key={i} className="text-body-2 text-white/90">
                        {line}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </footer>
    );
  }
);

Footer.displayName = 'Footer';
