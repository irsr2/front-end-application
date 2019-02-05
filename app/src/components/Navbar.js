import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
    render() {
        return (
            <header id="header">
                <h1 id="logo"><Link to='/'>International Rural School Report</Link></h1>
                <nav id="nav">
                    <ul>
                        <li className="current"><Link to='/'>{this.props.isBoard ? 'Claims' : 'Inventory'}</Link></li>
                        {this.props.isBoard ? null : <li><Link to='/add'>Add a Claim</Link></li>}
                        <li><Link to='/logout' className='button primary'>Logout</Link></li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Navbar;
