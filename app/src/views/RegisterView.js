import React from 'react';
import RegisterForm from '../components/RegisterForm';

class RegisterView extends React.Component {
    render() {
        return (
            <div>
                <h1 style={{ textAlign: 'center', fontSize: '50px'}}>Create an Account</h1>
                <RegisterForm />
            </div>
        );
    }
}

export default RegisterView;
