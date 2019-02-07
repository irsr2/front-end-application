import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { addBoardLog, addSchoolLog, editItem } from '../actions/IssueActions';

class AddLogForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            status: '',
            broken: 0
        };
    }

    handleChangeComment(event) {
        event.preventDefault();
        this.setState({ comment: event.target.value });
    }

    handleChangeStatus(event) {
        event.preventDefault();
        this.setState({ status: event.target.value });
    }

    handleChangeBroken(event) {
        event.preventDefault();
        this.setState({ broken: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.props.isBoard) {
            this.props.addBoardLog(this.props.item.equipmentId, this.state.status, this.state.comment);
        } else {
            this.props.addSchoolLog(this.props.item.equipmentId, this.state.broken, this.state.comment);
        }
    }

    onSubmitSuccess() {
        if (this.state.status === 1 || this.state.broken === 0) {
            console.error('Edit the equipment item now.');
        }

        this.setState({ image: null, type: '', broken: 0 });
    }

    onSubmitError() {
        console.error('Display the error to the user somehow.');
    }

    render() {
        let form = (
            <form onSubmit={e => this.handleSubmit(e)}>
                <label htmlFor='comment'>Add a Comment: </label>
                <input id='comment' type='text' value={this.state.comment} placeholder='Enter Comment...' onChange={e => this.handleChangeComment(e)} />
                <hr />
                <label htmlFor='broken'>Is it broken now? </label>
                <select id='broken' value={this.state.broken} onChange={e => this.handleChangeBroken(e)} required >
                    <option value="0">Not Broken</option>
                    <option value="1">Broken</option>
                </select>
                <hr />
                <button type='submit'>Add Log</button>
            </form>
        );

        if (this.props.isBoard) {
            form = (
                <form onSubmit={e => this.handleSubmit(e)}>
                    <label htmlFor='comment'>Add a Comment: </label>
                    <input id='comment' type='text' value={this.state.comment} placeholder='Enter Comment...' onChange={e => this.handleChangeComment(e)} />
                    <hr />
                    <label htmlFor='status'>What's the new status? </label>
                    <select id='status' value={this.state.status} onChange={e => this.handleChangeStatus(e)} required >
                        <option value="1">Done</option>
                        <option value="2">Scheduled</option>
                        <option value="3">Ignored</option>
                    </select>
                    <hr />
                    <button type='submit'>Add Log</button>
                </form>
            )
        }


        return (
            <div className="wrapper style4" style={{ width: '50%', marginBottom: '10px', padding: '20px' }}>
                {form}
            </div>
        );
    }
}

export default withRouter(connect(null, { addBoardLog, addSchoolLog, editItem })(AddLogForm));
