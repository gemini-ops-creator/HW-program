import type { InputHTMLAttributes } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  labelClassName?: string;
  inputClassName?: string;
  wrapperClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

function FormField({
  id,
  label,
  name,
  type = "text",
  autoComplete,
  value,
  onChange,
  placeholder,
  required = false,
  labelClassName,
  inputClassName,
  wrapperClassName,
  ...rest
}: FormFieldProps) {
  return (
    <div className={wrapperClassName}>
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        className={inputClassName}
        placeholder={placeholder}
        required={required}
        {...rest}
      />
    </div>
  );
}

export default FormField;
