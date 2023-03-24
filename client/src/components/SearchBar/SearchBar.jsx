import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allRecipes, filterRecipesByDiet, orderRecipes, searchedRecipes } from '../../redux/actions';
import { Link } from 'react-router-dom';
import style from './searchBar.module.css';

const SearchBar = ({ setCurrentPage }) => {
    const dispatch = useDispatch();
    const diets = useSelector(state=>state.diets)

    const [recipe, setRecipe] = useState('');
    const [nameOrder, setNameOrder] = useState('');
    const [healthScoreOrder, setHealthScoreOrder] = useState('');
    const [dietsFilter, setDietsFilter] = useState('');

    const changeHandler = (event) => {
        setRecipe(event.target.value);
    };

    const submitHandler = () => {
        dispatch(searchedRecipes(recipe))
            .then(() => {
                setCurrentPage(1);
                setDietsFilter('');
                setHealthScoreOrder('');
                setNameOrder('');
            })
    };

    const handleOrder = (event) => {
        dispatch(orderRecipes(event.target.value));
        setCurrentPage(1);
        if(event.target.value === 'healthScoreAsc' || event.target.value ===  'healthScoreDesc'){
            setHealthScoreOrder(event.target.value)
            setNameOrder('sinOrden')
        }else if(event.target.value === 'nameAsc' || event.target.value === 'nameDesc'){
           setNameOrder(event.target.value);
           setHealthScoreOrder('sinOrden') 
        } else {
            setNameOrder(event.target.value)
            setHealthScoreOrder(event.target.value)
        }
    };

    const filterByDiets = (event) => {
        dispatch(filterRecipesByDiet(event.target.value));
        setCurrentPage(1);
        setDietsFilter(event.target.value);
        setNameOrder('');
        setHealthScoreOrder('');
    };
    
    const resetHandler = () => {
        dispatch(allRecipes())
            .then(() => { 
                setCurrentPage(1);
                setDietsFilter('');
                setHealthScoreOrder('');
                setNameOrder('');
                setRecipe('');
            });
    } 

    return(
        <div className={style.div}>
            <div className={style.searchDiv}>
                <input type='search' value={recipe} onChange={changeHandler} className={style.inputSearch} placeholder='Search Recipe...' autoComplete='off' />
                <Link to='/home'>
                    <button type='submit' onClick={submitHandler} className={style.btn}>
                        <i className="fa fa-search"/>
                    </button>
                </Link>
            </div>

            <select value={healthScoreOrder} onChange={handleOrder} className={style.select}>
                <option value='sinOrden'>Order by Health Score</option>
                <option value='healthScoreAsc'>0 - 100</option>
                <option value='healthScoreDesc'>100 - 0</option>
            </select>

            <select value={nameOrder} onChange={handleOrder} className={style.select}>
                <option value='sinOrden'>Order by Name</option>
                <option value='nameAsc'>A - Z</option>
                <option value='nameDesc'>Z - A</option>
            </select>

            <select value={dietsFilter} onChange={filterByDiets} className={style.select}>
                <option value=''>Filter by Diets</option>
                {diets?.map(diet => {
                    return(
                        <option key={diet.id} value={diet.name}>{diet.name}</option>
                    )
                })}
            </select>
            
            <button onClick={resetHandler} className={style.reset}>Reset filter/orders</button>
        </div>  
    )
};

export default SearchBar;