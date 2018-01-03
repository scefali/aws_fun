import React from 'react'
import ToggleButton from 'react-bootstrap/lib/ToggleButton'

const RadioButton = (props) => {
  const { input, type } = props
  return (
    <ToggleButton {...input} type={type} bsStyle="warning">
      {input.value}
    </ToggleButton>
  )
}

export default RadioButton
