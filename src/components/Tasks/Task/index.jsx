import React from "react";
import axios from 'axios';


import './Tasks.scss'
import Checkbox from "../../UI/Checkbox/Checkbox";
import EditIcon from "../../UI/editIcon/editIcon";
import NoContent from "../../UI/NoContent/NoContent";
import IconPlus from "../../UI/Icons/IconPlus/IconPlus";
import AddTasks from "../AddTasks/AddTasks";
import IconClose from "../../UI/Icons/IconClose/IconClose";




const Task = ({ activeItem, editTitle, refreshListTasks, checkedCheckbox, editTask, removeTask }) => {

    const [addTasks, setAddTasks] = React.useState(false)
    const [inputValue, setInputValue] = React.useState(null);


    const onChangeHandler = (e, id) => {
        checkedCheckbox(id, e)
    }

    const toggleAddTasks = () =>{
        setAddTasks(!addTasks)
    }

    const addNewTasks = (value, id) => {
        const newTask = {
            "listId": id,
            "text": value,
            "completed": false
        }
        setInputValue(newTask)
    }

    const setPushTasks = () => {
        axios.post('http://localhost:3001/tasks/', inputValue).then(({ data }) => {
            refreshListTasks(data)
        })
        setAddTasks(!addTasks)
        setInputValue(null)
    }

    const onEditTask = (foldersId, taskId,  text) => {
        editTask(foldersId, taskId,  text)
    }

    const onRemoveTask = (task, foldersId) => {
        const newTasks = activeItem.tasks.filter(el => el.id !== task)

        removeTask(newTasks, task, foldersId)
    }

    return (
        activeItem && activeItem.tasks ?
            <div className="todo__tasks tasks">

                 <div className="tasks-item tasks-item__wrapper">
                    <h2 className="tasks__title" style={{color: activeItem.color.hex}}>
                        { activeItem.name }
                        <EditIcon
                            onClick={() => editTitle(activeItem.id, activeItem.name)}
                        />
                    </h2>
                    <hr/>

                     <ul className="tasks__tasks-list tasks-list">
                        {activeItem.tasks.length > 0 ? activeItem.tasks.map((item, index) => (
                             <li className="tasks__item" key={index}>
                                 <Checkbox id={`tasks-${item.id}`} type="checkbox" checked={item.completed} onChange={(e) => onChangeHandler(e, `tasks-${item.id}`)}/>
                                 <input
                                    value={item.text}
                                    readOnly={true}
                                    className="tasks-list__paragraph"
                                 />


                                 <EditIcon
                                     className="tasks-list__edit-icon"
                                     onClick={()=>onEditTask(activeItem.id, item.id, item.text)}
                                 />
                                 <IconClose
                                     className="tasks-list__close-icon"
                                     onClick={()=>onRemoveTask(item.id, activeItem.id)}
                                 />
                             </li>
                        ))

                        : <NoContent
                            text="Задачи отсутствуют"
                        />}
                     </ul>



                     { addTasks ?
                        <AddTasks
                            inputValue={inputValue}
                            clickCancel={toggleAddTasks}
                            pushTasks={setPushTasks}
                            addNewTasks={addNewTasks}
                            id={activeItem.id}
                        />
                        :
                        <p className="tasks__new-tasks" onClick={toggleAddTasks}>
                            <IconPlus />
                            Новая задача
                        </p>
                     }
                </div>
            </div>
        :   <NoContent
                text="Выбирете папку"
            />

    )
}

export default Task