import React from 'react'
import { Link } from 'react-router-dom'
import style from './recipes.module.css'

const Recipe = ({id, name, image, dietas }) => {
    return(
        <div className={style.recipe}>
            <Link to={`/recipe/${id}`} className={style.link}>
            <h3 className={style.title}>{name}</h3>
            <img src={image} alt="comida" className={style.img}/>
            <ul className={style.ul}>
                {dietas.map((dieta, index) => {
                    return(
                        <li key={index} className={style.li}> <span className={style.span}>    {dieta}  </span>   </li>
                    )
                })}
            </ul>
            </Link>
        </div>
    )
}

export default Recipe;