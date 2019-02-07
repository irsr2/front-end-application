import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { LOGIN_PATH } from '../utils/parameters';
import { register } from '../actions/UserActions';
import PageForm from './presentation/PageForm';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            roleSelected: '0',
        };
    }

    handleChangeName(event) {
        event.preventDefault();
        this.setState({ name: event.target.value });
    }

    handleChangeEmail(event) {
        event.preventDefault();
        this.setState({ email: event.target.value });
    }

    handleChangePassword(event) {
        event.preventDefault();
        this.setState({ password: event.target.value });
    }

    handleChangeRole(event) {
        event.preventDefault();
        this.setState({ roleSelected: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const name = this.state.name.slice();
        const email = this.state.email.slice();
        const password = this.state.password.slice();
        const isBoard = this.state.roleSelected === '1';
        this.props.register(name, email, password, isBoard, _ => this.onRegisterSuccess());
    }

    onRegisterSuccess() {
        this.props.history.push(LOGIN_PATH);
    }

    render() {
        return (
            <PageForm>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <label htmlFor='name'>Name: </label>
                    <input id='name' type='text' value={this.state.name} placeholder='Enter Name...' onChange={e => this.handleChangeName(e)} required />
                    <label htmlFor='email'>Email Address: </label>
                    <input id='email' type='email' value={this.state.email} placeholder='example@email.com' onChange={e => this.handleChangeEmail(e)} required />
                    <label htmlFor='password'>Password: </label>
                    <input id='password' type='password' value={this.state.password} placeholder='Enter Password...' onChange={e => this.handleChangePassword(e)} required />
                    <hr/>
                    <select id='role' value={this.state.roleSelected} onChange={e => this.handleChangeRole(e)} required >
                        <option value="0">School Admin</option>
                        <option value="1">Board Member</option>
                    </select>
                    <hr/>
                    <button type='submit'>Register</button>
                </form>
            </PageForm>
        );
    }
}

export default withRouter(connect(null, { register })(RegisterForm));
