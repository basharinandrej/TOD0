import React from "react";


const Input = props => {
    const inputType = props.type || "text"

    return (
        <input type={inputType}
               value={props.value}
               placeholder={props.placeholder}
               className="tooltip-add-list__main-input main-input"
               onChange={props.onChange}
        />
    )
}

export default Input