import React from 'react';
import Recipe from '../Recipes/Recipes';
import style from './recipesContainer.module.css'

const RecipesContainer = ({ recipes }) => {
    return(
        <div className={style.recipesContainer}>
            {recipes.map((recipe) => {
                return( 
                <Recipe key={recipe.id} id={recipe.id} 
                name={recipe.name} image={recipe.image} dietas={recipe.dietas} 
                />
                )
            })}
        </div>
    )
}

export default RecipesContainer;