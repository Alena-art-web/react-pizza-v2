import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter} from "react-router-dom"
import { store } from "../redux/store"
import Header from "./Header"
import '@testing-library/jest-dom'

describe('Header component', () => {
    it('link to cart in page', () => {
        const route = '/'
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[route]}>
                    <Header/>
                </MemoryRouter> 
            </Provider>
        )
        expect(screen.getByTestId('header-cart')).toBeInTheDocument()
        
    })
    
})