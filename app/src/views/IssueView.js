import React from 'react';
import { connect } from 'react-redux';
import { getSingleItem } from '../actions/IssueActions';

class IssueView extends React.Component {
    componentDidMount() {
        this.props.getSingleItem(this.props.id);
    }

    render() {
        let issue = <h2>Loading...</h2>;
        if (!this.props.pending && this.props.item) {
            issue = (
                <div className="wrapper style4" style={{ margin: '20px' }}>
                    <h3>{this.props.item.type} - {this.props.item.broken ? 'Broken' : 'Not Broken'}</h3>
                    <div>
                        <h3>Last Claim</h3>
                        <p>{this.props.item.comment}</p>
                        <p>by {this.props.item.user}</p>
                    </div>
                    <div>
                        <h3>Last Board Response</h3>
                        <p>{this.props.item.boardComment}</p>
                        <p>from {this.props.item.name} - {this.props.item.role}</p>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <h1>Claim Detail {this.props.id}</h1>
                {issue}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        item: state.issue.item,
        pending: state.issue.pending
    }
}

export default connect(mapStateToProps, { getSingleItem })(IssueView);
