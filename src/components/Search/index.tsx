import debounce from 'lodash.debounce'
import React, { useCallback, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearch } from '../../redux/slices/filterSlice'
import GlobalSvgSelector from '../icon/GlobalSvgSelector'
import styles from './Search.module.scss'

const Search: React.FC = () => {
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')
  
  const onClickClear = () => {
    dispatch(setSearch(''))
    setValue('')
    inputRef.current?.focus()
  }

  const updateSearchValue = useCallback(
    debounce((str:string) => {
      dispatch(setSearch(str))
    }, 500),
    [],
  )
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    updateSearchValue(e.target.value)
  }
  

  return (
    <div className={styles.root}>
      <div className={styles.search}>
        <GlobalSvgSelector id='search' />
      </div>
      <input
        ref={inputRef}
        placeholder='Найти  пиццу...'
        value={value}
        onChange={onChangeInput}
      />
      {value && <div onClick={onClickClear} className={styles.close} data-testid='clean'><GlobalSvgSelector id='close' /></div>}
    </div>
  )
}

export default Search