import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/presentation/Footer';

import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import HomeView from './views/HomeView';
import IssueView from './views/IssueView';
import AddItemView from './views/AddItemView';
import EditItemView from './views/EditItemView';

class App extends React.Component {
  render() {
    return (
      <div id="page-wrapper">
        <Route component={_ => ( <Navbar isBoard="true"/> )} />
        <article id="main">
          <Route exact path='/' render={props => (
            this.props.isLoggedIn
             ? ( <Redirect to="/app" /> ) 
             : ( <LoginView location={props.location} /> )
          )} />
          <Route exact path='/register' render={_ => (
            this.props.isLoggedIn
            ? ( <Redirect to='/app' /> )
            : ( <RegisterView /> )
          )} />
          <Route exact path='/app' render={_ => (
            !this.props.isLoggedIn
            ? ( <Redirect to='/' /> )
            : ( <HomeView /> )
          )} />
          <Route path='/app/issue/:id' render={props => (
            !this.props.isLoggedIn
            ? ( <Redirect to='/' /> )
            : ( <IssueView id={props.match.params.id} {...props} /> )
          )} />
          <Route path='/app/add' render={_ => (
            !this.props.isLoggedIn
            ? ( <Redirect to='/' /> )
            : ( <AddItemView /> )
          )} />
          <Route path='/app/edit' render={_ => (
            !this.props.isLoggedIn
            ? ( <Redirect to='/' /> )
            : ( <EditItemView /> )
          )} />
        </article>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.token !== null
  };
};

export default withRouter(connect(mapStateToProps)(App));
