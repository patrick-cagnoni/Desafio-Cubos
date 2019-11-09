import React from 'react';
import { Link } from 'react-router-dom';
import './AppHeader.css';

const AppHeader = () => {
    return ( 
        <div className="header">
            <Link to="/">
                Movies
            </Link>
        </div>
     );
}
 
export default AppHeader;