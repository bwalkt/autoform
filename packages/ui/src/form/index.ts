'use client'

// Form Input Components

export { type AvatarItem, AvatarPicker, type AvatarPickerProps } from './AvatarPicker'
export {
  Checkbox,
  CheckboxGroup,
  type CheckboxGroupProps,
  type CheckboxProps,
  CheckboxWithLabel,
  type CheckboxWithLabelProps,
} from './Checkbox'
export {
  CheckboxCards,
  type CheckboxCardsItemProps,
  type CheckboxCardsProps,
} from './CheckboxCards'
export {
  type CardType,
  CreditCardInput,
  type CreditCardInputProps,
  type CreditCardValue,
} from './CreditCardInput'
// Date & Time Components (re-exported from ./date)
export {
  AppointmentPicker,
  type AppointmentPickerProps,
  type AppointmentValue,
  Calendar,
  type CalendarProps,
  CalendarWithPresets,
  type CalendarWithPresetsProps,
  CalendarWithPricing,
  type CalendarWithPricingProps,
  DatePicker,
  type DatePickerProps,
  type DateRange,
  DateRangePicker,
  type DateRangePickerProps,
  type DateRangePreset,
  DateTimePicker,
  type DateTimePickerProps,
  type DayPrice,
  defaultPresets,
  defaultTimeSlotsList,
  MiniCalendar,
  type MiniCalendarProps,
  TimePicker,
  type TimePickerProps,
  type TimeSlot,
  type TimeValue,
} from './date'
// Form Layout Components
export { FieldGroup, type FieldGroupProps, type FieldGroupRowProps, type FieldGroupSectionProps } from './FieldGroup'
export { type FieldGroupContextValue, FieldGroupProvider, useFieldGroup } from './FieldGroupContext'
export {
  acceptPresets,
  FileUpload,
  type FileUploadProps,
  type FileUploadVariant,
  type UploadedFile,
} from './FileUpload'
export {
  InputMask,
  type InputMaskProps,
  type MaskPreset,
  maskPresets,
} from './InputMask'
export {
  InputOTP,
  InputOTPPrimitive,
  type InputOTPProps,
  type InputOTPVariant,
  REGEXP_ONLY_CHARS,
  REGEXP_ONLY_DIGITS,
  REGEXP_ONLY_DIGITS_AND_CHARS,
} from './InputOTP'
export { Label, type LabelProps } from './Label'
export {
  LocationInput,
  type LocationInputProps,
  type LocationValue,
} from './LocationInput'
export { type MentionItem, MentionTextarea, type MentionTextareaProps, type TriggerConfig } from './MentionTextarea'
export {
  MultiSelect,
  type MultiSelectOption,
  type MultiSelectProps,
} from './MultiSelect'
export {
  PasswordInput,
  type PasswordInputProps,
} from './PasswordInput'
export {
  PhoneInput,
  type PhoneInputProps,
  type PhoneValue,
} from './PhoneInput'
export {
  RadioCards,
  type RadioCardsItemProps,
  type RadioCardsRootProps,
} from './RadioCards'
export {
  RadioGroup,
  type RadioGroupItemProps,
  type RadioGroupRootProps,
} from './RadioGroup'
export { Select, SelectItem, type SelectProps } from './Select'
export {
  SignatureInput,
  type SignatureInputProps,
} from './SignatureInput'
export { Slider, type SliderProps } from './Slider'
export { Switch, type SwitchProps, SwitchWithLabel, type SwitchWithLabelProps } from './Switch'
export { SwitchGroup, type SwitchGroupProps } from './SwitchGroup'
export { Textarea, type TextareaProps } from './Textarea'
export { TextField, type TextFieldProps } from './TextField'
// Shared Styles (for building custom form components)
export {
  colorStyles,
  containerColorStyles,
  containerVariantStyles,
  getBaseVariant,
  highlightColorStyles,
  solidColorStyles,
  variantStyles,
} from './textFieldStyles'
export { withFieldGroup } from './withFieldGroup'
