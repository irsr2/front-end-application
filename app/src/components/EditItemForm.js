import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getIssuePath } from '../utils/parameters';
import { editItem } from '../actions/IssueActions';
import PageForm from './presentation/PageForm';

class EditItemForm extends React.Component {
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
        this.props.editItem(this.props.id, req.type, req.broken, req.image, () => this.onSubmitSuccess());
    }

    onSubmitSuccess() {
        this.props.history.push(getIssuePath(this.props.id));
    }

    onSubmitError() {
        console.error('Notify the user of error.');
    }

    render() {
        return (
            <PageForm>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <label htmlFor='image'>Add an image for reference: </label>
                    <input type="file" id="image" name="image" accept="image/*" onChange={e => this.handleChangeImage(e)} />
                    <hr />
                    <label htmlFor='type'>Type of Equipment: </label>
                    <input id='type' type='text' placeholder='TV' value={this.state.type} onChange={e => this.handleChangeType(e)} required />
                    <hr />
                    <label htmlFor='broken'>Is it broken now? </label>
                    <select id='broken' value={this.state.broken} onChange={e => this.handleChangeBroken(e)} required >
                        <option value="0">Not Broken</option>
                        <option value="1">Broken</option>
                    </select>
                    <hr />
                    <button type='submit'>Edit Item</button>
                </form>
            </PageForm>
        );
    }
}

/*
<select id='type' value={this.state.type} onChange={e => this.handleChangeType(e)} required >
                        <option value="1">TV</option>
                        <option value="2">Server</option>
                        <option value="3">Router</option>
                        <option value="4">Tablet</option>
                        <option value="5">HDMI Cables</option>
                        <option value="6">Chromebook</option>
                    </select>
*/

export default withRouter(connect(null, { editItem })(EditItemForm));
