import React from "react";

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
}) {
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
      />
    </div>
  );
}

export default FormField;
