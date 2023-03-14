import React from 'react'
import { Link } from 'react-router-dom';
import style from './navBar.module.css'

const NavBar = () => {
    return(
        <div className={style.navBar}>
        <Link to='/home'>   <button className={style.btn}>HOME</button>    </Link>
        <Link to='/post'>   <button className={style.btn}>POST RECIPE</button>    </Link>
        </div>
    )
}

export default NavBar;