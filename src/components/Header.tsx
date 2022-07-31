import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import headerLogo from '../assets/img/logo.svg'
import { RootState } from '../redux/store'
import GlobalSvgSelector from './icon/GlobalSvgSelector'
import Search from './Search'

const Header: React.FC = () => {
    const {totalPrice, items} = useSelector((state: RootState) => state.cart)
    const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0)
    const location = useLocation()
    const isMounted = useRef(false)

    useEffect(() => {
        if (isMounted.current) {
            const json = JSON.stringify(items)
            localStorage.setItem('cart', json)
        }
        isMounted.current = true
      
    }, [items])
    
    return (
        <div className="header" >
            <div className="container">
                <Link to='/' className="header__logo">
                    <img width="38" src={headerLogo} alt="Pizza logo" />
                    <div>
                        <h1>React Pizza</h1>
                        <p>самая вкусная пицца во вселенной</p>
                    </div>
                </Link>
                <Search/>
                {location.pathname !== '/cart' && 
                    
                    
                    <div className="header__cart" data-testid='header-cart'>
                        <Link to="/cart" className="button button--cart">
                            <span>{totalPrice} грн.</span>
                            <div className="button__delimiter"></div>
                            <GlobalSvgSelector id='cart-logo'/>
                            <span>{totalCount}</span>
                        </Link>
                    </div>
                    
                }
            </div>
        </div>
    )
}

export default Header