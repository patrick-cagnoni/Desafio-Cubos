import { config } from './config';

const genresAPI = {
    get(){
        const { URL_GENRES, API_KEY, LANGUAGE } = config;
        const url = `${URL_GENRES}?api_key=${API_KEY}&language=${LANGUAGE}`
        const req = new Request(url);
        return fetch(req);
    }
}

export default genresAPI;