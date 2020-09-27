import React from "react";
import classes from './checkbox.module.css'







const Checkbox = ({type, onChange, id, checked }) => {


    return(
        <label htmlFor={id} className={classes["input-main"]}>
            <input id={id} type={type}
                   checked={checked}
                   className={classes["input-main__input"]} onChange={onChange} />

            <span className={classes["input-main__icon"]}>

            </span>
            <span className={classes["input-main__icon-checked"]}>

            </span>

        </label>
    )
}


export default Checkbox;