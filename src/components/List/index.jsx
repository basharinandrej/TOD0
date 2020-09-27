import React from 'react'

import './List.scss'
import className from 'classname'
import Badge from "../Badge/Badge";
import IconClose from "../UI/Icons/IconClose/IconClose";
import axios from "axios";


const List = ({items, isRemovable, onClick, onRemove, colors, setActiveItemHandler, activeItem, allTasks}) => {


    const removeListItem = (item) => {
        if(window.confirm('Вы действительно хотите удалить это ?')){
            axios.delete('http://localhost:3001/lists/' + item.id).then(()=>{
                onRemove(item.id)
            })
        }
    }

    const clickItemHandler = (item) => {
        setActiveItemHandler(item)
    }


    return (
        <ul onClick={onClick} className="sidebar__nav-list nav-list">
            {items &&
                items.map((item, index) => {
                    return <li
                        key={index}
                        onClick={() => setActiveItemHandler && clickItemHandler(item)}
                        className={className({  'active': activeItem && activeItem.id === item.id || allTasks && allTasks.id === 0,
                                                'nav-list__item': true
                        })}
                    >

                        {item.icon ? item.icon : <Badge colorId={item.colorId} colors={colors}/>}


                        <p className="nav-list__paragraph">
                            {item.name}
                        </p>
                        <span className="nav-list__cnt-tasks">
                            {item.tasks && item.tasks.length > 0 ? `(${item.tasks.length})` : null}
                        </span>

                        {
                            isRemovable ?
                            <span className="nav-list__item--close">
                                <IconClose
                                    onClick={() => removeListItem(item)}
                                />
                            </span>
                            : null
                        }
                    </li>
                })
            }
        </ul>
    )
}

export default List