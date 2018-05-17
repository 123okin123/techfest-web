//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container, Row, Col, Alert, Button} from "reactstrap";
import {AvForm, AvField} from 'availity-reactstrap-validation'
import {Link} from "react-router-dom";

type Props = {}

type State = {
    email?: string,
    forgotMailSuccess?: boolean
}

class ForgotPassword extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
        (this: any).handleValidSubmit = this.handleValidSubmit.bind(this);
    }

    handleValidSubmit(event: SyntheticEvent<HTMLButtonElement>, values) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...values })
        };
        fetch('api/public/password-reset-token', requestOptions)
          .then((response)=>response.json())
          .then(json=>this.setState({forgotMailSuccess : json.success}))
          .catch(err=>this.setState({forgotMailSuccess : false}))
    }


    render() {
        return (
          <Container>
              <Row className="justify-content-center pt-5">
                  <Col sm="4">
                      <h1>Password Reset</h1>
                      {!(this.state.forgotMailSuccess === true) &&
                      <AvForm onValidSubmit={this.handleValidSubmit}>
                          <AvField name="email" label="Email" type="email" autoComplete="email" required />
                          <Button color="primary">Reset Password</Button>
                      </AvForm>
                      }
                      {(this.state.forgotMailSuccess === false) &&
                      <Alert className="mt-3" color="danger">
                          Sorry, password reset was not successful.
                      </Alert>
                      }
                      {(this.state.forgotMailSuccess === true) &&
                        <Alert className="mt-3" color="success">
                          Check your mails to reset your password.
                        </Alert>
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);