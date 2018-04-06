//@flow

import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../actions/index';
import {Form, FormGroup, Label, Input} from 'reactstrap';


type State = {
    email: string,
    password: string,
    submitted: boolean
}
type Props = {
    loggingIn: boolean,
    logout: ()=>void,
    login: (string, string)=>void,
    handleSubmit: (Event)=>void,
    handleChange: (Event)=>void
}

class LoginPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.props.logout();
        this.state = {
            email: '',
            password: '',
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { email, password } = this.state;
        if (email && password) {
            this.props.login(email, password);
        }
    };

    render() {
        const { loggingIn } = this.props;
        const { email, password, submitted } = this.state;
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="loginEmail" placeholder="Email" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="loginPassword" placeholder="Password" />
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logout: () => {
            dispatch(userActions.logout())
        },
        login: (email, password) => {
            dispatch(userActions.login(email, password))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);