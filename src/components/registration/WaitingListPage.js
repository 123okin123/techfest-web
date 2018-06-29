//@flow
import React, {Component} from 'react'
import {Container, Row, Col, Button, FormGroup, Alert} from 'reactstrap'
import {AvForm, AvField} from 'availity-reactstrap-validation'
import {AvFieldParser} from "./AvFieldParser";
import {ScaleLoader} from 'react-spinners'
import {userActions} from "../../actions";
import {connect} from "react-redux";
import styled from "styled-components";


type State = {
    formData: {
        firstName?: string,
        lastName?: string,
        email?: string,
        waitingListFields?: {
            bestDescription?: string,
            motivation?: string
        }
    },
    submitError?: boolean
};
type Props = {
    registering?: boolean,
    registrationSuccess?: boolean,
    register: ({})=>Promise<void>,
}

class WaitingListPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        (this: any).onChange = this.onChange.bind(this);
        (this: any).onSubmit = this.onSubmit.bind(this);
        (this: any).onValidSubmit = this.onValidSubmit.bind(this);
        this.state = {formData: {}};
    }

    onChange(event: {target:{name: string, value: string}}) {
        const parsedField = AvFieldParser.parse({name: event.target.name, value: event.target.value});
        this.setState({
          ...this.state,
            formData: {
                ...this.state.formData,
                ...parsedField,
                waitingListFields: {
                    ...this.state.formData.waitingListFields,
                    ...(parsedField.waitingListFields || {})
                }
            }
            });
    }

    onValidSubmit(event, values) {
        this.setState({...this.state, submitError: undefined});

        this.props.register({...this.state.formData})
          .catch(e=>console.log(e))
    }

    onSubmit(event, errors, values) {
        errors ? this.setState({...this.state, submitError: true}) : this.setState({...this.state, submitError: undefined})
    }

    render() {
    return (
      <StyledContainer>
          <h1  className="mb-5">WAITINGLIST TECHFEST MUNICH 2019</h1>
          {!(this.props.registrationSuccess === true) &&
          <AvForm onChange={this.onChange} onSubmit={this.onSubmit} onValidSubmit={this.onValidSubmit}>
              <Row>
                  <Col md={4}><AvField label="First Name*" name="firstName" autoComplete='given-name' required/></Col>
                  <Col md={4}><AvField label="Last Name*" name="lastName" autoComplete='family-name' required/></Col>
              </Row>
              <Row>
                  <Col md={4}><AvField label="Email*" name="email" type='email' autoComplete='email' required/></Col>
                  <Col md={4}><AvField label="Email Confirmation*" name="emailConfirmation" type='email'
                                       autoComplete='email' validate={{match: {value: 'email'}}} required/></Col>
              </Row>
              <Row>
                  <Col md={4}><AvField label="What describes me best*" name="waitingListFields.bestDescription"
                                       type="select" required>
                      <option> </option>
                      <option>hacker</option>
                      <option>maker</option>
                      <option>ideator</option>
                      <option>designer</option>
                      <option>artist</option>
                      <option>start-up</option>
                      <option>unicorn</option>
                  </AvField></Col>
              </Row>
              <Row>
                  <Col md={8}><AvField label="Motivation*" name="waitingListFields.motivation" type='textarea' rows="8"
                                       required/></Col>
              </Row>
              <FormGroup className="mt-4">
                  <Button disabled={this.props.registering === true} className={"d-flex align-items-center"}
                          color="primary" type="submit">
                      <span className="mr-2">Submit</span>
                      <ScaleLoader color={'#ffffff'} loading={this.props.registering === true} height={20} width={2}/>
                  </Button>
              </FormGroup>
          </AvForm>
          }
              {!this.props.registering && (this.props.registrationSuccess === false) &&
              <Alert className="mt-3" color="danger">Sorry, submit was not successful.</Alert>
              }
              {!this.props.registering && this.state.submitError &&
              <Alert className="mt-3" color="danger">Form contains errors.</Alert>
              }
              {!this.props.registering && (this.props.registrationSuccess === true) &&
              <Alert className="mt-3" color="success">Congratulations, waitinglist application was successfully sent.</Alert>
              }

      </StyledContainer>
    )
}

}

const StyledContainer = styled(Container)`
  min-height: 100vh;
`;

const mapStateToProps = (state, ownProps) => {
    const {registering, registrationSuccess, error} = state.registration;
    return {registering, registrationSuccess, registrationError: error}
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        register: (user) => {
            return dispatch(userActions.register(user))
        }
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(WaitingListPage);