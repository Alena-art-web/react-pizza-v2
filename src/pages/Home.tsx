import qs from 'qs'
import React, { useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Categories from '../components/Categories/Categories'
import PizzaBlock from '../components/PizzaBlock/index'
import LoadingBlock from '../components/PizzaBlock/LoadingBlock'
import Sort, { itemsSort } from '../components/Sort'
import { setCategoryId, setFilters } from '../redux/slices/filterSlice'
import { fetchPizzas } from '../redux/slices/pizzasSlice'
import { RootState, useAppDispatch } from '../redux/store'

const Home: React.FC = () => {
    const navigate = useNavigate()
    const {sort, searchValue, categoryId} = useSelector((state: RootState) => state.filter)

    const isSearch = useRef(false)
    const isMounted = useRef(false)
    
    const { items, status } = useSelector((state: RootState) => state.pizzas)
    const appDispatch = useAppDispatch()
    const dispatch = useAppDispatch()

    const getPizzas = async () => {
        const categories = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''
        const sortBy = sort.sortProperty

        appDispatch(
            fetchPizzas({
            categories, 
            search,
            sortBy
        }))
        
        window.scrollTo(0, 0)      
    }

    // useEffect(() => {
    //     if (isMounted.current) {
    //         const queryString = qs.stringify({
    //             sortProperty: sort.sortProperty,
    //             categoryId
    //         })
    //         navigate(`?${queryString}`)
    //     }

    //     isMounted.current = true
    // }, [categoryId, sort])

    // useEffect(() => {
    //     if (window.location.search) {
    //         const params = qs.parse(window.location.search.substring(1))
            
    //         const sort = itemsSort.find(obj => obj.sortProperty === params.sortProperty)
            
    //         dispatch(setFilters({
    //             ...params,
    //             sort
    //         }))

    //         isSearch.current = true
    //     }
        
    // }, [])

    useEffect(() => {
        // if (!isSearch.current) {
            getPizzas()
        // }
        // isSearch.current = false
        
    },[searchValue, categoryId, sort.sortProperty])

    

    const onClickCategory = (id: number) => {
        dispatch(setCategoryId(id))
    }

    return (

        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onClickCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    status === 'loading'
                        ? [...new Array(6)].map((_, index) => <LoadingBlock key={index} />)
                        : items.map((item: any) => <PizzaBlock {...item} key={item.id}/>)
                            
                }
            </div>
        </div>

    )
}

export default Home