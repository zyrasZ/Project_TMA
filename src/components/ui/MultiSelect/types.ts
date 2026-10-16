export interface MultiSelectOption {
  label: string;
  value: string;
}

export interface MultiSelectProps {
  label?: string;
  error?: string;
  required?: boolean;
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (e: { value: string[] }) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  wrapperClassName?: string;
  maxSelectedLabels?: number;
  showSelectAll?: boolean;
  selectAllLabel?: string;
}
