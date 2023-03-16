import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allRecipes, filterByApiOrDatabase, filterRecipesByDiet, orderRecipes, searchedRecipes } from '../../redux/actions';
import { Link } from 'react-router-dom';
import style from './searchBar.module.css'

const SearchBar = () => {
    const dispatch = useDispatch();
    const diets = useSelector(state=>state.diets)

    const [recipe, setRecipe] = useState('');
    
    const changeHandler = (event) => {
        setRecipe(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();                               
        dispatch(searchedRecipes(recipe))
    };

    const handleOrder = (event) => {
        dispatch(orderRecipes(event.target.value))
    };

    const filterByDiets = (event) => {
        dispatch(filterRecipesByDiet(event.target.value))
    };

    const filterByID = (event) => {
        dispatch(filterByApiOrDatabase(event.target.value))
    };
    
    return(
        <div className={style.div}>
            <div>
                <input htmlFor='search' type='search' value={recipe} onChange={changeHandler} className={style.inputSearch} placeholder='Search Recipe...' autoComplete='off'/>
                <Link to='/home'><button id='search' type='submit' onClick={submitHandler} className={style.btn}>SEARCH</button></Link>
            </div>

            <select onChange={handleOrder} className={style.select}>
                <option value='sinOrden'>Order by Health Score</option>
                <option value='healthScoreAsc'>0 - 100</option>
                <option value='healthScoreDesc'>100 - 0</option>
            </select>

            <select onChange={handleOrder} className={style.select}>
                <option value='sinOrden'>Order by Name</option>
                <option value='nameAsc'>A - Z</option>
                <option value='nameDesc'>Z - A</option>
            </select>

            <select onChange={filterByDiets} className={style.select}>
                <option value=''>Filter by Diets</option>
                {diets?.map(diet => {
                    return(
                        <option key={diet.id} value={diet.name}>{diet.name}</option>
                    )
                })}
            </select>

            <select onChange={filterByID} className={style.select}>
                <option value=''>Filter by Api/DB</option>
                <option value='apiRecipes'>Recipes from API</option>
                <option value='databaseRecipes'>Recipes from Database</option>
            </select>
        </div>  
    )
};

export default SearchBar;