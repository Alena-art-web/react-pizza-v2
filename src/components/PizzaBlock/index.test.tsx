import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { store } from "../../redux/store"
import '@testing-library/jest-dom'
import PizzaBlock from "./index"
import userEvent from "@testing-library/user-event"
import PizzaItem from "../../pages/PizzaItem"
import axios from "axios"

jest.mock('axios')
const props = {
    id: '1',
    name: 'Пицца',
    sizes: [1, 2, 3],
    types: [0, 1],
    imageUrl: 'url',
    price: 450,
}
describe('Pizzablock component', () => {
    type Array = {
        data: ResponseItem[]
    }
    type ResponseItem = {
        id: number;
        name: string;
        price: number;
        imgUrl: string
    }
    let response: Array;
    beforeEach(() => {
        response = {
            data: [
                {
                    "id": 1,
                    "name": "Leanne Graham",
                    "price": 250,
                    "imgUrl": "url"
                },
                {
                    "id": 2,
                    "name": "Leanne",
                    "price": 350,
                    "imgUrl": "url"
                }

            ]
        }
    })
    it('component render', () => {

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <PizzaBlock {...props} />
                </MemoryRouter>
            </Provider>
        )
        expect(screen.getByText(/пицца/i)).toBeInTheDocument()
    })
    it('link to page deteils', async () => {
        (axios.get as jest.Mock).mockReturnValue(response)
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <PizzaBlock {...props} />
                    <PizzaItem />
                </MemoryRouter>
            </Provider>
        )
        const link = screen.getByTestId('link-details')
        userEvent.click(link)
        const item = await screen.findByTestId('page-details')
        expect(item).toBeInTheDocument()
        screen.debug()

    })
    it('change size', () => {

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <PizzaBlock {...props} />
                    <PizzaItem />
                </MemoryRouter>
            </Provider>
        )

        const size = screen.getAllByTestId('size-item')
        userEvent.click(size[0])
        expect(size[0]).toHaveClass('active')
    })
    it('change type', () => {

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <PizzaBlock {...props} />
                    <PizzaItem />
                </MemoryRouter>
            </Provider>
        )

        const type = screen.getAllByTestId('type-item')
        userEvent.click(type[0])
        expect(type[0]).toHaveClass('active')
    })
})