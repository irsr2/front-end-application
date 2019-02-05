import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BoardView from './views/BoardView';
import IssueView from './views/IssueView';

class App extends React.Component {
  render() {
    return (
      <div id="page-wrapper">
        <Navbar isBoard="true"/>
        <article id="main">
          <Route exact path='/' component={() => <BoardView/>} />
          <Route path='/issue/:id' render={(props) => <IssueView id={props.match.params.id} {...props} />} />
        </article>
      </div>
    );
  }
}

export default App;
