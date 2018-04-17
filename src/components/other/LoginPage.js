//@flow

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../actions/index';
import {Col, Row, Container, Button, Alert} from 'reactstrap';
import {AvForm, AvField} from 'availity-reactstrap-validation'
import { Redirect } from 'react-router-dom';


type State = {
    email: string,
    password: string,
    submitted: boolean
}
type Props = {
    loggingIn: boolean,
    logout: ()=>void,
    login: (string, string)=>void,
    loginFailure: boolean
}

class LoginPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        (this:any).handleValidSubmit = this.handleValidSubmit.bind(this);
        this.state = {
            redirectToReferrer: false
        };
    }
    handleValidSubmit(event: SyntheticEvent<HTMLButtonElement>, values) {
        this.props.login(values.email, values.password).then(()=>{
            if (!this.props.loginFailure) {
                this.setState({redirectToReferrer: true});
            }
        });
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }
        return (
            <Container>
                <Row className="justify-content-center pt-5">
                    <Col sm="4">
                        <h1>Login</h1>
                        <AvForm onValidSubmit={this.handleValidSubmit}>
                            <AvField name="email" label="Email" type="email" autoComplete="email" required />
                            <AvField name="password" label="Password" type="password" autoComplete="current-password" required />
                            <Button disabled={this.props.loggingIn} color="primary">Login</Button>
                        </AvForm>
                        {this.props.loginFailure &&
                        <Alert className="mt-3" color="danger">
                            Sorry, login was not successful.
                        </Alert>
                        }
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const { loggingIn, loginFailure } = state.authentication;
    return {
        loggingIn,
        loginFailure
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logout: () => {
            dispatch(userActions.logout())
        },
        login: (email, password) => {
            return dispatch(userActions.login(email, password))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);