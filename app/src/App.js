import React from 'react';
import Navbar from './components/Navbar';
import BoardView from './views/BoardView';

class App extends React.Component {
  render() {
    return (
      <div id="page-wrapper">
        <Navbar/>
        <article id="main">
          <BoardView/> 
        </article>
      </div>
    );
  }
}

export default App;
