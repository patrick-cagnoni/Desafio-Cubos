import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom'; 
import moviesAPI from '../../api/movies';
import { dateConverter, timeConverter } from '../../util';

import './Movie.css';

const Movie = props => {

    const movieid = props.match.params.id
    
    const [ movie, setMovie ] = useState();

    useEffect(() => {
        console.log(window.innerWidth)
        Promise.all([moviesAPI.getMovie(movieid), moviesAPI.getMovieTrailer(movieid)])
            .then(responses  => Promise.all(responses.map(res => res.json())))
            .then(
                responses => {
                    const  [ movie, trailer ] = responses;
                    if(trailer.results.length > 0)
                        movie.trailer_key = trailer.results[0].key;
                    setMovie(movie)
                })
    },[movieid])

    if(movie){

        const { 
            title, 
            release_date, 
            overview, 
            status,
            spoken_languages,
            runtime,
            budget,
            revenue,
            poster_path,
            genres,
            vote_average, 
            trailer_key
        } = movie;

        return ( 
            <div className="movie">

                <div className="movie-header">
                    <div className="movie-title"><h2>{title}</h2></div>
                    <div className="movie-date"><p>{dateConverter(release_date)}</p></div>
                </div>
    
                <div className="movie-content">
    
                    <div className="movie-data">
                        <div className="movie-overview">
                            <h3>Sinopse</h3>
                            <p>{overview}</p>
                        </div>
                        <div className="movie-info">
                            <h3>Informações</h3>
                            <ul>
                                <li>
                                    <p className="movie-info-title">Situação</p>
                                    <p className="movie-info-data">{status}</p>
                                </li>
                                <li>
                                    <p className="movie-info-title">Idioma</p>
                                    <p className="movie-info-data">{spoken_languages[0].name}</p>
                                </li>
                                <li>
                                    <p className="movie-info-title">Duração</p>
                                    <p className="movie-info-data">{timeConverter(runtime)}</p>
                                </li>
                                <li>
                                    <p className="movie-info-title">Orçamento</p>
                                    <p className="movie-info-data">${budget}</p>
                                </li>
                                <li>
                                    <p className="movie-info-title">Receita</p>
                                    <p className="movie-info-data">${revenue}</p>
                                </li>
                                <li>
                                    <p className="movie-info-title">Lucro</p>
                                    <p className="movie-info-data">${revenue - budget}</p>
                                </li>
                            </ul>
                        </div>

                        <div className="movie-bottom">

                            <div className="movie-genres">
                                <ul>
                                    {genres.map(genre => (
                                        <li 
                                            className="movie-genre tag"
                                            key={genre.id}
                                            >{genre.name}</li>)
                                    )}
                                </ul>
                            </div>

                            <div className="movie-score">
                                <div className="score-circle"><p>{vote_average * 10}%</p></div>
                            </div>

                        </div>

                    </div>
    
                    <img className="movie-poster" src={moviesAPI.getPosterURL(poster_path)} alt="movie poster"></img>
    
                </div>
    
                {trailer_key?
                    <div className="movie-trailer" >
                        <iframe 
                            title="trailer"
                            src={`https://www.youtube.com/embed/${trailer_key}`} 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen>
                        </iframe>
                    </div>
                    :null
                }
    
            </div>
         );
    }
    else {
        return (
            <p>Carregando...</p>
        )
    }
}

export default withRouter(Movie);