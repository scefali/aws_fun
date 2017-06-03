import React from 'react'



const RadioButton = ({ input, field }) => (
    <span>
        <input type="radio" {...input}  id="action" name="action" checked={input.value === field}
         value={field}/>{field}
    </span>
)

export default RadioButton