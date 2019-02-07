import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

import { checkCachedLogin } from './actions/UserActions';

import Navbar from './components/Navbar';
import Footer from './components/presentation/Footer';

import { LOGIN_PATH, REGISTER_PATH, HOME_PATH, ISSUE_PATH, ADD_ITEM_PATH, EDIT_ITEM_PATH, NULL_PATH } from './utils/parameters';

import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import HomeView from './views/HomeView';
import IssueView from './views/IssueView';
import AddItemView from './views/AddItemView';
import EditItemView from './views/EditItemView';

class App extends React.Component {
  componentDidMount() {
    this.props.checkCachedLogin();
  }
  
  render() {
    return (
      <div id="page-wrapper">
        <Route component={_ => ( <Navbar /> )} />
        <article id="main">
          <Route exact path={NULL_PATH} render={_ =>(<Redirect to={LOGIN_PATH} />)} />
          <Route exact path={LOGIN_PATH} render={props => (
            this.props.isLoggedIn
             ? ( <Redirect to={HOME_PATH} /> ) 
             : ( <LoginView location={props.location} /> )
          )} />
          <Route exact path={REGISTER_PATH} render={_ => (
            this.props.isLoggedIn
            ? ( <Redirect to={HOME_PATH} /> )
            : ( <RegisterView /> )
          )} />
          <Route exact path={HOME_PATH} render={_ => (
            !this.props.isLoggedIn
            ? ( <Redirect to={LOGIN_PATH} /> )
            : ( <HomeView /> )
          )} />
          <Route path={ISSUE_PATH} render={props => (
            !this.props.isLoggedIn
            ? ( <Redirect to={LOGIN_PATH} /> )
            : ( <IssueView id={props.match.params.id} {...props} /> )
          )} />
          <Route path={ADD_ITEM_PATH} render={_ => (
            !this.props.isLoggedIn
            ? ( <Redirect to={LOGIN_PATH} /> )
            : ( <AddItemView /> )
          )} />
          <Route path={EDIT_ITEM_PATH} render={props => (
            !this.props.isLoggedIn
            ? ( <Redirect to={LOGIN_PATH} /> )
            : ( <EditItemView id={props.match.params.id} {...props} /> )
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

export default withRouter(connect(mapStateToProps, { checkCachedLogin })(App));
