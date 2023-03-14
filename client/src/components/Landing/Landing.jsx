import React from 'react';
import style from './landing.module.css'
import { Link } from 'react-router-dom';

const Landing = () => {
    return(
        <div className={style.fondo}>
        <div className={style.pizarra}>
            <Link to='/home'>
                <button className={style.btn}>INGRESAR</button>
            </Link>
        </div>
        </div>
    )
}

export default Landing;