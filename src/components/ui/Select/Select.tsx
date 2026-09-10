import React, { forwardRef } from 'react';
import { Dropdown, DropdownProps } from 'primereact/dropdown';
import { MultiSelect, MultiSelectProps } from 'primereact/multiselect';
import { FormField } from '../FormField';

// Props cho Single Select
export interface SelectSingleProps extends Omit<DropdownProps, 'pt'> {
  label?: string;
  error?: string;
  required?: boolean;
  multiple?: false;
  wrapperClassName?: string;
}

// Props cho Multi Select
export interface SelectMultiProps extends Omit<MultiSelectProps, 'pt'> {
  label?: string;
  error?: string;
  required?: boolean;
  multiple: true;
  wrapperClassName?: string;
}

export type SelectProps = SelectSingleProps | SelectMultiProps;

export const Select = forwardRef<any, SelectProps>((props, ref) => {
  const { label, error, required, multiple, wrapperClassName = '', className = '', ...rest } = props;

  // CSS chung cho cả 2 loại Select
  const baseClasses = `
    w-full h-10 rounded-lg outline-none transition-colors duration-200 border bg-white flex items-center
    ${error ? '!border-alert' : 'border-border'}
    ${!props.disabled ? 'hover:border-primary focus:!border-primary' : ''}
    ${props.disabled ? 'bg-surface cursor-not-allowed opacity-70' : ''}
  `;

  // PT dùng chung cho cả Panel của Dropdown và MultiSelect
  const panelPT = {
    panel: { className: 'bg-white rounded-lg shadow-lg border border-border mt-1 z-50 overflow-hidden' },
    wrapper: { className: 'max-h-60 overflow-auto' },
    list: { className: 'py-1 flex flex-col gap-1' },
    item: ({ context }: any) => ({
      className: `
        px-3 py-2 cursor-pointer flex items-center justify-between mx-1 rounded-md transition-colors text-sm
        ${context.selected ? 'bg-primary/10 text-primary font-medium' : 'text-content-main hover:bg-surface'}
      `
    })
  };

  const selectComponent = multiple ? (
    <MultiSelect
      ref={ref}
      className={`${baseClasses} ${className}`.trim()}
      {...(rest as MultiSelectProps)}
      display="chip"
      pt={{
        root: { className: 'relative' },
        labelContainer: { className: 'flex-1 h-full overflow-hidden flex items-center px-2' },
        label: { className: 'flex gap-1 items-center h-full' },
        // Chips (Pills)
        token: { className: 'bg-surface border border-border rounded-md px-2 h-6 flex items-center gap-1 text-xs text-content-main' },
        tokenLabel: { className: '' },
        removeTokenIcon: { className: 'pi pi-times text-[10px] cursor-pointer hover:text-alert transition-colors ml-1' },
        trigger: { className: `w-10 h-full flex items-center justify-center text-content-hint [&>svg]:w-3 [&>svg]:h-3 ${error ? '!text-alert' : ''}` },
        clearIcon: { className: `pi pi-times text-xs cursor-pointer hover:text-content-main mr-2 text-content-hint ${error ? '!text-alert' : ''}` },
        
        ...panelPT,
        header: { className: 'p-2 border-b border-border flex items-center gap-2 bg-surface/50' },
        filterContainer: { className: 'relative flex-1 w-full flex items-center' },
        filterInput: { 
          className: 'w-full h-8 pl-8 pr-3 rounded-md border border-border !outline-none !shadow-none !ring-0 focus:!border-primary text-sm !m-0',
          style: { boxShadow: 'none' }
        },
        filterIcon: { className: 'pi pi-search !absolute !left-3 !top-1/2 -translate-y-1/2 text-content-hint text-sm !m-0 !right-auto' },
        closeButton: { className: 'hidden' }, // Ẩn nút X đóng panel mặc định
      }}
    />
  ) : (
    <Dropdown
      ref={ref}
      className={`${baseClasses} ${className}`.trim()}
      {...(rest as DropdownProps)}
      pt={{
        root: { className: 'relative' },
        input: { className: 'px-3 h-full flex items-center text-sm text-content-main flex-1 overflow-hidden text-ellipsis whitespace-nowrap' },
        trigger: { className: `w-10 h-full flex items-center justify-center text-content-hint [&>svg]:w-3 [&>svg]:h-3 ${error ? '!text-alert' : ''}` },
        clearIcon: { className: `pi pi-times text-xs cursor-pointer hover:text-content-main mr-2 text-content-hint ${error ? '!text-alert' : ''}` },
        ...panelPT,
        blankIcon: { className: 'hidden' }, 
        itemGroup: { className: 'px-3 py-1 text-xs font-bold text-content-hint uppercase' }
      }}
    />
  );

  if (label || error) {
    return (
      <FormField label={label} error={error} required={required} className={wrapperClassName}>
        {selectComponent}
      </FormField>
    );
  }

  return <div className={`w-full ${wrapperClassName}`}>{selectComponent}</div>;
});

Select.displayName = 'Select';
