import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import Modal from '../components/presentation/Modal';
import { getSingleItem, deleteItem } from '../actions/IssueActions';
import { getServerLink, HOME_PATH, getEditItemPath } from '../utils/parameters';
import LogEntry from '../components/LogEntry';
import AddLogForm from '../components/AddLogForm';

class IssueView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false
        }
    }

    componentDidMount() {
        console.log(this.props.id);
        this.props.getSingleItem(this.props.id);
    }

    handleOpenDeleteModal(event) {
        event.preventDefault();
        this.setState({ modalOpen: true });
    }

    handleCloseModal(event) {
        event.preventDefault();
        this.setState({ modalOpen: false });
    }

    handleDelete(event) {
        event.preventDefault();
        this.props.deleteItem(this.props.id);
    }

    onDeleteSuccess() {
        this.setState({ modalOpen: false });
        this.props.history.push(HOME_PATH);
    }

    onDeleteError() {
        console.error("Delete failed- how to show this?");
    }

    render() {
        let issue = <h2 style={{ textAlign: 'center', fontSize: '30px' }}>Loading...</h2>;
        if (!this.props.pending && this.props.item) {
            issue = (
                <div style={{ padding: '20px' }}>
                    <div className="wrapper style4" style={{ marginBottom: '20px', textAlign: 'center' }}>
                        <div style={{ width: '100%' }}>
                            <img src={getServerLink(`/${this.props.item.equipmentImage}`)} alt='' style={{ maxWidth: '500px', height: 'auto', borderRadius: '5px', margin: '0 auto' }} />
                        </div>
                        <h3>{this.props.item.type} - {this.props.item.broken ? 'Broken' : 'Not Broken'}</h3>
                        <div>
                            <Link to={getEditItemPath(this.props.id)}><button style={{ margin: '10px' }}>Edit</button></Link>
                            <button style={{ margin: '10px' }} onClick={e => this.handleOpenDeleteModal(e)}>Delete</button>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'center'}}>
                        <AddLogForm isBoard={true} item={this.props.item} />
                        {this.props.logs.map(log => <LogEntry key={log.created_at} log={log} />)}
                    </div>
                </div>
            );
        }

        return (
            <div>
                <h1 style={{ textAlign: 'center', fontSize: '50px' }}>Claim Detail {this.props.id}</h1>
                {issue}
                <Modal handleClose={e => this.handleCloseModal(e)} handleConfirm={e => this.handleDelete(e)} show={this.state.modalOpen}>
                    <h2 style={{ textAlign: 'center', fontSize: '30px' }}>Delete item {this.props.id}?</h2>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let logs = [];
    let item = null;

    if (state.issue.item) {
        logs = state.issue.item.boardLog.concat(state.issue.item.schoolLog);

        function compare(a, b) {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            if (dateA < dateB)
                return -1;
            if (dateA > dateB)
                return 1;
            return 0;
        }

        logs.sort(compare);
        logs.reverse();

        item = state.issue.item.equipment[0];
    }

    return {
        item: item,
        logs: logs,
        pending: state.issue.pending
    }
}

export default withRouter(connect(mapStateToProps, { getSingleItem, deleteItem })(IssueView));
