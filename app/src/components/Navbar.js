import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { LOGIN_PATH, REGISTER_PATH, HOME_PATH, ADD_ITEM_PATH } from '../utils/parameters';
import { logout } from '../actions/UserActions';

class Navbar extends React.Component {
    onLogout() {
        this.props.logout();
        this.props.history.push(LOGIN_PATH);
    }

    render() {
        let navItems = (
            <ul>
                <li><Link to={REGISTER_PATH}>Register</Link></li>
                <li><Link to={LOGIN_PATH}>Login</Link></li>
            </ul>
        );

        if (this.props.isLoggedIn) {
            navItems = (
                <ul>
                    <li className="current"><Link to={HOME_PATH}>{this.props.isBoard ? 'Claims' : 'Inventory'}</Link></li>
                    {this.props.isBoard ? null : <li><Link to={ADD_ITEM_PATH}>Add a Claim</Link></li>}
                    <li><a className='button primary' onClick={_ => this.onLogout()}>Logout</a></li>
                </ul>
            )
        }


        return (
            <header id="header">
                <h1 id="logo"><Link to={HOME_PATH}>International Rural School Report</Link></h1>
                <nav id="nav">
                    {navItems}
                </nav>
            </header>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.token !== null
    };
};

export default withRouter(connect(mapStateToProps, { logout })(Navbar));
