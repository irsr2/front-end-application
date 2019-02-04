import React from 'react';
import { connect } from 'react-redux';

import { getItems } from '../actions/HomeActions';
import ItemCard from '../components/ItemCard';

class SchoolView extends React.Component {
    componentDidMount() {
        this.props.getItems();
    }

    render() {
        return (
            <div>
                <header>
                    <h1>School View</h1>
                    <p>Welcome, Dr. OtherExample</p>
                </header>
                <hr/>
                <h1>Equipment</h1>
                <div>
                    {this.props.items.map(item => <ItemCard key={item.id} item={item} />)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { items: state.items };
}

export default connect(mapStateToProps, { getItems})(SchoolView);
