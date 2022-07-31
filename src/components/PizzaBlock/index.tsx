import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItem, CartItemType } from '../../redux/slices/cartSlice'
import { RootState } from '../../redux/store'
import GlobalSvgSelector from '../icon/GlobalSvgSelector'

type PizzaBlockProps = {
    id: string;
    name: string;
    sizes: number[];
    types: number[];
    imageUrl: string;
    price: number
}

const typeNames = ['тонкое', 'традиционное']

const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, name, price, sizes, types, imageUrl }) => {
    const [activeSize, setActiveSize] = useState(0)
    const [activeType, setActiveType] = useState(0)


    const dispatch = useDispatch()
    const countItem = useSelector((state:RootState) => state.cart.items.find(obj => obj.id === id))
    const addedCount = countItem ? countItem.count : 0

    const onSize = (index: number) => setActiveSize(index)
    const onType = (index: number) => setActiveType(index)

    const onClickAdd = () => {
        const item: CartItemType = {
            id,
            name,
            price,
            imageUrl,
            type: typeNames[activeType],
            size: sizes[activeSize],
            count: 0
        }

        dispatch(addItem(item))
    }
    return (
        <div className="pizza-block">
            <Link to={`/pizza/${id}`} data-testid='link-details'>
               <img
                    className="pizza-block__image"
                    src={imageUrl}
                    alt="Pizza"
                /> 
            </Link>
            <h4 className="pizza-block__title">{name}</h4>
            <div className="pizza-block__selector">
                <ul>
                    {types.map((type, index) =>
                        <li
                            data-testid='type-item'
                            key={index}
                            className={activeType === index ? 'active' : ''}
                            onClick={() => onType(index)}
                        >
                            {typeNames[type]}
                        </li>
                    )}
                </ul>
                <ul>
                    {sizes.map((size, index) =>
                        <li
                            data-testid='size-item'
                            key={index}
                            className={activeSize === index ? 'active' : ''}
                            onClick={() => onSize(index)}
                        >
                            {size} см.
                        </li>
                    )}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {price} грн.</div>
                <button className="button button--outline button--add" onClick={onClickAdd} >
                    <GlobalSvgSelector id='pizza-ad' />
                    <span>Добавить</span>
                    {addedCount > 0 && <i>{addedCount}</i>}
                </button>
            </div>
        </div>
    )
}

export default PizzaBlock