import React from 'react'

type CategoriesProps = {
    value: number;
    onChangeCategory: (i:number) => void;
}

const Categories: React.FC<CategoriesProps> = ({value, onChangeCategory}) => {
    const items = [
        'Все',
        'Мясные', 
        'Вегетарианская', 
        'Гриль', 
        'Острые', 
        'Закрытые'
    ]

    return (
        <div className="categories" data-testid='category'>
            <ul>
               {items.map((i, index) => 
                    <li 
                        key={index}
                        className={value === index ? 'active' : ''} 
                        onClick={() => onChangeCategory(index)}
                    >
                        {i}
                    </li>
                )} 
            </ul>
        </div>
    )
}

export default Categories