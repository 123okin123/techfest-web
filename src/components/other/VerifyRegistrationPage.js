//@flow
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Container, Alert, Row, Col, Button} from 'reactstrap';
import {AvForm, AvField} from 'availity-reactstrap-validation'
import URLSearchParams from 'url-search-params'

type Props = {
    location: {search: string}
}

type State = {
    confirming: boolean,
    token?: string,
    verified?: boolean,
    error?: string
}


class VerifyRegistrationPage extends Component<Props,State> {
    constructor(props: Props) {
        super(props);
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

    confirmRegistration(event: SyntheticEvent<HTMLButtonElement>, values: {password: string}) {
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
          .then(json=> {
              this.setState({verified: json.success, error: json.reason + '. ' + json.error})
          })
          .catch(err=>{console.log(err);this.setState({verified : false})})
          .then(()=>this.setState({confirming: false}))
    }

    render() {
        return(
          <Container className="pt-5">
              <h1>CONFIRM REGISTRATION</h1>
              <Row className="py-5">
                  <Col sm="4">
                      {!(this.state.verified === true) &&
                      <div className="py-2">
                          <p>By setting your password your registration for TECHFEST MUNICH 2018 is set. You can register until May 27th. Please, be aware if you do not register until that date, your place will be offered to other applicants.</p>
                          <AvForm onValidSubmit={this.confirmRegistration}>
                              <AvField name="password" label="Password" type="password" required minLength={6}
                                       helpMessage="Min length 6 characters"/>
                              <AvField name="confirmationPassword" label="Confirm Password" type="password" validate={{match:{value:'password'}}} required minLength={6}/>
                              <Button disabled={this.state.confirming} color="primary">Confirm Registration</Button>
                          </AvForm>
                      </div>
                      }
                      {(this.state.verified === true) &&
                        <div>
                          <Alert className="mt-3" color="success">
                              Thanks for confirming your registration.
                          </Alert>
                            <p>You can now login to your member account.</p>
                            <Button tag={Link} to='/login'>Member Area</Button>
                        </div>
                       }
                      {(this.state.verified === false) &&
                      <Alert className="mt-3" color="danger">
                          Ops, something bad happened. {this.state.error}
                      </Alert>
                      }
                  </Col>
              </Row>
          </Container>
        )
    }
}






export default VerifyRegistrationPage;