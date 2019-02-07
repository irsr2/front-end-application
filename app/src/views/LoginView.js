import React from 'react';
import LoginForm from '../components/LoginForm';

class LoginView extends React.Component {
    render() {
        return (
            <div>
                <h1>Login</h1>
                <LoginForm />
            </div>
        );
    }
}

export default LoginView;
