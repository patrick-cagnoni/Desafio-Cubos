import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import './Searchbar.css';

const Searchbar = props => {

    const [ query, setQuery ] = useState('');
    
    const handleKeyUp = key => {
        if(key === 'Enter'){
            if(!query) return
                props.history.push(`/search?query=${query}&page=1`)
        }
    }

    return ( 
        <input 
            className="searchbar"
            type="text" 
            placeholder="Busque um filme por nome ou gênero"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyUp={e => handleKeyUp(e.key)}
        />
    );
}
 
export default withRouter(Searchbar);