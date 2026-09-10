import React, { forwardRef } from 'react';
import { Calendar, CalendarProps } from 'primereact/calendar';
import { FormField } from '../FormField';
import { CalendarBlank, ArrowRight } from '@phosphor-icons/react';

export interface DatePickerProps extends Omit<CalendarProps, 'pt'> {
  label?: string;
  error?: string;
  wrapperClassName?: string;
}

export const DatePicker = forwardRef<any, DatePickerProps>((props, ref) => {
  const { label, error, required, wrapperClassName = '', className = '', ...rest } = props;

  const baseClasses = `
    w-full h-10 rounded-lg outline-none transition-colors duration-200 border bg-white flex items-center
    ${error ? '!border-alert' : 'border-border'}
    ${!props.disabled ? 'hover:border-primary focus-within:!border-primary' : ''}
    ${props.disabled ? 'bg-surface cursor-not-allowed opacity-70' : ''}
  `;

  const datePickerComponent = (
    <Calendar
      ref={ref}
      className={`${baseClasses} ${className}`.trim()}
      {...rest}
      dateFormat="dd/mm/yy" // dd/mm/yyyy in PrimeReact format is dd/mm/yy
      pt={{
        root: { className: 'relative flex-1 h-full' },
        input: { 
          className: `
            w-full h-full px-3 !outline-none !shadow-none !ring-0 bg-transparent text-sm text-content-main placeholder:text-content-hint
            ${props.disabled ? 'cursor-not-allowed' : ''}
          `
        },
        // The calendar icon
        dropdownButton: {
          root: { 
            className: `
              w-10 h-full flex items-center justify-center bg-transparent border-none outline-none
              ${error ? 'text-alert' : 'text-content-hint hover:text-content-main'}
              transition-colors duration-200 cursor-pointer
            `
          },
          icon: () => <CalendarBlank size={16} />
        },
        panel: { className: 'bg-white rounded-lg shadow-lg border border-border mt-1 z-50 p-2' },
        header: { className: 'flex items-center justify-between pb-2 mb-2 border-b border-border' },
        title: { className: 'font-medium text-content-main text-sm' },
        previousButton: { className: 'w-8 h-8 flex items-center justify-center rounded-md hover:bg-surface text-content-hint' },
        nextButton: { className: 'w-8 h-8 flex items-center justify-center rounded-md hover:bg-surface text-content-hint' },
        table: { className: 'w-full border-collapse' },
        tableHeaderCell: { className: 'text-xs text-content-hint p-1 font-normal' },
        day: { className: 'p-1' },
        dayLabel: ({ context }: any) => ({
          className: `
            w-8 h-8 flex items-center justify-center rounded-md text-sm cursor-pointer transition-colors
            ${context.selected ? 'bg-primary text-white font-medium' : 'text-content-main hover:bg-surface'}
            ${context.otherMonth ? 'text-content-hint/50' : ''}
            ${context.today && !context.selected ? 'border border-primary text-primary' : ''}
          `
        }),
      }}
      showIcon
    />
  );

  if (label || error) {
    return (
      <FormField label={label} error={error} required={required} className={wrapperClassName}>
        {datePickerComponent}
      </FormField>
    );
  }

  return <div className={`w-full ${wrapperClassName}`}>{datePickerComponent}</div>;
});

DatePicker.displayName = 'DatePicker';
