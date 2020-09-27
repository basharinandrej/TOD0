import React from "react";


const Button = ({ onClick, children, adClass, disabled }) => {



    return(
        <button
            onClick={onClick}
            disabled={disabled === null}
            className={adClass + `${"__main-btn main-btn"}`}>

            {children}

        </button>
    )
}

export default Button