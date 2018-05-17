//@flow

import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import styled from 'styled-components'
import {type User, roles} from '../../../constants'



type Props = {
    onChange: (State)=>void,
    loading?: boolean,
    userData?: User
}
type State = {
    preEvent?: boolean,
    preEventCount?: number
}

class PreEventInfo extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            preEvent: ((props.userData || {}).applicantFields || {}).preEvent,
            preEventCount: ((props.userData || {}).applicantFields || {}).preEventCount,
        }
    }





    render() {
        return (
          <div className="mt-5 pt-5">
              <h2>TECHFEST Pre-Event, JUNE 14TH, 7pm</h2>
              <p>TECHFEST Munich starts on Friday, June 14th. We will kick-off with a warm-up pre-event and we would love to see you there. On this day, we want all our amazing participants of TECHFEST 2018, from all around Germany and Europe, to get to know each other, in a chilled festival atmosphere, before the actual hacking starts on friday. The participation in this pre-event is not obligatory, but we HIGHLY RECOMMEND it and who would say no to get in touch with like-minded, inspiring people for a nice summer barbecue?</p>
              <Row>
                  <Col md='6'>
                      <Form className="pt-3" onSubmit={(e)=>{e.preventDefault();this.props.onChange(this.state)}}>
                          <FormGroup tag="fieldset">
                              <FormGroup check>
                                  <Label check>
                                      <StyledRadioInput onChange={()=>this.setState({preEvent:true})} type="radio" name="radio1" checked={this.state.preEvent === true}/>{' '}
                                      I will participate in the <strong>TECHFEST Pre-Event</strong>
                                  </Label>
                              </FormGroup>
                              {((
                                (this.props.userData || {}).role === roles.STARTUP_ROLE ||
                                (this.props.userData || {}).role === roles.ADMIN_ROLE)
                                && this.state.preEvent)  &&
                              <FormGroup row style={{padding: '10px 35px', alignItems: 'baseline'}}>
                                  <Label  for="preEventCount">Number of persons</Label>
                                  <Col xs={2}><Input type="number" min="0" max="6" name="preEventCount" value={this.state.preEventCount} onChange={(e)=>this.setState({preEventCount:e.target.value})}/></Col>
                              </FormGroup>
                              }
                              <FormGroup check>
                                  <Label check>
                                      <StyledRadioInput onChange={()=>this.setState({preEvent:false})} type="radio" name="radio2" checked={this.state.preEvent === false}/>{' '}
                                      <strong>I won´t</strong> participate in the <strong>TECHFEST Pre-Event</strong>
                                  </Label>
                              </FormGroup>
                          </FormGroup>
                          <Button color="primary" disabled={this.props.loading} type="submit">Save</Button>
                      </Form>

                  </Col>
              </Row>
          </div>
        );
    }
}



const StyledRadioInput = styled(Input)`
margin: 0.1em -1.2em !important;
`;

export default PreEventInfo;