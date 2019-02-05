import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeView from './views/HomeView';
import IssueView from './views/IssueView';

class App extends React.Component {
  render() {
    return (
      <div id="page-wrapper">
        <Navbar isBoard="true"/>
        <article id="main">
          <Route exact path='/' component={() => <HomeView/>} />
          <Route path='/issue/:id' render={(props) => <IssueView id={props.match.params.id} {...props} />} />
        </article>
      </div>
    );
  }
}

export default App;
