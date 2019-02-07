import React from 'react';

class LogEntry extends React.Component {
    render() {
        let log = '';
        if (this.props.log.boardComment)
            log += this.props.log.boardComment;
        if (this.props.log.comment)
            log += this.props.log.comment;

        let newStatus = '';
        if (this.props.log.status) {
            newStatus = "Board has marked this: ";
            switch (this.props.log.status) {
                case 1:
                    newStatus += "Done";
                    break;
                case 2:
                    newStatus += "Scheduled";
                    break;
                case 3:
                    newStatus += "Ignored";
                    break;
                default:
                    newStatus += "Indeterminate";
                    break;
            }
        } else {
            newStatus = "School has marked this: " + (this.props.log.broken ? "Broken" : "Not Broken");
        }

        return (
            <div className="wrapper style4" style={{ width: '50%', marginBottom: '10px', padding: '20px' }}>
                <p style={{ textAlign: 'center', marginBottom: '10px' }}>{log}</p>
                <p style={{ textAlign: 'center', marginBottom: '10px'}}>{newStatus}</p>
                <p style={{ textAlign: 'right', marginBottom: '10px' }}>from {this.props.log.name} [{this.props.log.role}]</p>
            </div>
        );
    }
}

export default LogEntry;
