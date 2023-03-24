import React from 'react'
import style from './paginado.module.css'

const Paginado = ({ paginado, recipes, recipesPerPage, currentPage}) => {

    const pageNumbers = [];

    for(let i = 0; i < Math.ceil(recipes / recipesPerPage); i++) {
        pageNumbers.push(i + 1);
    }

    const scrollHandler = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return(
        <nav>
            <ul className={style.ul}>
                <button onClick={() => { scrollHandler();paginado(currentPage - 1); }} disabled={currentPage === 1} className={style.atras}>
                    &#10148;
                </button>
                {pageNumbers &&
                pageNumbers.map((number) => {
                    return number !== currentPage ? (
                        <li key={number}>
                            <button onClick={() => {paginado(number); scrollHandler()}} className={style.numPag}>{number}</button>
                        </li>
                    ) : (
                        <li key={number}>
                            <button onClick={() => {paginado(number); scrollHandler()}} className={style.numPagSelec}>{number}</button>
                        </li>
                    
                    )
                })}
                <button onClick={() => { paginado(currentPage + 1); scrollHandler()}} disabled={currentPage === pageNumbers.length} className={style.adelante}>
                    &#10148;
                </button>
            </ul>
        </nav>
    )
};

export default Paginado;