import React from 'react'

function InputField({handleChange, value, title, name}) {

    return (
        <label className="sidebar-label-container">
            <input type="radio" onChange={handleChange} name={name} value={value} id="test"/>
            <span className="checkmark"></span>{title}
        </label>
    );
}

export default InputField

