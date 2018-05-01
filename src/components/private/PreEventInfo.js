//@flow

import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import styled from 'styled-components'




type Props = {
    onChange: (?boolean)=>void,
    loading?: boolean,
    preEvent?: boolean
}
type State = {
    preEvent?: boolean
}

class PreEventInfo extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            preEvent: props.preEvent
        }
    }



    render() {
        return (
          <div className="mt-5 pt-5">
              <h2>TECHFEST Pre-Event, JUNE 14TH, 7pm</h2>
              <p>TECHFEST Munich starts on Friday, June 14th. We will kick-off with a warm-up pre-event and we would love to see you there. On this day, we want all our amazing participants of TECHFEST 2018, from all around Germany and Europe, to get to know each other, in a chilled festival atmosphere, before the actual hacking starts on friday. The participation in this pre-event is not obligatory, but we HIGHLY RECOMMEND it and who would say no to get in touch with like-minded, inspiring people for a nice summer barbecue?</p>
              <Row>
                  <Col md='6'>
                      <Form className="pt-3" onSubmit={(e)=>{e.preventDefault();this.props.onChange(this.state.preEvent)}}>
                          <FormGroup tag="fieldset">
                              <FormGroup check>
                                  <Label check>
                                      <StyledRadioInput onChange={()=>this.setState({preEvent:true})} type="radio" name="radio1" checked={this.state.preEvent === true}/>{' '}
                                      I will participate in the <strong>TECHFEST Pre-Event</strong>
                                  </Label>
                              </FormGroup>
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