import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moviesAPI from '../../api/movies';
import Searchbar from '../Searchbar/Searchbar';
import MovieItem from '../MovieItem/MovieItem';
import Pagination from '../Pagination/Pagination';
import queryStrings from 'query-string';
import { CHANGE_PAGE } from '../../store/reducers/mainReducer';
import { sample } from '../../util';

import './MoviesList.css';

const MoviesList = props => {
    const [ movies, setMovies ] = useState({results:[]});
    const { query, page } = queryStrings.parse(props.location.search)
    const { perPage, changePage, genres } = props;

    useEffect( () => {
        if(query)
            fetchData(query, page, genres, perPage);
            window.scroll({top: 0, left:0, behavior: 'smooth'})
    },[query, page, genres, perPage])

    const fetchData = (query, page, genres, perPage) => {
        let promise;
        const queryArr = query.trim().split(" ");
        const genre = genres.find(gen => gen.name.toLowerCase() === queryArr[0].toLowerCase());

        // A API nao permite definir o numero de resultados por pagina, portanto é preciso ajustar os resultados
        // no cliente com o que é passado pelo servidor
        const APIPage = Math.ceil(page / 4); 

        if(genre){
            let values;
            queryArr.forEach(elem => {
                const value = genres.find(gen => gen.name.toLowerCase() === elem.toLowerCase());
                if(value)
                    values = values? `${values},${value.id}`:value.id;
            });

            promise = moviesAPI.discover(`&with_genres=${values}&page=${APIPage}`);
        }
        else {
            promise = moviesAPI.search(`&query=${query}&page=${APIPage}`);
        }

        promise
            .then(res => res.json())
            .then(data => {
                if(data.status_message)
                    alert('erro ao acessar a api')
                else {
                    //Para compensar as limitacoes da API, resolvi cortar 5 elementos do array com 20, portanto 4 paginas 
                    //do projeto equivalem a 1 pagina da API
                    const startPos = ((page - 1) % 4)  * perPage;
                    const endpos = startPos + perPage;
                    data.results = sample(data.results, startPos, endpos)
                    setMovies(data)
                }
            })
            .catch(console.error('erro ao acessar a API'))
    }

    return ( 
        <div className="movies">

            <Searchbar />

            <div className="movies-list">

                {movies.results.map( movie => (
                    <ul key={movie.id}>
                        <li key={movie.id}><MovieItem movie={movie}/></li>
                    </ul>
                ))}

            </div>

            <Pagination 
                page={page} 
                perPage={perPage} 
                numberOfElems={movies.total_results}
                onPageChange={changePage}
                query={query}
                range={10}
                offset={5}
            />

        </div>      
    );
}

const mapStateToProps = state => {
    return {
        page: state.result.page,
        perPage: state.result.perPage,
        genres: state.genres
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changePage: page => {
            const action = {
                type: CHANGE_PAGE,
                page
            }
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);