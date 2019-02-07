import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { HOME_PATH } from '../utils/parameters';
import { addItem } from '../actions/IssueActions';
import PageForm from './presentation/PageForm';

class AddItemForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            type: '',
            broken: 0
        };
    }

    handleChangeImage(event) {
        this.setState({ image: event.target.files[0] });
    }

    handleChangeType(event) {
        event.preventDefault();
        this.setState({ type: event.target.value });
    }

    handleChangeBroken(event) {
        event.preventDefault();
        this.setState({ broken: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const req = Object.assign({}, this.state);
        this.props.addItem(req.type, req.broken, req.image, () => this.onSubmitSuccess());
    }

    onSubmitSuccess() {
        this.props.history.push(HOME_PATH);
    }

    onSubmitError() {
        console.error('Notify the user of an error somehow.');
    }

    render() {
        return (
            <PageForm>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <label htmlFor='image'>Add an image for reference: </label>
                    <input type="file" id="image" name="image" accept="image/*" onChange={e => this.handleChangeImage(e)} />
                    <hr/>
                    <label htmlFor='type'>Type of Equipment: </label>
                    <input id='type' type='text' placeholder='TV' value={this.state.type} onChange={e => this.handleChangeType(e)} required />
                    <hr/>
                    <label htmlFor='broken'>Is it broken now? </label>
                    <select id='broken' value={this.state.broken} onChange={e => this.handleChangeBroken(e)} required >
                        <option value="0">Not Broken</option>
                        <option value="1">Broken</option>
                    </select>
                    <hr/>
                    <button type='submit'>Add Item</button>
                </form>
            </PageForm>
        );
    }
}

export default withRouter(connect(null, { addItem })(AddItemForm));
