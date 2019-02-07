import React from 'react';
import AddItemForm from '../components/AddItemForm';

class AddItemView extends React.Component {
    render() {
        return (
            <div>
                <h1 style={{ textAlign: 'center', fontSize: '50px'}}>Add a New Item</h1>
                <AddItemForm/>
            </div>
        );
    }
}

export default AddItemView;
