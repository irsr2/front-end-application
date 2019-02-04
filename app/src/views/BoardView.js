import React from 'react';
import { connect } from 'react-redux';

import { getBrokenItems } from '../actions/HomeActions';
import ItemCard from '../components/ItemCard';

class BoardView extends React.Component {
    componentDidMount() {
        this.props.getBrokenItems();
    }

    render() {
        let cards = <div><h2>Loading...</h2></div>
        if (!this.props.pending)
        {
            cards = (
                <div>
                    {this.props.items.map(item => <ItemCard key={item.equipmentId} item={item} />)}
                </div>
            );
        }

        return (
            <div>
                <header>
                    <h1>Board View</h1>
                    <p>Welcome, Dr. Example</p>
                </header>
                <hr/>
                <h1>Unresolved Claims</h1>
                {cards}
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
