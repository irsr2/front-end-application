import React from 'react';

const PageForm = props => {
    return (
        <div className="wrapper style4" style={{ margin: '20px', padding: '10px'}}>
            {props.children}
        </div>
    );
}

export default PageForm;