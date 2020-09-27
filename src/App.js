import React from 'react';
import { Switch, Route, NavLink, useHistory} from "react-router-dom";
import axios from "axios";


import './App.scss'
import { Task, Burger, AddButtonList, List } from './components'




const App = () => {
    const [list, setList] = React.useState(null);
    const [colors, setColors] = React.useState(null)
    const [activeListItem, setActiveListItem] = React.useState()
    let history = useHistory();



    React.useEffect(() => {
        axios.get('http://localhost:3001/colors')
        .then(({ data }) => {
            setColors(data)
        });

        axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks')
        .then(({ data }) => {
            setList(data)
        });
    }, []);

    const onAddListItem = el => {
        const newList = [...list]
        newList.push(el)
        setList(newList)
    }

    const onRemoveListItem = id => {
        const newList = list.filter(item => item.id !== id)
        setList(newList)
        let activeEl = newList.filter(el => el.id === id - 1 )
        setActiveListItem(activeEl[0])
    }

    const editTitle = (id, name) => {
        const newTitle = window.prompt('Введите новое название', name);


        const newList = list.map((item, index)=> {
            if (item.id === id) {
                item.name = newTitle
            }
            return item
        })
        setList(newList)

        axios.patch('http://localhost:3001/lists/' + id, {
            name: newTitle
        }).catch(()=> {
            alert('Error')
        })
    }

    const editTask = (foldersId, taskId,  text) => {
        const editTask = window.prompt('Отредактируй задачу', text)

        const newTask = list.map((item, index)=>{
            if (item.id === foldersId) {
                item.tasks.forEach(task => {
                    if (task.id === taskId) {
                        task.text = editTask
                    }
                })
            }
            return item
        })

        setList(newTask)

        axios.patch('http://localhost:3001/tasks/' + taskId, {
            text: editTask
        }).catch(()=> {
            alert('Error')
        })

    }

    const removeTask = (newTasks, idTask, foldersId) => {
        if(window.confirm('Вы действительно хотите удалить это ?')){
            const cloneActiveItem  = {...activeListItem}
            cloneActiveItem.tasks = newTasks
            setActiveListItem(cloneActiveItem)


            list.map(el => {
                if (el.id === foldersId) {
                    const newTasks = el.tasks.filter(el => el.id !== idTask)
                    return el.tasks = newTasks
                }
                return el
            })

            axios.delete('http://localhost:3001/tasks/' + idTask)
        }





    }

    const refreshListTasks = task => {
        const cloneList = [...list]
        let tasksArr = Array()

        cloneList.map((item, index)=> {

           if (item.id === task.listId) {
               if (!item.tasks) {
                   item.tasks = tasksArr
               }

               item.tasks.push(task)
           }
        })
        setList(cloneList)
    }

    const onCheckboxHandler = (id, e) => {

        const newList = [...list]

        newList.forEach(folders => {
            folders.tasks.forEach(tasks => {
                if (tasks.id == id.replace(/[^\d]/g, '')) {
                    tasks.completed = e.target.checked
                }
            })
        })

        setList(newList)

        axios.patch('http://localhost:3001/tasks/' + id.replace(/[^\d]/g, ''), {
            completed: e.target.checked
        }).catch(()=> {
            alert('Error')
        })

    }




    return (
        <div className="todo">
            <div className="todo__sidebar sidebar">

                <NavLink to="/">
                    <List
                        items = {[
                            {
                                icon: <Burger />,
                                name: "Список задач",
                            }
                        ]}
                        setActiveItemHandler={item => {
                            item.id = 0
                            setActiveListItem(item)
                        }}
                        allTasks={activeListItem}
                    />
                </NavLink>


                <List
                    items = {list}
                    colors={colors}
                    setActiveItemHandler={item => {
                        setActiveListItem(item)
                        history.push(`/lists/${item.id}`)
                    }}
                    onRemove={(id) => onRemoveListItem(id)}
                    activeItem={activeListItem}
                    isRemovable
                />


                <AddButtonList
                    colors={ colors }
                    addAlist = { el => onAddListItem(el)}
                />
            </div>


            <Switch>
                <Route exact path="/">
                    <div className="todo__box">
                        {list &&
                            list.map((list, index) => {
                                return <Task
                                    key={ index }
                                    activeItem={ list }
                                    refreshListTasks={ refreshListTasks }
                                    editTitle={ editTitle }
                                    checkedCheckbox={onCheckboxHandler}
                                    editTask={editTask}
                                    removeTask={removeTask}
                                />
                            })}
                    </div>
                </Route>

                <Route path="/lists/:id">
                    <div className="todo__box">
                        <Task
                            activeItem={ activeListItem }
                            refreshListTasks={ refreshListTasks }
                            editTitle={ editTitle }
                            checkedCheckbox={onCheckboxHandler}
                            editTask={editTask}
                            removeTask={removeTask}
                        />
                    </div>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
