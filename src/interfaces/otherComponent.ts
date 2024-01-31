export interface AppCheckBoxType {
  isChecked: boolean;
  handleToggle: (val: boolean) => void;

  label?: string;
}
