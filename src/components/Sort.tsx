import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSort } from '../redux/slices/filterSlice'
import { RootState } from '../redux/store'
import GlobalSvgSelector from './icon/GlobalSvgSelector'

type SortItem = {
    name: string;
    sortProperty: string
}
type PopupClick = MouseEvent & {
    path: Node[]
}

export const itemsSort: SortItem[] = [
    { name: 'популярности', sortProperty: 'rating' },
    { name: 'цене', sortProperty: 'price' },
    { name: 'алфавиту', sortProperty: 'title' }
]

const Sort = () => {
    const inputRef = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch()
    const sort = useSelector((state: RootState) => state.filter.sort) 
    const [open, setOpen] = useState(false)


    const onActiveItem = (obj: any) => { ///???
        dispatch(setSort(obj))
        togglePopup()
    }

    const togglePopup = () => {
        setOpen(!open)
    }



    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const _event = event as PopupClick

            if (inputRef.current && !_event.path.includes(inputRef.current)) {
                setOpen(false)
            }
        }


        document.body.addEventListener('click', handleClick)

        return () => {
            document.body.removeEventListener('click', handleClick)
        }

    }, [])


    return (
        <div ref={inputRef} className="sort">
            <div className="sort__label">
                <GlobalSvgSelector id='sort' />
                <b>Сортировка по:</b>
                <span onClick={togglePopup}>{sort.name}</span>
            </div>
            {open && <div className="sort__popup">
                <ul>
                    {itemsSort && itemsSort.map((item, index) =>
                        <li
                            key={index}
                            className={sort.sortProperty === item.sortProperty ? 'active' : ''}
                            onClick={() => onActiveItem(item)}
                        >
                            {item.name}
                        </li>
                    )}
                </ul>
            </div>}
        </div>
    )
}

export default Sort