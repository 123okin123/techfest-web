//@flow
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Container, Alert, Row, Col, Button} from 'reactstrap';
import {AvForm, AvField} from 'availity-reactstrap-validation'



type State = {
    confirming: boolean,
    token: ?string,
    verified: ?boolean
}


class VerifyRegistrationPage extends Component<{},State> {
    constructor() {
        super();
        (this: any).confirmRegistration = this.confirmRegistration.bind(this);
        this.state = {
            confirming: false,
        }
    }
    componentDidMount() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const token = params.get('token');
        this.setState({token: token});


    }

    confirmRegistration(event: SyntheticEvent<HTMLButtonElement>, values) {
        console.log(this.state);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic YXdlc29tZVRlYW06ZmVzdHRlY2g=',
                'Proxy-Authorization': 'Basic YXdlc29tZVRlYW06ZmVzdHRlY2g='
            },
            body: JSON.stringify({ password: values.password, token: this.state.token })
        };
        this.setState({confirming: true});
        fetch('api/public/verify-register/', requestOptions)
          .then((response)=>response.json())
          .then(json=>this.setState({verified : json}))
          .catch(err=>{console.log(err);this.setState({verified : false})})
          .then(()=>this.setState({confirming: false}))
    }

    render() {
        return(
          <Container className="container pt-5">
              <h1>CONFIRM REGISTRATION</h1>
              <Row className="py-5">
                  <Col sm="4">
                      {!(this.state.verified === true) &&
                      <div className="py-2">
                          <p>To confirm your participation at TECHFEST 2018 set a password for your members account and click on confirm.</p>
                          <AvForm onValidSubmit={this.confirmRegistration}>
                              <AvField name="password" label="Password" type="password" required />
                              <AvField name="confirmationPassword" label="Confirm Password" type="password" validate={{match:{value:'password'}}} required />
                              <Button disabled={this.state.confirming} color="primary">Confirm Registration</Button>
                          </AvForm>
                      </div>
                      }
                      {(this.state.verified === true) &&
                        <div>
                          <Alert className="mt-3" color="success">
                              Thanks for confirming your registration.
                          </Alert>
                            <p>You can now login to your member account <Link to='/login'>here...</Link></p>
                        </div>
                      }
                      {(this.state.verified === false) &&
                      <Alert className="mt-3" color="danger">
                          Ops, something bad happened. Please contact: info@techfest.com
                      </Alert>
                      }
                  </Col>
              </Row>
          </Container>
        )
    }
}






export default VerifyRegistrationPage;