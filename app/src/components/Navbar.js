import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { logout } from '../actions/UserActions';

class Navbar extends React.Component {
    onLogout() {
        this.props.logout();
        this.props.history.push('/');
    }

    render() {
        let navItems = (
            <ul>
                <li><Link to='/register'>Register</Link></li>
                <li><Link to='/'>Login</Link></li>
            </ul>
        );

        if (this.props.isLoggedIn) {
            navItems = (
                <ul>
                    <li className="current"><Link to='/'>{this.props.isBoard ? 'Claims' : 'Inventory'}</Link></li>
                    {this.props.isBoard ? null : <li><Link to='/add'>Add a Claim</Link></li>}
                    <li><a className='button primary' onClick={_ => this.onLogout()}>Logout</a></li>
                </ul>
            )
        }


        return (
            <header id="header">
                <h1 id="logo"><Link to='/'>International Rural School Report</Link></h1>
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

export default connect(mapStateToProps, { logout })(withRouter(Navbar));
