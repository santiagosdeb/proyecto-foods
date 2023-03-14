import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allRecipes, getDiets } from '../../redux/actions';
//import OrderFilterBar from '../OrderFilterBar/OrderFilterBar';
import Paginado from '../Paginado/Paginado';
import RecipesContainer from '../RecipesContainer/RecipesContainer'
import SearchBar from '../SearchBar/SearchBar';
//import style from 'home.module.css'

const Home = () => {
    const dispatch = useDispatch();
    const recipes = useSelector(state=>state.recipes)

    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;

    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
    const paginado = (pageNumber) => {setCurrentPage(pageNumber)}

    useEffect(() => {
        dispatch(allRecipes())
        dispatch(getDiets())
    },[dispatch]);

    return(
        <div>
            <SearchBar />
            <RecipesContainer key={recipes.id} recipes={currentRecipes}/>
            <Paginado
                recipes={recipes.length}
                currentPage={currentPage} 
                recipesPerPage={recipesPerPage} 
                paginado={paginado}
            />
        </div>
    )
};

export default Home;