import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cleanDetail, getRecipeDetail } from '../../redux/actions';
import style from './recipeDetail.module.css'
import Loader from '../Loader/Loader';


const RecipeDetail = () => {
    const history = useHistory();
    const { id } = useParams(); 
    const dispatch = useDispatch();
    const recipeDetail = useSelector(state=>state.recipeDetail);

    useEffect(()=>{
        dispatch(getRecipeDetail(id))

        return function(){
            dispatch(cleanDetail())
        }
    },[dispatch, id]);

    const handleClick = (event) => {
        event.preventDefault();
        history.push('/home');
    }

    if(recipeDetail.dietas !== undefined){
    return(
        <div className={style.fondo}>
            <button onClick={handleClick} className={style.btn}>GO BACK</button>
         <div className={style.pizarron}>
            <h1 className={style.name}>{recipeDetail.name}</h1>
            <img src={recipeDetail.image} alt='imagen' className={style.image}/>
            <h3 className={style.healthScore}>Health Score: {recipeDetail.healthScore}</h3>
            {/* <p className={style.p}>{recipeDetail.summary}</p> */}
            <p dangerouslySetInnerHTML={{__html:recipeDetail.summary}} className={style.p}/>
            <ul className={style.instructions}>
                {
                isNaN(id)  
                ? recipeDetail.analyzedInstructions.slice(0, -1).map((instr, index) => {
                    return (
                        <li key={index} className={style.li}>Step {index + 1}: {instr}</li>
                    )
                }) 
                : recipeDetail.analyzedInstructions.map((arr) => {
                    return arr.map((instr, index) => {
                        return(
                            <li key={index} className={style.li}>Step {index + 1}: {instr}</li>
                        )
                    })
                })  
                }
            </ul>
            <ul className={style.dietas}>
                Diets:
            {recipeDetail.dietas.map(diet => {
                return(
                    <li key={diet}>{diet}</li>
                )
            })}
            </ul>
        </div>
        </div>
    )}else{
        return(
            <div>
                <Loader />
            </div>
        )
    }

};

export default RecipeDetail;