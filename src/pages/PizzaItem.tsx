import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const PizzaItem: React.FC = () => {
  const { id } = useParams()
  const [pizza, setPizza] = useState<{
    imageUrl: string,
    name: string,
    price: number
  }>()
  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://62b42075a36f3a973d2c7e79.mockapi.io/items/' + id)
        setPizza(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchPizza()

  }, [])
  
  if (!pizza) {
    return <div>Загрузка...</div>
  }
  
  return (
    <div className='container' data-testid='page-details'>
      <div>
        <img src={pizza.imageUrl}/>
      </div>
      <div>
        <h1>{pizza.name}</h1>
        <h3>{pizza.price} грн.</h3>
      </div>
    </div>
  )
}

export default PizzaItem