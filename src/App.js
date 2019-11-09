import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { LOAD_GENRES } from './store/reducers/mainReducer';
import AppHeader from './Components/Header/AppHeader';
import Home from './Components/Home/Home';
import Movie from './Components/Movie/Movie';
import MoviesList from './Components/MoviesList/MoviesList';
import genresAPI from './api/genres';

import './App.css';
import './variables.css';


class App extends Component {
  componentDidMount(){
    genresAPI.get()
      .then(res => res.json())
      .then(data => {
        if(!data.status_message)
          this.props.loadGenres(data.genres)
        else alert('Erro ao acessar a api')
      }) 
  }

  render() { 
    return ( 
      <div className="app">
        <div className="container">
          <AppHeader />
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/search" component={ MoviesList } />
            <Route path="/movie/:id" component={ Movie } />
          </Switch>
        </div>
      </div>
     );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadGenres: genres => {
      const action = {
        type: LOAD_GENRES,
        genres
      }
      dispatch(action);
    }
  }
}
 
export default connect(null, mapDispatchToProps)(App);