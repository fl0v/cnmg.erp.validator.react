import React from 'react';

export default function FormRow(props) {
  const { label, name, value, className, readonly, disabled } = props;
  let type = props.type || 'text';
  return (
    <div className={className + ' form-group'}>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={value}
        className="form-control"
        readOnly={readonly}
        disabled={disabled}
      />
    </div>
  );
}
