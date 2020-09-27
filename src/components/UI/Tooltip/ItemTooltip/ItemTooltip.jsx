import React from "react";
import Badge from "../../../Badge/Badge";


const ItemTooltip = ({ colors, index, className, onClick }) =>{


    return(
        <li className="list-badge__item"
            onClick={onClick}>
           <Badge
                colors={colors}
                colorId={index}
                classActive={className}
            />
       </li>
    )

}

export default ItemTooltip