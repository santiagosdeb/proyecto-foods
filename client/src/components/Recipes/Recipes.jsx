import React from 'react'
import { Link } from 'react-router-dom'
import style from './recipes.module.css'

const Recipe = ({id, name, image, dietas}) => {
    return(
        <div className={style.recipe}>
            <Link to={`/recipe/${id}`} className={style.link}>
            <h2 className={style.title}>{name}</h2>
            <img src={image} alt="comida" className={style.img}/>
            <h3 className={style.title}>Diets:</h3>
            <ul className={style.ul}>
                {dietas.map((dieta, index) => {
                    return(
                        <li key={index} className={style.li}>{dieta}</li>
                    )
                })}
            </ul>
            </Link>
        </div>
    )
}

export default Recipe;