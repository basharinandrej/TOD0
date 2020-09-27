import React, {Fragment, useState} from 'react'
import './AddButtonList.scss'

import IconPlus from "../UI/Icons/IconPlus/IconPlus";
import Index from "../List";
import Tooltip from "../UI/Tooltip/Tooltip";



const AddButtonList = ({ colors, addAlist }) =>{
    const [ showTooltip, setShowTooltip ] = useState(false)


    return (
        <Fragment>
            <Index
                onClick = {() => setShowTooltip(!showTooltip)}
                items = {[
                    {
                        className: "list-add-btn nav-list__item",
                        icon:  <IconPlus />,
                        name: "Добавить папку"
                    }
                ]}
            />

            {   showTooltip &&
                <Tooltip
                    colors={colors}
                    onClickClose={() => setShowTooltip(!showTooltip)}
                    addAlist={addAlist}
                    setShowTooltip={setShowTooltip}
                />
            }
        </Fragment>
    )
}

export default AddButtonList