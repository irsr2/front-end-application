import React from 'react';
import EditItemForm from '../components/EditItemForm';

class EditItemView extends React.Component {
    render() {
        return (
            <div>
                <h1 style={{ textAlign: 'center', fontSize: '50px'}}>Edit Item {this.props.id}</h1>
                <EditItemForm id={this.props.id} />
            </div>
        );
    }
}

export default EditItemView;
