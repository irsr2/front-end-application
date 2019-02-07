import React from 'react';
import { connect } from 'react-redux';

import { login } from '../actions/UserActions';
import PageForm from './presentation/PageForm';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleChangeEmail(event) {
        event.preventDefault();
        this.setState({ email: event.target.value });
    }

    handleChangePassword(event) {
        event.preventDefault();
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const email = this.state.email.slice();
        const password = this.state.password.slice();
        this.props.login(email, password);
    }

    render() {
        return (
            <PageForm>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <label htmlFor='email'>Email Address: </label>
                    <input id='email' type='email' value={this.state.email} placeholder='example@email.com' onChange={e => this.handleChangeEmail(e)} />
                    <label htmlFor='password'>Password: </label>
                    <input id='password' type='password' value={this.state.password} placeholder='Enter Password...' onChange={e => this.handleChangePassword(e)} />
                    <hr/>
                    <button type='submit'>Login</button>
                </form>
            </PageForm>
        );
    }
}

export default connect(null, { login })(LoginForm);
