import React from "react";
import closeSVG from '../../../../assets/img/close.svg'



const IconClose = ({ alt, className, onClick}) => {

    return (
        <img src={closeSVG}
             alt={alt}
             className={className}
             onClick={onClick}
        />
    )
}

export default IconClose