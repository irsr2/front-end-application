import React from 'react';

class ItemCard extends React.Component {
    render() {
        return (
            <div class="wrapper style4">
                <h3>{this.props.item.type}</h3>
                <h3>{this.props.item.broken ? 'Broken' : 'Not Broken'}</h3>
            </div>
        );
    }
}

export default ItemCard;
