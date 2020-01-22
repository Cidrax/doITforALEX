import React from 'react';
import styles from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './routes/home/Home';
import Movie from './routes/movie/Movie';

const backgroundImageUrl = 'https://picsum.photos/1920/1000/?blur=5';
const App = () => {
  return (
    <div className={ styles.App } style={ { backgroundImage: `url(${ backgroundImageUrl })` } }>
      <Router>
        <Switch>
          <Route exact path="/" component={ Home }/>
          <Route path="/movie/:id" component={ Movie }/>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
