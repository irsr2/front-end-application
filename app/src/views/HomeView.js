import React from 'react';
import { connect } from 'react-redux';

import { getBrokenItems, getItems, getResolved } from '../actions/HomeActions';
import { DISPLAY_TYPE_BROKEN, DISPLAY_TYPE_ALL, DISPLAY_TYPE_RESOLVED } from '../reducers/HomeReducer';

import ItemCard from '../components/ItemCard';

class HomeView extends React.Component {
    componentDidMount() {
        this.props.getBrokenItems();
    }

    handleGetBroken(event) {
        event.preventDefault();
        this.props.getBrokenItems();
    }

    handleGetResolved(event) {
        event.preventDefault();
        this.props.getResolved();
    }

    handleGetAll(event) {
        event.preventDefault();
        this.props.getItems();
    }

    render() {
        let title = 'Unknown display type!';
        switch (this.props.displayType) {
            case DISPLAY_TYPE_ALL:
                title = 'Inventory';
                break;
            case DISPLAY_TYPE_BROKEN:
                title = 'Unresolved Claims';
                break;
            case DISPLAY_TYPE_RESOLVED:
                title = 'Resolved Claims';
                break;
        }

        let cards = <h2 style={{ textAlign: 'center', fontSize: '30px'}}>Loading...</h2>;
        if (!this.props.pending)
            cards = this.props.items.map(item => <ItemCard key={item.equipmentId} item={item} />);

        return (
            <div>
                <h1 style={{ textAlign: 'center', fontSize: '50px'}}>{title}</h1>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <button onClick={e => this.handleGetBroken(e)}>Unresolved</button>
                    <button onClick={e => this.handleGetResolved(e)}>Resolved</button>
                    <button onClick={e => this.handleGetAll(e)}>Inventory</button>
                </div>
                <hr/>
                <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around'}}>
                    {cards}
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { 
        items: state.home.items,
        pending: state.home.pending,
        displayType: state.home.displayType
    };
}

export default connect(mapStateToProps, { getBrokenItems, getItems, getResolved })(HomeView);
