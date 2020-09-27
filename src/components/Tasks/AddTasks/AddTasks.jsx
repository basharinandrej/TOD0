import React, {Fragment} from 'react';
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";




const AddTasks = ({ clickCancel, addNewTasks, pushTasks, inputValue, id }) => {



    return(

        <Fragment>
            <Input
                placeholder="Текст задачи"
                onChange={e => addNewTasks(e.target.value, id)}
            />

            <div className="tasks-item__btn-wrapper">
                <Button
                    disabled={inputValue}
                    adClass="tasks-item"
                    onClick={pushTasks}
                >
                    Добавить задачу
                </Button>

                <Button
                    adClass="ghoest-btn tasks-item"
                    onClick={clickCancel}
                >
                    Отмена
                </Button>
            </div>

        </Fragment>

    )
}

export default AddTasks;