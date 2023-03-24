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
    const diets = useSelector(state=>state.diets)

    const [post, setPost] = useState({
        name: "",
        image: "",
        summary: "",
        healthScore: "",
        analyzedInstructions: [],
        dietas: []
    });
    const [errors, setErrors] = useState({}); // estado local para errores
    const [steps, setSteps] = useState([]);
    
    const addStep = (event) => {
        setSteps([...steps, '']);

        setPost({
            ...post,
            analyzedInstructions: [...steps, event.target.value]
        })
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

    const postValidator = (post) => {
        const errors = {};
        const regex = /^https?:\/\/\S+\.(jpg|jpeg|png)$/;

        if(!post.name.length) errors.name = "Recipe name can't be empty";
        if(!regex.test(post.image)) errors.image = "This isn't a valid URL";
        if(!post.image.length) errors.image = "Recipe image can't be empty"
        if(post.summary.length < 10) errors.summary = "Recipe summary must have more than 10 characters"
        if(!post.summary.length) errors.summary = "Recipe summary can't be empty";
        if(!post.healthScore) errors.healthScore = "Recipe Health Score can't be empty";
        if(post.healthScore < 0) errors.healthScore = "Recipe Health Score can't be less than 0";
        if(post.healthScore > 100) errors.healthScore = "Recipe Health Score can't be higher than 100";
        if(!post.analyzedInstructions.length) errors.analyzedInstructions = "The step-by-step instructions of the recipe must be entered";
        if(!post.dietas.length) errors.dietas = "It's necessary to select at least one diet";
        
        return errors;
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            if(!Object.keys(errors).length){
                const postForm = await axios.post('http://localhost:3001/recipes/post', post)
                alert(postForm.data);
                history.push('/home'); 
            } else {
                alert("All requirements have to be entered correctly")
            }
        } catch (error) {
            alert(error.message)
        }
    };

    const handleClick = () => {
        history.push('/home');
    };

    useEffect(()=>{
        setErrors(postValidator(post))
        dispatch(getDiets())
    },[dispatch,post]);


    return(   
        <div className={style.div}>
            <button onClick={handleClick} className={style.btnBack}>GO BACK</button>
        <div className={style.form}>
        <form onSubmit={submitHandler}>
            <h2 className={style.titulo}>POST NEW RECIPE</h2>
            
            <div className={style.divs}>
                <label className={style.label}>NAME  *</label>
                <input type='text' name='name' value={post.name} onChange={changeHandler} className={style.inputName} placeholder='Name' autoComplete='off'/>
                <p className={style.p}>{errors.name}</p>
            </div>

            <div className={style.divs}>
                <label htmlFor='image' className={style.label}>IMAGE  *</label>
                <input type='text' id='image' name='image' value={post.image} onChange={changeHandler} className={style.inputImage} placeholder='URL for a PNG/JPEG image' autoComplete='off'/>
                <p className={style.p}>{errors.image}</p>
            </div>

            <div className={style.divs}>
                <label htmlFor='summary' className={style.label}>SUMMARY  *</label>
                <textarea type='text' id='summary' name='summary' value={post.summary} onChange={changeHandler} className={style.inputSummary} placeholder='Brief summary of the recipe'/>
                <p className={style.p}>{errors.summary}</p>
            </div>

            <div className={style.divs}>
                <label htmlFor='healthScore' className={style.label}>HEALTH SCORE  *</label>
                <input type='number' id='healthScore' name='healthScore' value={post.healthScore} onChange={changeHandler} className={style.inputHealth} placeholder='Min:0  Max:100'/>
                <p className={style.p}>{errors.healthScore && errors.healthScore}</p>
            </div>

            <div className={style.divs}>
                <label htmlFor='instruction' className={style.label}>INSTRUCTIONS  *</label>
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
                <span className={style.span}><i className="fas fa-exclamation-triangle"></i> Always keep the last input empty</span>
                <p className={style.p}>{errors.analyzedInstructions && errors.analyzedInstructions}</p>
            </div>            

            <label className={style.label}>DIETS  *</label>
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

            <div className={style.post}><button type='submit' className={style.postBtn}>POST</button></div>
        </form>
        </div>
        </div>
    )
};

export default Post;