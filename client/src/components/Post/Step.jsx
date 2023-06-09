import React from 'react'
import style from './post.module.css'

const Step = ({ step , stepChangeHandler}) => {
    return(
        <div>
            <input type='text' value={step} onChange={stepChangeHandler} className={style.inputInstructions} placeholder='Press the "+" button bellow to add this step'/>
        </div>
    )
}

export default Step;