import React from 'react'

const renderField = ({ input, label, type, name, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input
        id={input.name}
        {...input}
        placeholder={label}
        type={type}
        onBlur={input.onBlur}
        onChange={input.onChange}
      />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

export default renderField
