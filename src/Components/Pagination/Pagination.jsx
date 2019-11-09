import React from 'react';
import { Link } from 'react-router-dom';

import './Pagination.css';

const Pagination = props => {

    const { page, perPage, offset, numberOfElems, query, range } = props;

    if(!numberOfElems) return null

    let numberOfPages = Math.ceil( numberOfElems / perPage ) < range? Math.ceil( numberOfElems / perPage ) : range;
    
    const pages = ( () => {

        let resultPages = [];
        let startPage = page > offset? page - offset: 1;
        numberOfPages = numberOfPages + startPage - 1;

        for( let i = startPage; i <= numberOfPages; i++){

            resultPages.push(
                <li 
                    className={`pagination-page ${ i === parseInt(page)? "active": ""}`}
                    key={i}
                    >
                        <Link to={`/search?query=${ query }&page=${i}`}>
                            { i }
                        </Link>
                </li>
            )
        }
        return resultPages;
    })()

    return ( 
        <div className="pagination">
            <ul className="pagination-list">
                { pages }
            </ul>
        </div>
    );
}


 
export default Pagination;