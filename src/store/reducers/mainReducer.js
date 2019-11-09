export const LOAD_GENRES = "LOAD_GENRES";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const CHANGE_QUERY = "CHANGE_QUERY"; 

const initialState = {
    genres: [],
    result: {
        perPage: 5,
        page: 1
    }
}

export default function mainReducer( state = initialState, action ){
    switch(action.type){
        case 'LOAD_GENRES':
            return { ...state, genres: action.genres }
        case 'CHANGE_PAGE':
            return { ...state, result: { ...state.result, page: action.page}}
        case 'CHANGE_QUERY':
            return { ...state, query: action.query }
        default: return state;
    }
}