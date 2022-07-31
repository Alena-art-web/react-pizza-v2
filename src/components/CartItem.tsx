import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, CartItemType, minusItem, removeItem } from '../redux/slices/cartSlice'
import CartSvgSelector from './icon/CartSvgSelector'


type CartItemProps = {
    name: string;
    id: string;
    price: number;
    imageUrl: string;
    size: number;
    type: string;
    count: number
}

const CartItem: React.FC<CartItemProps> = ({name, id, price, imageUrl, size, type, count}) => {
    const dispatch = useDispatch()
    const onRemoveItem = () => {
        dispatch(removeItem(id))
    }

    const onClickPlus = () => {
        dispatch(addItem({
            id
        } as CartItemType))
    }

    const onClickMinus = () => {
        dispatch(minusItem(id))
    }
    return (
        <div className="cart__item" key={id}>
            <div className="cart__item-img">
                <img className="pizza-block__image"
                    src={imageUrl}
                    alt="Pizza" />
            </div>
            <div className="cart__item-info">
                <h3>{name}</h3>
                <p>{type} тесто, {size} см.</p>
            </div>
            <div className="cart__item-count">
                <button className="button button--outline button--circle cart__item-count-minus" onClick={onClickMinus} disabled={count === 1}>
                    <CartSvgSelector id='minus' />
                </button>
                <b>{count}</b>
                <button className="button button--outline button--circle cart__item-count-plus" onClick={onClickPlus}>
                    <CartSvgSelector id='plus' />
                </button>
            </div>
            <div className="cart__item-price">
                <b>{price * count} грн.</b>
            </div>
            <div className="cart__item-remove">
                <button className="button button--outline button--circle" onClick={onRemoveItem}>
                    <CartSvgSelector id='delete'/>
                </button>
            </div>
        </div>
    )
}

export default CartItem