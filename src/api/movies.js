import { config } from './config';

const { URL_SEARCH, 
    URL_GET_MOVIE, 
    URL_DISCOVER,
    API_KEY, 
    LANGUAGE, 
    BASE_URL_POSTER,
    BACKDROP_SIZE, 
    IMAGE_SIZE } = config;

const moviesAPI = {
    search(params){
        const url = `${URL_SEARCH}?api_key=${API_KEY}&language=${LANGUAGE}${params}`
        const req = new Request(url);
        return fetch(req);
    },
    getMovie(movieid){
        const url = `${URL_GET_MOVIE}/${movieid}?api_key=${API_KEY}&language=${LANGUAGE}`
        const req = new Request(url);
        return fetch(req);
    },

    discover(params){
        const url = `${URL_DISCOVER}?api_key=${API_KEY}&language=${LANGUAGE}${params}`
        const req = new Request(url);
        return fetch(req);
    },

    getPosterURL(path){
        return BASE_URL_POSTER + IMAGE_SIZE + path
    },

    getBackdropURL(path){
        return BASE_URL_POSTER + BACKDROP_SIZE + path
    },

    getMovieTrailer(movieid){
        const url = `${URL_GET_MOVIE}/${movieid}/videos?api_key=${API_KEY}&language=${LANGUAGE}`
        const req = new Request(url);
        return fetch(req);
    }
}

export default moviesAPI;