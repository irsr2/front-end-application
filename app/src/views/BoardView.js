import React from 'react';
import { connect } from 'react-redux';

import { getBrokenItems } from '../actions/HomeActions';
import ItemCard from '../components/ItemCard';

class BoardView extends React.Component {
    componentDidMount() {
        this.props.getBrokenItems();
    }

    render() {
        let cards = <h2>Loading...</h2>;
        if (!this.props.pending)
            cards = this.props.items.map(item => <ItemCard key={item.equipmentId} item={item} />);

        return (
            <div>
                <h1>Unresolved Claims</h1>
                <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
                    {cards}
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { 
        items: state.home.items,
        pending: state.home.pending
    };
}

export default connect(mapStateToProps, { getBrokenItems})(BoardView);
