import React from 'react'

const TextArea = ({ input, label, type, name, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <textarea
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

export default TextArea
