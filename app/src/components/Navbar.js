import React from 'react';

class Navbar extends React.Component {
    render() {
        return (
            <header id="header">
                <h1 id="logo"><a href="#">International Rural School Report</a></h1>
                <nav id="nav">
                    <ul>
                        <li className="current"><a href="#">{this.props.isBoard ? 'Claims' : 'Inventory'}</a></li>
                        {this.props.isBoard ? null : <li><a href="#">Add a Claim</a></li>}
                        <li><a href="#" className="button primary">Logout</a></li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Navbar;
