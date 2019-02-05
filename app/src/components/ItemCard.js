import React from 'react';
import { Link } from 'react-router-dom';

class ItemCard extends React.Component {
    render() {
        return (
            <Link to={`/issue/${this.props.item.equipmentId}`}>
                <div className="wrapper style4" style={{ width: '400px', margin: '20px'}}>
                    <h3>{this.props.item.type} - {this.props.item.broken ? 'Broken' : 'Not Broken'}</h3>
                </div>
            </Link>
        );
    }
}

export default ItemCard;
