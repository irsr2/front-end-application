import React from 'react';
import styled from 'styled-components';

const StyledModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
`;

const Modal = props => {
    const style = {
        position: 'fixed',
        width: '50%',
        height: 'auto',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    };

    return (
        <div style={{ display: props.show ? "block" : "none" }}>
            <StyledModalBackground>
                <section className='wrapper style4' style={style}>
                    {props.children}
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <button style={{ margin: '10px' }} onClick={props.handleConfirm}>Confirm</button>
                        <button style={{ margin: '10px' }} onClick={props.handleClose}>Close</button>
                    </div>
                </section>
            </StyledModalBackground>
        </div>
    );
};

export default Modal;
