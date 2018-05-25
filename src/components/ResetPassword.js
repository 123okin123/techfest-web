//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container, Row, Col, Button, Alert} from 'reactstrap'
import {AvField, AvForm} from 'availity-reactstrap-validation'
import {Link} from "react-router-dom";

type Props = {
    location: {search: string}
}

type State = {
    resetPasswordSuccess?: boolean,
    token?: string
}

class ResetPassword extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        (this: any).handleValidSubmit = this.handleValidSubmit.bind(this);
        this.state = {}
    }

    componentDidMount() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const token = params.get('token');
        this.setState({token: token});
    }

    handleValidSubmit(event: SyntheticEvent<HTMLButtonElement>, values) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: values.password, token: this.state.token })
        };
        fetch('api/public/reset-password', requestOptions)
          .then((response)=>response.json())
          .then(json=>this.setState({resetPasswordSuccess : json.success}))
          .catch(err=>this.setState({resetPasswordSuccess : false}))
    }



    render() {
        return (
          <Container>
              <Row className="justify-content-center pt-5">
                  <Col sm="4">
                      <h1>Password Reset</h1>
                      {!(this.state.resetPasswordSuccess === true) &&
                      <AvForm onValidSubmit={this.handleValidSubmit}>
                          <AvField name="password" label="Password" type="password" required minLength={6}
                                   helpMessage="Min length 6 characters"/>
                          <AvField name="confirmationPassword" label="Confirm Password" type="password"
                                   validate={{match:{value:'password'}}} required minLength={6}/>
                          <Button color="primary">Reset Password</Button>
                      </AvForm>
                      }
                      {(this.state.resetPasswordSuccess === false) &&
                      <Alert className="mt-3" color="danger">Sorry, password reset was not successful.</Alert>
                      }
                      {(this.state.resetPasswordSuccess === true) &&
                        <div>
                        <Alert className="mt-3" color="success">Password reset successful.</Alert>
                        <p>You can now login to your member account.</p>
                        <Button tag={Link} to='/login'>Member Area</Button>
                        </div>
                      }
                  </Col>
              </Row>
          </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {}
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);