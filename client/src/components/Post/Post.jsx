import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux' 
import style from './post.module.css'
import { getDiets } from '../../redux/actions'
import Step from './Step'
import { useHistory } from 'react-router-dom'


const Post = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const [post, setPost] = useState({
        name: "",
        image: "",
        summary: "",
        healthScore: "",
        analyzedInstructions: [],
        dietas: []
    });
    
    useEffect(()=>{
        setErrors(postValidator(post))
        dispatch(getDiets())
    },[dispatch, post]);
    
    const diets = useSelector(state=>state.diets)

    

    const [errors, setErrors] = useState({}); // estado local para errores
    
    const [steps, setSteps] = useState([]);
    const addStep = (event) => {
        setSteps([...steps,""]);

        setPost({
            ...post,
            analyzedInstructions: [...steps, event.target.value]
        })
    };
    
    const postValidator = (post) => {
        const errors = {};

        if(!post.name.length) errors.name = "Debe ingresar el nombre de la receta";
        if(!post.image) errors.image = "Debe ingresar una imagen de la receta";
        if(!post.summary.length) errors.summary = "Debe ingresar el resumen de la receta";
        if(!post.healthScore) errors.healthScore = "Debe ingresar el nivel de comida saludable de la receta";
        if(post.healthScore < 0) errors.healthScore = "El nivel de comida saludable no puede ser menor a 0";
        if(post.healthScore > 100) errors.healthScore = "El nivel de comida saludable no puede ser mayor a 100"
        if(!post.analyzedInstructions.length) errors.analyzedInstructions = "Debe ingresar el paso a paso de la receta";
        if(!post.dietas.length) errors.dietas = "Debe ingresar las dietas a las que pertenece la receta"
        
        return errors;
    };

    const changeHandler = (event) => {
        setPost({
            ...post,
            [event.target.name]: event.target.value
        })
    };

    const dietasChangeHandler = (event) => {
        if(event.target.checked){
            setPost({
                ...post,
                dietas: [...post.dietas, event.target.value]
            })
        } else {
            setPost({
                ...post,
                dietas: post.dietas.filter(dieta=> dieta !== event.target.value)
            })
        }
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        if(!Object.keys(errors).length){
            try {
                const postForm = await axios.post('http://localhost:3001/recipes/post', post)
                alert(postForm.data);
                setPost({
                    name: "",
                    image: "",
                    summary: "",
                    healthScore: "",
                    analyzedInstructions: [],
                    dietas: []
                });
                history.push('/home')  
            } catch (error) {
                alert(error.message)
            }
        } else{
            alert("Debes llenar bien el formulario de creación de receta")
        }
    };

    return(   
        <div className={style.form}>
        <form onSubmit={submitHandler}>
            <h2 className={style.titulo}>POST NEW RECIPE</h2>
            
            <div className={style.divs}>
                <label className={style.label}>NAME</label>
                <input type='text' name='name' value={post.name} onChange={changeHandler} className={style.inputName} placeholder='Name'/>
                <p className={style.p}>{errors.name && errors.name}</p>
            </div>

            <div className={style.divs}>
                <label htmlFor='image' className={style.label}>IMAGE</label>
                <input type='text' id='image' name='image' value={post.image} onChange={changeHandler} className={style.inputImage} placeholder='URL for a recipe image'/>
                <p className={style.p}>{errors.image && errors.image}</p>
            </div>

            <div className={style.divs}>
                <label htmlFor='summary' className={style.label}>SUMMARY</label>
                <textarea type='text' id='summary' name='summary' value={post.summary} onChange={changeHandler} className={style.inputSummary} placeholder='Brief summary of the recipe'/>
                <p className={style.p}>{errors.summary && errors.summary}</p>
            </div>

            <div className={style.divs}>
                <label htmlFor='healthScore' className={style.label}>HEALTH SCORE</label>
                <input type='number' id='healthScore' name='healthScore' value={post.healthScore} onChange={changeHandler} className={style.inputHealth} placeholder='Min:0  Max:100'/>
                <p className={style.p}>{errors.healthScore && errors.healthScore}</p>
            </div>

            <div className={style.divs}>
                <label htmlFor='instruction' className={style.label}>INSTRUCTIONS</label>
                {steps.map((step,index) => {
                    return <Step key={index} 
                    step={step} 
                    stepChangeHandler={ (event) => {
                        const newSteps = [...steps]
                        newSteps[index] = event.target.value
                        setSteps(newSteps)
                    }}/>
                })}
                <button type='button' onClick={addStep} className={style.botonInstruction}>+</button>
                <p className={style.p}>{errors.analyzedInstructions && errors.analyzedInstructions}</p>
            </div>            

            <label className={style.label}>DIETS</label>
            <div className={style.divs}>
                {diets?.map((diet) => {
                    return(
                    <div key={diet.id} className={style.dietas}>
                        <input type='checkbox' name='dietas' id={diet.name} value={diet.name}  onChange={dietasChangeHandler}/>
                        <label htmlFor={diet.name} >{diet.name}</label>
                    </div>
                )})}
            </div>
            <p className={style.p}>{errors.dietas && errors.dietas}</p>

            <div className={style.post}><button type='submit' disabled={Object.keys(errors).length} className={style.postBtn}>POST</button></div>
        </form>
        </div>
    )
}

export default Post;