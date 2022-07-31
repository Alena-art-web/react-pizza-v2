import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'
import CartSvgSelector from '../components/icon/CartSvgSelector'
import { clearItems } from '../redux/slices/cartSlice'
import CartEmpty from '../components/CartEmpty'
import { RootState } from '../redux/store'

const Cart: React.FC = () => {
  const {items, totalPrice} = useSelector((state: RootState) => state.cart)
  const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0)

  const dispatch = useDispatch()
  const onClearCart = () => {
    dispatch(clearItems())
  }
  return (
    <div className="container container--cart">
      {items.length > 0 ?
        <div className="cart">       
          <div className="cart__top">
            <h2 className="content__title">Корзина</h2>
            <div className="cart__clear" onClick={onClearCart}>
              <CartSvgSelector id='cart-clear'/>
              <span>Очистить корзину</span>
            </div>
          </div>
          <div className="content__items">
            {items.map((item:any) => <CartItem key={item.id}{...item}/> )}
          </div>
          <div className="cart__bottom">
            <div className="cart__bottom-details">
              <span> Всего пицц: <b>{totalCount} шт.</b> </span>
              <span> Сумма заказа: <b>{totalPrice} грн.</b> </span>
            </div>
            <div className="cart__bottom-buttons">
              <Link to="/" className="button button--outline button--add go-back-btn">
                <CartSvgSelector id='arrow'/>
                <span>Вернуться назад</span>
              </Link>
              <div className="button pay-btn">
                <span>Оплатить сейчас</span>
              </div>
            </div>
          </div>
          
        </div>
        : <CartEmpty/>
      }
    </div>
  )
}

export default Cart