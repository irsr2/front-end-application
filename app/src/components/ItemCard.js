import React from 'react';
import { Link } from 'react-router-dom';
import { getServerLink } from '../utils/parameters';

class ItemCard extends React.Component {
    render() {
        return (
            <Link to={`/issue/${this.props.item.equipmentId}`} style={{ borderBottom: 'unset' }}>
                <div className="wrapper style4" style={{ width: '350px', margin: '20px', padding: '20px'}}>
                    <img src={getServerLink(`/${this.props.item.equipmentImage}`)} alt='' style={{ width: '100%', height: 'auto', maxHeight: '300px', borderRadius: '5px' }} />
                    <h3 style={{ textAlign: 'center' }}>{this.props.item.type} - {this.props.item.broken ? 'Broken' : 'Not Broken'}</h3>
                </div>
            </Link>
        );
    }
}

export default ItemCard;
