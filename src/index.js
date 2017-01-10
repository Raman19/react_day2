import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Router, Route,IndexRoute,browserHistory} from 'react-router';
import About from './components/About';
import Faq from './components/Faq';
import Home from './components/Home';
import Apicall from './components/Apicall';
import Boxes from './components/boxes/Boxes';
import Currency from './components/Currency';
import Movies from './components/movies/Movie';


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component = {Home} />
      <Route path="about" component={About} />
      <Route path="faq" component={Faq} />
      <Route path="box" component={Boxes} />
      <Route path="api" component={Apicall} />
      <Route path="cur" component={Currency} />
      <Route path="movie" component={Movies}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
