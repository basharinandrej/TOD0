import React from "react";
import axios from "axios";



import IconClose from "../Icons/IconClose/IconClose";
import Input from "../Input/Input";
import Button from "../Button/Button";
import ItemTooltip from "./ItemTooltip/ItemTooltip";


const Tooltip = ({ colors, onClickClose, addAlist }) => {
    const [ selectedColor, setSelectedColor] = React.useState(3)
    const [ inputValue, setInputValue ] = React.useState('')
    const [ isLoading, setIsLoading ] = React.useState(false)

    React.useEffect(() => {
        if (Array.isArray(colors)) {
            setSelectedColor(colors[0].id)
        }
    }, [colors])

    const addListItem = () => {
        if (!inputValue) {
            alert('Введите название списка')
            return null
        } else {
            setIsLoading(true)

            axios.post('http://localhost:3001/lists', {
                name: inputValue,
                colorId: selectedColor
            }).then(({ data }) => {
                let color = colors.filter(color => color.id === data.colorId)[0]
                let tasks = Array()
                let newListItem = {...data, color, tasks}

                addAlist( newListItem )
                setInputValue('');
            }).finally(() => {
                setIsLoading(false)
            });
        }
    }



    return (
        <div className="tooltip-add-list" >
            <IconClose
                onClick={onClickClose}
                alt="icon-close"
                className="tooltip-add-list__close"
            />

            <Input
                value={inputValue}
                placeholder="Название папки"
                onChange={e => setInputValue(e.target.value )}
            />


            <ul className="list-badge">
                { colors &&
                    colors.map((item, index)=> {
                        return <ItemTooltip
                            key={item.hex + `${index}`}
                            index={item.id}
                            colors={colors}
                            onClick={() => setSelectedColor(item.id) }
                            className={selectedColor === item.id && "active"}
                        />
                })}
            </ul>
            <Button
                onClick={addListItem}
                adClass="add-list"
            >
                {isLoading ? "Добавление...." : "Добавить"}
            </Button>
        </div>
    )
}

export default Tooltip