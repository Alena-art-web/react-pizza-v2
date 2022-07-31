import {getByText, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Categories from './Categories'

const onChange = jest.fn()
const value = 0

describe('Categories component', () => {
    it('list render', () => {
        const {getByText} = render(<Categories onChange={onChange} value={value}/>)
        const text = getByText(/все/i)
        expect(text).toBeInTheDocument
        
    })
    it('render without props', () => {
        const {getByText} = render(<Categories/>) 
        const category = getByText(/гриль/i)
        expect(category).toBeInTheDocument
    })
    it('onChange works', () => {
        const {getByText} = render(<Categories onChangeCategory={onChange} value={value} />)
        const li = getByText(/все/i)
        userEvent.click(li)
        expect(onChange).toBeCalledTimes(1)
    })    
    it('styles works', () => {
        const {container} = render(<Categories onChangeCategory={onChange} value={value} />)
        
        expect(container.getElementsByClassName('active').length).toBe(1)
    })
})