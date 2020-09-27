import React from 'react'


import './Badge.scss'
import classNames from "classname";


const Badge = ({ colorId, colors, classActive }) => {


    return(colors &&
        colors.map((item, index) => {

            { return item.id === colorId ?
                 <i className={classNames(`nav-list__circle`,
                        {[`nav-list__circle--${colorId}`]: colorId},
                        {'active': classActive}
                )}


                        style={{background: item.hex}}
                        key={index}
                /> :
                null
            }

        }))
}



export default Badge
