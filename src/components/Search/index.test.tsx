import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "../../redux/store"
import Search from '../Search/index'
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event"

describe('Search', () => {

    it('search  component render', () => {
        render(
            <Provider store={store}>
                <Search />
            </Provider>
        )
       const input = screen.getByPlaceholderText(/найти пиццу/i)
       expect(input).toBeInTheDocument()
    })
    it('input value change', () => {
        render(
            <Provider store={store}>
                <Search />
            </Provider>
        )
        const input = screen.getByPlaceholderText(/найти пиццу/i)
        userEvent.type(input, 'test')
        expect(input).toHaveValue('test')
        
    })
    it('button clean is visible', () => {
        render(
            <Provider store={store}>
                <Search />
            </Provider>
        )
        const input = screen.getByPlaceholderText(/найти пиццу/i)
        userEvent.type(input, 'test')
        expect(screen.getByTestId('clean')).toBeInTheDocument()

    })
    it('button clean is working', () => {
        render(
            <Provider store={store}>
                <Search />
            </Provider>
        )
        const input = screen.getByPlaceholderText(/найти пиццу/i)
        expect(input).toHaveValue('')
        userEvent.type(input, 'test')
        expect(screen.getByTestId('clean')).toBeInTheDocument()
        userEvent.click(screen.getByTestId('clean'))
        expect(input).toHaveValue('')

    })
})