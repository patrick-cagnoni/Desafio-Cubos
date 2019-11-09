import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; 
import moviesAPI from '../../api/movies'
import { dateConverter, subString } from '../../util';

import './MovieItem.css';

const Movie = props => {

    const { 
        title, 
        poster_path,
        backdrop_path, 
        overview, 
        release_date, 
        vote_average, 
        genre_ids, 
        id 
    } = props.movie;

    const genres = [];
    genre_ids.forEach(id => genres.push( props.genres.find(genre => genre.id === id)));

    return ( 
        <React.Fragment>

            {/* div para dispositivos com telas pequenas */}
            <Link to={`/movie/${id}`}>
                <div className="movie-item-phone">
                    <img 
                        className="movie-item-phone-poster" 
                        src={ moviesAPI.getBackdropURL(backdrop_path)}
                        alt="movie poster">
                    </img>
                    <div className="movie-item-phone-info">
                        <div className="movie-item-phone-score score-circle">{ vote_average * 10 }</div>
                        <div className="movie-item-phone-heading">
                            <div className="movie-item-phone-title">{ title }</div>
                            <div className="movie-item-phone-date">{ dateConverter(release_date) }</div>
                        </div>
                    </div>
                </div> 
            </Link>
        
        <div className="movie-item">

            <Link to={`/movie/${id}`}>
                <img 
                    className="movie-item-backdrop" 
                    src={ moviesAPI.getBackdropURL(backdrop_path) }
                    alt="movie poster">
                </img>
                <img 
                    className="movie-item-poster" 
                    src={ moviesAPI.getPosterURL(poster_path) } 
                    alt="movie poster">
                </img>

            </Link>

            <div className="movie-item-content">

                <div className="movie-item-header">

                    <div className="movie-item-score">

                        <div className="score-circle">{ vote_average * 10 }%</div>

                    </div>
                    
                    <div className="movie-item-title">

                        <Link to={`/movie/${id}`}>
                            <span>{ title }</span>
                        </Link>
                        
                    </div>

                </div>

                <div className="movie-item-info">

                    <div className="movie-item-date">{dateConverter(release_date)}</div>
                    <div className="movie-item-overview"><p>{ subString(overview) }</p></div>
                    <div className="movie-item-genres">
                        <ul>
                            {genres.map(
                                genre => (
                                    <li className="movie-item-genre tag" key={genre.id}>
                                        {genre.name}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

       

        </React.Fragment>
     );
}

const mapStateToProps = state => {
    return {
        genres: state.genres
    }
}
 
export default connect(mapStateToProps)(Movie);