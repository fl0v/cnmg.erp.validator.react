import React from 'react';

export default function FormRow(props) {
  const { label, name, value, className } = props;
  let type = props.type || 'text';
  const inputClassName = ['form-control', className].join(' ');
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={value}
        className={inputClassName}
      />
    </div>
  );
}
